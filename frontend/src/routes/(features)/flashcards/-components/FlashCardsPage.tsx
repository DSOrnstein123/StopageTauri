import { Outlet } from "@tanstack/react-router";

const FlashCardsPage = () => {
  //TODO: fix general page layout

  return (
    <div className="pb-2">
      <h1>Flashcard</h1>
      <Outlet />
    </div>
  );
};

export default FlashCardsPage;
