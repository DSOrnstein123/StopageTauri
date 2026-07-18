import { useForm } from "react-hook-form";
import {
  CreateTemplateSchema,
  type CreateTemplateValues,
} from "../../../../../document/entries/nodes/document-template/schemas/createTemplateSchema";
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

  const { mutate: createTemplate } = useCreateTemplateMutation();

  const onSubmit = (values: CreateTemplateValues) => {
    createTemplate({
      name: values.name,
      kind: "template",
      type: "document-template",
      data: {
        defaultName: values.defaultName,
        defaultData: {},
      },
    });
  };

  return { form, onSubmit };
};

export default useCreateTemplateForm;
