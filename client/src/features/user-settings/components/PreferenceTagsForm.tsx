"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useContext, useEffect, useState } from "react";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { EditContext } from "./SettingsView";
import { useParams } from "react-router-dom";
import { CONNECTION_STRING } from "@/utils/constants";
import axios from "axios";

const FormSchema = z.object({
  preferences: z.array(z.string()),
});

export default function CheckboxReactHookFormMultiple() {
  const [preferenceTags, setPreferenceTags] = useState<{ _id: string; name: string }[]>([]);
  const { user } = useContext(EditContext);

  const { toast } = useToast();

  interface APIPayload {
    preferences: string[];
  }

  // Update User
  const { id } = useParams();

  async function updateUser(data: APIPayload) {
    const USER_SERVICE_URL = CONNECTION_STRING + `${id}`;
    try {
      const response = await axios.patch(USER_SERVICE_URL, data);
      toast({
        title: "Update " + response.statusText,
      });
      // Update user data without reloading the page
      user.preferences = data.preferences;
      console.log(data);
    } catch (error) {
      toast({
        title: "Error: " + (error as any).response.data.error,
        variant: "destructive",
      });
    }
  }
  //   Submitting
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateUser(data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 max-w-[340px] rounded-md bg-slate-950 p-4">
            <code className={"text-white whitespace-pre-wrap"}>
              {data.preferences.length === 0
                ? "You selected no preferences"
                : data.preferences.join(", ")}
            </code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        title: "Error: " + (error as any).response.data.error,
        variant: "destructive",
      });
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      preferences: user.preferences || [],
    },
  });

  useEffect(() => {
    fetchPreferenceTags().then((tags) =>
      setPreferenceTags(tags as { _id: string; name: string }[]),
    );
    form.reset({
      preferences: user.preferences || [],
    });
  }, [user.preferences, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="preferences"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Preferences</FormLabel>
                <FormDescription>Select your favorite categories.</FormDescription>
              </div>
              {preferenceTags.map((item) => (
                <FormField
                  key={item._id}
                  control={form.control}
                  name="preferences"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item._id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.name)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.name])
                                : field.onChange(
                                    field.value?.filter((value) => value !== item.name),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
