import { Outlet } from "@tanstack/react-router";

const Flashcards = () => {
  return (
    <div className="mx-auto w-full max-w-300 flex-1 overflow-x-hidden px-10">
      <Outlet />
    </div>
  );
};

export default Flashcards;
