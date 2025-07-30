"use client";

import { useEffect, useState } from "react";
import SearchPane from "@/ui/SearchPane";
import Split from "react-split";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/ui/Map"), {
  ssr: false,
});

export default function Search() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (isMobile) {
    return (
      <Split
        sizes={[50, 50]}
        direction="vertical"
        className="flex flex-col h-screen"
      >
        <div className="h-full">
          <Map />
        </div>
        <div className="h-full overflow-auto">
          <SearchPane />
        </div>
      </Split>
    );
  }

  return (
    <div dir="ltr" className="w-full h-full">
      <Split
        sizes={[35, 65]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="flex flex-row-reverse h-full"
      >
        <SearchPane />
        <Map />
      </Split>
    </div>
  );
}
