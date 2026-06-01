import { Dialog, DialogContent, DialogTrigger } from "@system/ui/shadcn/dialog";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@system/ui/shadcn/field";
import { Input } from "@system/ui/shadcn/input";
import { Checkbox } from "@system/ui/shadcn/checkbox";
import { Button } from "@system/ui/shadcn/button";
import useCreateTemplateForm from "../hooks/useCreateTemplateForm";

const CreateModal = ({
  triggerText = "Create new template",
}: {
  triggerText?: string;
}) => {
  const { form, onSubmit } = useCreateTemplateForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="text-2xl">New Template</FieldLegend>

              <FieldGroup>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <FieldLabel
                        htmlFor="field-name"
                        className="w-37 text-nowrap"
                      >
                        Template Name
                      </FieldLabel>
                      <Input id="field-name" required {...field} />
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="defaultName"
                  render={({ field }) => (
                    <Field orientation="horizontal">
                      <FieldLabel
                        htmlFor="field-name"
                        className="w-37 text-nowrap"
                      >
                        Document Name
                      </FieldLabel>
                      <Input id="field-name" required {...field} />
                    </Field>
                  )}
                />

                <Field orientation="horizontal">
                  <Controller
                    control={form.control}
                    name="duplicateName"
                    render={({ field }) => (
                      <Field orientation="horizontal">
                        <Checkbox
                          id="duplicate-name"
                          name="duplicate-name"
                          checked={field.value}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="duplicate-name">
                            Duplicate Name
                          </FieldLabel>
                        </FieldContent>
                      </Field>
                    )}
                  />

                  <Button type="submit">Create</Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
