import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormProps,
} from "react-hook-form";
import type { z } from "zod";

type UseZodFormProps<TFieldValues extends FieldValues> = Omit<
  UseFormProps<TFieldValues>,
  "resolver"
> & {
  schema: z.ZodType<TFieldValues, FieldValues>;
};

export function useZodForm<TFieldValues extends FieldValues>({
  schema,
  ...formProps
}: UseZodFormProps<TFieldValues>) {
  return useForm<TFieldValues>({
    ...formProps,
    resolver: zodResolver(schema) as Resolver<TFieldValues>,
  });
}
