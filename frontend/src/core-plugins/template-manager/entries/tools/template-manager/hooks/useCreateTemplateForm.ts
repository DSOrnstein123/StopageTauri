import { useForm } from "react-hook-form";
import {
  CreateTemplateSchema,
  type CreateTemplateValues,
} from "../../../nodes/document-template/schemas/createTemplateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateTemplateMutation from "./useCreateTemplateMutation";
import { NODES } from "../../../../constants";

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
      type: NODES.DOCUMENT_TEMPLATE,
      data: {
        defaultName: values.defaultName,
        defaultContent: {},
      },
    });
  };

  return { form, onSubmit };
};

export default useCreateTemplateForm;
