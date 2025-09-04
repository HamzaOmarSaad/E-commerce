"use client";
import React, { useContext } from "react";
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
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { COD, Visa } from "@/services/payments";
import { cartContext } from "@/context/cartContext";

const formSchema = z.object({
  city: z.string({
    message: "Enter correct city",
  }),
  details: z.string({
    message: "Enter location details",
  }),
  phone: z.string().min(11).max(11),
  paymentMethod: z.enum(["cash", "visa"]),
});

interface Props {
  cartId: number;
}

function Page(props: Props) {
  const {} = props;
  const { cart } = useContext(cartContext);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      phone: "",
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const address = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };

    if (values.paymentMethod === "cash") {
      const data = await COD(cart._id, address);
      if (data.status === "success") {
          toast.success(data.message || "purchase done");
          router.push("/allOrders")
      } else {
        toast.error(data.error || "somthing wrong happened");
      }
    } else {
        
      const data = await Visa(cart._id, address);
      if (data.status === "success") {
          toast.success(data.message || "purchase done");
        router.push(data.session.url);
      } else {
          toast.error(data.error || "somthing wrong happened");
                    router.push(data.cancel_url);

      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-60/100 md:w-50/100 lg:w-40/100 mx-auto my-40 p-11 rounded-2xl bg-zinc-100"
      >
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>city</FormLabel>
              <FormControl>
                <Input placeholder="Ex : cairo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="01xxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input placeholder="Enter your details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" payment flex justify-around">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse items-center">
                <FormLabel>
                  <Image src="/cash.png" alt="hello" width={100} height={100} />
                </FormLabel>
                <FormControl>
                  <Input
                    type="radio"
                    placeholder="Enter your details"
                    {...field}
                    value="cash"
                    className="size-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse items-center">
                <FormLabel>
                  {" "}
                  <Image src="/visa.png" alt="hello" width={100} height={100} />
                </FormLabel>
                <FormControl>
                  <Input
                    type="radio"
                    placeholder="Enter your details"
                    {...field}
                    value="visa"
                    className="size-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default Page;
