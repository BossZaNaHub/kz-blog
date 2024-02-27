"use client";
import dynamic from "next/dynamic";
// import Game from "@/components/Game";

const DynamicComponetWithNoSSR = dynamic(() => import("@/components/Game"), { ssr: false });

export default function Home() {
  return (
    <main className="abosolute top-0">
      <DynamicComponetWithNoSSR />
    </main>
  );
}
