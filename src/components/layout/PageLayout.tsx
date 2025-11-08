import { Outlet } from "react-router-dom";
import { HomeFooter } from "../home/HomeFooter";
import { HomeNavBar } from "../home/HomeNavBar";

export function PageLayout() {
  return (
    <div className="space-y-12 pb-12">
      <HomeNavBar />
      <Outlet />
      <HomeFooter />
    </div>
  );
}

