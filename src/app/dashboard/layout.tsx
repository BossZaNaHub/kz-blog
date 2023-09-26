"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/services/Auth";
// import client from "@/services/api/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
      setAuthorized(true);
    }
    return () => {};
  }, [user, isLoading, authorized]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (!authorized) {
        router.push("/login");
      }
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <Loading loading={isLoading}>
      <div className="">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Breadcrumb />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Layout;
