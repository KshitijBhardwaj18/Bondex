"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { issuerKycSchema } from "@/schemas/issueBond";



export const KycForm = () => {
  const form = useForm<z.infer<typeof issuerKycSchema>>({
    resolver: zodResolver(issuerKycSchema),
    defaultValues: {},
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof issuerKycSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full h-full mt-4">
      <div className="mx-auto flex bg-[#ffffff] rounded-xl shadow-md h-[400px] w-[700px] border-[#6b65f9]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-10">
            <div className="flex flex-col gap-4">
              <div className="flex mx-auto w-full justify-center gap-20">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Hdfc bank" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employeeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emoloyee count</FormLabel>
                      <FormControl>
                        <Input placeholder="1000-10000" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex mx-auto w-full justify-center gap-20">
                <FormField
                  control={form.control}
                  name="valuation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valuation</FormLabel>
                      <FormControl>
                        <Input placeholder="1-10mil" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="10 years" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex mx-auto w-full justify-center gap-20">
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revenue</FormLabel>
                      <FormControl>
                        <Input placeholder="1-10 billion" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="govermentalInfluence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goverment controlled</FormLabel>
                      <FormControl>
                        <Input placeholder="Yes" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full flex max-auto justify-center mt-5">
              <Button
                type="submit"
                onClick={() => router.push("/issuer/issuebond")}
                className="bg-[#6b65f9] text-white"
              >
                Submit{" "}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
