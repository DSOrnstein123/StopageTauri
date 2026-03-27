import { Outlet } from "@tanstack/react-router";

const FlashCardsLayout = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-y-auto">
      <div className="mx-auto h-full w-full max-w-300 flex-1 overflow-x-hidden px-8 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default FlashCardsLayout;
