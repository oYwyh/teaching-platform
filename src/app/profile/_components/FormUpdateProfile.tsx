"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import FormField from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { updateProfileSchema, TUpdateProfileSchema } from "@/schemas/profile.schema";
import { useEffect, useState } from "react";
import { updateProfile } from "@/actions/profile.actions";
import { TFullUserData, TIndex, TUser } from '@/types/index.type';
import { redirect } from 'next/navigation';
import { getById } from '@/actions/index.actions';

type TFormUpdateProfile = {
  user: TFullUserData
}

export default function FormUpdateProfile({
  user
}: TFormUpdateProfile) {
  if (!user) redirect('/auth')

  const [error, setError] = useState<string>()

  const [userData, setUserData] = useState<TUpdateProfileSchema>({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    parentPhone: user.parentPhone,
    regionId: user.regionId,
    governorateId: user.governorateId,
    yearId: user.yearId,
    subjectId: user.subjectId,
    context: user.context as "school", // Add type assertion here
    bio: user.bio,
    specialty: user.specialty
  })

  const form = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      parentPhone: user.parentPhone,
      regionId: user.regionId,
      governorateId: user.governorateId,
      yearId: user.yearId,
      subjectId: user.subjectId,
      context: user.context,
      bio: user.bio,
      specialty: user.specialty
    },
  });

  useEffect(() => {
    Object.entries(userData).forEach(([key, value]) => {
      form.setValue(key as keyof TUpdateProfileSchema, value);
    });
  }, [userData])


  const onSubmit = async (data: TIndex<string | null> & TUpdateProfileSchema) => {
    let userFields = Object.keys(userData).filter(key => key !== 'id' && key !== 'role') as (keyof TUpdateProfileSchema)[];
    let fieldsNotToCompare: string[] = [];
    let fieldsToCompare: string[] = [];
    const dataNotToPass = ['region', 'governorate', 'year', 'subject']

    userFields.forEach((field) => {
      if (typeof data[field] === 'string' && typeof userData[field] === 'string') {
        if (data[field].toLowerCase() !== userData[field].toLowerCase()) {
          fieldsToCompare.push(field);
        } else {
          fieldsNotToCompare.push(field);
        }
      }
    });

    for (const field of dataNotToPass) {
      delete data[field];
    }

    for (const field of fieldsNotToCompare) {
      delete data[field];
    }

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        data[key] = value.toLowerCase();
      }
    });

    if (fieldsToCompare.length === 0) {
      setError("No changes detected");
      return;
    }
    setError('')
    const result = await updateProfile(data);

    if (result?.error) {
      for (const [field, message] of Object.entries(result.error)) {
        form.setError(field as keyof TUpdateProfileSchema, {
          type: "server",
          message: message
        });
      }
    } else {
      // Reset the form
      form.reset();
      console.log('updated')
      // Manually update the default values of the form fields
      setUserData({
        firstname: data.firstname ? data.firstname : userData.firstname,
        lastname: data.lastname ? data.lastname : userData.lastname,
        email: data.email ? data.email : userData.email,
        phone: data.phone ? data.phone : userData.phone,
        parentPhone: data.parentPhone ? data.parentPhone : userData.parentPhone,
        context: data.context ? data.context : userData.context,
        regionId: data.regionId ? data.regionId : userData.regionId,
        governorateId: data.governorateId ? data.governorateId : userData.governorateId,
        yearId: data.yearId ? data.yearId : userData.yearId,
        subjectId: data.subjectId ? data.subjectId : userData.subjectId,
        bio: data.bio ? data.bio : userData.bio,
        specialty: data.specialty ? data.specialty : userData.specialty
      })
      fieldsNotToCompare = []
      fieldsToCompare = []
      Object.keys(data).forEach(key => {
        delete data[key];
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField form={form} name="id" type={'hidden'} />
        <div className="flex flex-row gap-3 pb-2">
          <FormField form={form} name="email" />
        </div>
        <div className="flex flex-row gap-3">
          <FormField form={form} name="firstname" />
          <FormField form={form} name="lastname" />
        </div>
        <div className="flex flex-row gap-3">
          <FormField form={form} name="phone" />
          {user.context == 'school' && (
            <FormField form={form} name="parentPhone" />
          )}
        </div>
        <div className="flex flex-row gap-3 pb-2">
          <FormField form={form} name="regionId" type="hidden" disabled label='Region' />
          <FormField form={form} name="governorateId" type="hidden" disabled label="Governorate" />
        </div>
        <div className="flex flex-row gap-3 pb-2">
          {user.context == 'school' && (
            <FormField form={form} name="yearId" type="hidden" disabled label="Year" />
          )}
          {user.context == 'englishExam' && (
            <FormField form={form} name="subjectId" type="hidden" disabled label="Subject" />
          )}
        </div>
        <div className="flex flex-row gap-3 pb-2">
          {user.role == 'instructor' && (
            <FormField form={form} name="bio" textarea disabled />
          )}
        </div>
        <div className="flex flex-row gap-3 pb-2">
          {user.role == 'instructor' && (
            <FormField form={form} name="specialty" disabled />
          )}
        </div>
        <FormField form={form} name="context" disabled type='hidden' />
        <Button className="w-[100%]" type="submit">Update</Button>
        <FormMessage>{error}</FormMessage>
      </form>
    </Form>
  );
}