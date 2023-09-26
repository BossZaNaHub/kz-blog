"use client";

import { useEffect, useState } from "react";

const useDetectDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isWebsite, setIsWebsite] = useState<boolean>(false);

  useEffect(() => {
    const device = navigator.userAgent || navigator.vendor;

    // if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(device)) {
    //   setIsMobile(true);
    // }
    // (tablet|ipad|playbook|silk)|(android(?!.*mobi))|
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(device)
    ) {
      setIsMobile(true);
    } else {
      setIsWebsite(true);
    }
  }, []);

  return { isMobile, isWebsite };
};

export { useDetectDevice };
