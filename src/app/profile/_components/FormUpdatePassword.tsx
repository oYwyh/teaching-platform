"use client";

import FormField from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from "@/actions/profile.actions";
import { useState } from "react";
import { TUpdatePasswordSchema, updatePasswordSchema } from "@/schemas/profile.schema";

type TFormUpdatePassword = {
  id: string;
}

export default function FormUpdatePassword({ id }: TFormUpdatePassword) {

  const form = useForm<TUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      id,
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: TUpdatePasswordSchema) => {
    await updatePassword(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField form={form} name="id" type={'hidden'} />
        <div className="flex flex-row gap-3 pb-2">
          <FormField form={form} name="password" />
          <FormField form={form} name="confirmPassword" />
        </div>
        <Button className="w-[100%]" type="submit">Update</Button>
      </form>
    </Form>
  );
}
