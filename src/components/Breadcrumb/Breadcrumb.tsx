"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { LuHome } from "react-icons/lu";
import { CustomSlash } from "@/components/CustomIcon/CustomSlash";
import { toCamelCase } from "@/utils/camelcase";

interface Breadcrumb {}

const Breadcrumb = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {});

  return (
    <div className="m-4 flex items-center gap-3 rounded-lg p-4 shadow-lg">
      <div className="">
        <Link href="/dashboard" className="inline-flex self-center">
          <LuHome />
          &nbsp;Dashboard
        </Link>
      </div>
      {pathname.split("/").length >= 2 ? (
        <>
          <CustomSlash className="text-2xl" />
          <div>
            <Link href={pathname}>{pathname.split("/")[pathname.split("/").length - 1]}</Link>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Breadcrumb;
