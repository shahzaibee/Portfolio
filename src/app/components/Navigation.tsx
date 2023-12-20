"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavLinks } from "../constants";
import Link from "next/link";
import Transition from "./Transition";

const Navigation = () => {
  const [isRouting, setisRouting] = useState(false);
  const path = usePathname();
  const [prevPath, setPrevPath] = useState("/");

  useEffect(() => {
    if (prevPath !== path) {
      setisRouting(true);
    }
  }, [path, prevPath]);

  useEffect(() => {
    if (isRouting) {
      setPrevPath(path);
      const timeout = setTimeout(() => {
        setisRouting(false);
      }, 1200);
    }
  }, [isRouting]);

  return (
    <div
      style={{ left: "20%" }}
      className="absolute z-[50] -bottom-20  w-64 -ml-9 lg:ml-0 lg:w-[50%] lg:md:w-[20%]  bg-black rounded-full flex justify-between items-center border border-white"
    >
      {isRouting && <Transition />}

      {NavLinks.map((navlink) => (
        <Link
          key={navlink.name}
          href={navlink.link}
          className="mb-16 pl-4 min-w-[20%]"
        >
          <navlink.icon
            className={`w-[24px] h-[74px] ${
              path === navlink.name ? "text-purple-800" : "text-white"
            }  `}
          />
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
