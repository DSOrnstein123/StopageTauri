import { systemApi } from "@system/apis";
import TemplateList from "./TemplateList";

const TemplatePicker = () => {
  const templateManagerApi = systemApi.plugin.getApi("core.template-manager");
  if (!templateManagerApi) return null;

  return <TemplateList />;
};

export default TemplatePicker;
