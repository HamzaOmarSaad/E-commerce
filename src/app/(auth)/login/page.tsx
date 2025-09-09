"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/app/_components/shared/loading";

const formSchema = z.object({
  email: z.email({
    message: "input must be email",
  }),
  password: z.string().min(2, {
    message: "password must be at least 8 characters.",
  }),
});

export default function Page() {
  const [loading,setloading]=useState(false)
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setloading(true)
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (!res?.ok) {
      toast.error(res?.error);
    } else {
      toast.success("login successfully");
      window.location.href = "/";
    }
    setloading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-60/100 md:w-50/100 lg:w-40/100 mx-auto my-40 p-11 rounded-2xl bg-zinc-100"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          dont have an acount{" "}
          <Link href="/register" className="underline">
            signup
          </Link>
        </p>
        <Button type="submit">Submit <Loading loading={ loading} /> </Button>
      </form>
    </Form>
  );
}
