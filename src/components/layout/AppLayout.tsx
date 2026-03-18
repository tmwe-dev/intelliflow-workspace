import { Outlet } from "react-router-dom";
import FloatingDock from "./FloatingDock";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <FloatingDock />
    </div>
  );
};

export default AppLayout;
