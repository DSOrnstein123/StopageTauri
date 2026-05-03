import { featureRegistry } from "@/app/init";
import Document from "./components/Document";
import { DocumentFileSchema } from "./schemas/documentSchema";
import { documentService } from "./services/documentService";

featureRegistry.register("document", {
  component: Document,
  parser: DocumentFileSchema.parse,
  fetcher: (id: string) => documentService.getDetail(id),
});
