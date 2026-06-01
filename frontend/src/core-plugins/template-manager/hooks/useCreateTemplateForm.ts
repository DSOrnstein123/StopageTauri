import { useForm } from "react-hook-form";
import {
  CreateTemplateSchema,
  type CreateTemplateValues,
} from "../schemas/createTemplateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateTemplateMutation from "./useCreateTemplateMutation";

const useCreateTemplateForm = () => {
  const form = useForm({
    resolver: zodResolver(CreateTemplateSchema),
    defaultValues: {
      name: "Untitled",
      defaultName: "",
      duplicateName: true,
    },
  });

  const { mutateAsync: createTemplate } = useCreateTemplateMutation();

  const onSubmit = (values: CreateTemplateValues) => {
    createTemplate({
      name: values.name,
      kind: "template",
      type: "document",
      data: {
        defaultName: values.defaultName,
      },
    });
  };

  return { form, onSubmit };
};

export default useCreateTemplateForm;
