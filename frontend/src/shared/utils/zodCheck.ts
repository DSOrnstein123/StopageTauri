import z from "zod";

const zodCheck = <S extends z.ZodType>(
  schema: S,
  data: unknown
): z.infer<S> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error(z.treeifyError(result.error));
    throw result.error;
  }

  return result.data;
};

export default zodCheck;
