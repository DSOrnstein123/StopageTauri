import LeftSidebar from "@/app/components/sidebar/Leftsidebar";
import RightSidebar from "@/app/components/sidebar/RightSidebar";
import TabBar from "@/app/components/tab-container/TabBar";
import { Outlet } from "@tanstack/react-router";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftSidebar />

      <main
        id="canvas"
        className="relative flex h-screen flex-1 flex-col items-center justify-center overflow-hidden"
      >
        <TabBar />

        <Outlet />
      </main>

      <RightSidebar />
    </div>
  );
};

export default MainLayout;
