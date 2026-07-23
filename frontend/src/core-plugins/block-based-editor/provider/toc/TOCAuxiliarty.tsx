// import { systemApi } from "@system/api";
// import useActiveTabId from "@system/workbench/workspace/hooks/useActiveTabId";
// import TOCAuxiliartyContent from "./TOCAuxiliaryContent";

// const TOCAuxiliarty = () => {
//   const activeTabId = useActiveTabId();

//   const tabApi = systemApi.workspace.getTabEntryApi<"document">(activeTabId!);
//   const editor = tabApi.controller?.getEditor();
//   const store = tabApi.controller?.getStore();

//   return (
//     <div>
//       <div>Table of contents</div>
//       {tabApi && editor && store && (
//         <TOCAuxiliartyContent editor={editor} store={store} />
//       )}
//     </div>
//   );
// };

// export default TOCAuxiliarty;
