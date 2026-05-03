import { featureRegistry } from "@/app/init";
import { IconDataSchema } from "@/shared/schemas/iconData";
import { SimpleUUIDSchema } from "@/shared/schemas/simpleUUIDSchema";
import z from "zod";

const FileSchema = z.object({
  id: SimpleUUIDSchema,
  name: z.string(),
  icon: IconDataSchema,
  type: z.string().refine((val) => featureRegistry.has(val), {
    message: "This file type is not supported",
  }),
  contentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
type File = z.infer<typeof FileSchema>;

const FileListSchema = z.array(FileSchema);
type FileList = z.infer<typeof FileListSchema>;

export { FileSchema, type File, FileListSchema, type FileList };
