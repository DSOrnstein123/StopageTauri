// import type { QueryClient } from "@tanstack/react-query";
// import { NodeController } from "../../shared/controller";
// import { getNodeDetailQueryOptions } from "../../shared/hooks/useGetNodeDetailQuery";
// import { nodeService } from "../../shared/services";

// export class TemplateNodeController extends NodeController {
//   private queryClient: QueryClient;
//   constructor(queryClient: QueryClient) {
//     super();
//     this.queryClient = queryClient;
//   }

//   async apply(templateId: string, targetId: string) {

//   }

//   private async getTemplate(id: string) {
//     const data = await this.queryClient.ensureQueryData(
//       getNodeDetailQueryOptions(id),
//     );

//     if (data.kind != "template") {
//       throw new Error("Expected a document template");
//     }

//     return data;
//   }
// }
