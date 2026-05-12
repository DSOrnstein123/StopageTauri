import { useZoom, ZoomMode } from "@embedpdf/plugin-zoom/react";

const Zoom = ({ documentId }: { documentId: string }) => {
  const { provides: zoom, state } = useZoom(documentId);

  if (!zoom) {
    return null;
  }

  return (
    <div className="toolbar">
      <span>{Math.round(state.currentZoomLevel * 100)}%</span>

      <button onClick={zoom.zoomOut}>-</button>
      <button onClick={zoom.zoomIn}>+</button>
      <button onClick={() => zoom.requestZoom(ZoomMode.FitPage)}>Reset</button>
    </div>
  );
};

export default Zoom;
