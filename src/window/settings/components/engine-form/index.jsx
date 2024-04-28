import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const formSchema = z.object({
  enable: z.boolean,
  name: z.string,
});

const defaultValues = {};

const EngineForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmitHandle = (data) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandle)} className="space-y-8">
        <FormField
          control={form.control}
          name="enable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox id="enable" />
              </FormControl>
              <FormLabel htmlFor="enable" className="font-normal">
                是否启用
              </FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EngineForm;
