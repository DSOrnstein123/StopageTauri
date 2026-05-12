import useHighlightStore from "../stores/highlightStore";

const PdfSidebar = () => {
  const text = useHighlightStore((state) => state.text);

  return <div>{text}</div>;
};

export default PdfSidebar;
