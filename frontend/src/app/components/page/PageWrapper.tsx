import { getRouteApi } from "@tanstack/react-router";
import Page from "./Page";

const route = getRouteApi("/(features)/documents/$documentId");

const PageWrapper = () => {
  const { documentId } = route.useParams();

  return <Page key={documentId} />;
};

export default PageWrapper;
