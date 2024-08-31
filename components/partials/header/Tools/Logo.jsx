"use client";

import React, { Fragment } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import useWidth from "@/hooks/useWidth";

const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link href="/chat">
        <React.Fragment>
          {width >= breakpoints.xl ? (
            <img
              src={
                isDark
                  ? "/assets/images/logo/logo_white-1.webp"
                  : "/assets/images/logo/logo_white-1.webp"
              }
              alt=""
              style={{ width: "40%" }}
            />
          ) : (
            <img
              src={
                isDark
                  ? "/assets/images/logo/logo_white-1.webp"
                  : "/assets/images/logo/logo_white-1.webp"
              }
              alt=""
              style={{ width: "40%" }}
            />
          )}
        </React.Fragment>
      </Link>
    </div>
  );
};

export default Logo;
