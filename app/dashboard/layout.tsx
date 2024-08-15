
import SideNavbar from "@/components/navs/SideNavbar";
import { ReactNode} from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }:DashboardLayoutProps) {


  return (
    <div className="relative flex lg:flex-row flex-col">
      <SideNavbar />
      <div className="flex-1 ml-0 lg:ml-5 transition-all duration-200">
        {children}
      </div>
    </div>
  );
}