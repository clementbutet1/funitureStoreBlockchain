import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import { Router } from "next/router";

const Layout = ({ children, title = "This is the default title" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="flex items-center justify-between flex-wrap bg-teal p-6 bg-[#00561B] dark:border-b-2 dark:border-b-white">
          <div className="flex items-center flex-no-shrink text-white mr-6"></div>
          <div className="block lg:hidden"></div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link
                href="/"
                className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="block lg:hidden"></div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>
            <span className="font-semibold text-2xl tracking-tight text-white">
              FURNITURE STORE
            </span>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
