import { useAuxiliaryTabContext } from "@system/workbench/tab/auxiliary-tab/context/useAuxiliaryTabContext";

const Content = ({ id, name }: { id: string; name: string }) => {
  const auxiliaryTab = useAuxiliaryTabContext();
  const SegmentView = auxiliaryTab.getSegmentView(id);

  /* eslint-disable react-hooks/static-components */
  return (
    <div className="flex flex-col">
      <div>{name}</div>

      <SegmentView />
    </div>
  );
};

export default Content;
