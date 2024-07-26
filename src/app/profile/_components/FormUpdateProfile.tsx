"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import FormField from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { updateProfileSchema, TUpdateProfileSchema } from "@/schemas/profile.schema";
import { useEffect, useState } from "react";
import { updateProfile } from "@/actions/profile.actions";
import { TUser } from '@/types/index.type';

type TFormUpdateProfile = {
  user: TUser
}

export default function FormUpdateProfile({
  user
}: TFormUpdateProfile) {

  const [error, setError] = useState<string>()

  const [userData, setUserData] = useState<TUpdateProfileSchema>({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    parentPhone: user.parentPhone,
    region: user.region,
    governorate: user.governorate,
    year: user.year,
    exam: user.exam,
    type: user.type,
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
      region: user.region,
      governorate: user.governorate,
      year: user.year,
      exam: user.exam,
      type: user.type,
    },
  });

  useEffect(() => {
    Object.entries(userData).forEach(([key, value]) => {
      form.setValue(key as keyof TUpdateProfileSchema, value);
    });
  }, [userData])


  const onSubmit = async (data: { [key: string]: string } & TUpdateProfileSchema) => {
    let userFields = Object.keys(userData).filter(key => key !== 'id' && key !== 'role') as (keyof TUpdateProfileSchema)[];
    let fieldsNotToCompare: string[] = [];
    let fieldsToCompare: string[] = [];

    userFields.forEach((field) => {
      if (data[field]?.toLowerCase() !== userData[field]?.toLowerCase()) {
        fieldsToCompare.push(field);
      } else {
        fieldsNotToCompare.push(field);
      }
    });

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
        region: data.region ? data.region : userData.region,
        governorate: data.governorate ? data.governorate : userData.governorate,
        year: data.year ? data.year : userData.year,
        exam: data.exam ? data.exam : userData.exam,
        type: data.type ? data.type : userData.type,
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
          {user.type == 'school' && (
            <FormField form={form} name="parentPhone" />
          )}
        </div>
        <div className="flex flex-row gap-3 pb-2">
          <FormField form={form} name="region" disabled />
          <FormField form={form} name="governorate" disabled />
        </div>
        <div className="flex flex-row gap-3 pb-2">
          {user.type == 'school' && (
            <FormField form={form} name="year" disabled />
          )}
          {user.type == 'exam' && (
            <FormField form={form} name="exam" disabled />
          )}
        </div>
        <FormField form={form} name="type" disabled type='hidden' />
        <Button className="w-[100%]" type="submit">Update</Button>
        <FormMessage>{error}</FormMessage>
      </form>
    </Form>
  );
}