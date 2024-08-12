"use client";

import Link from "next/link";
import Logout from "./buttons/Logout";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HeaderNav = ({ session }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <div className="w-screen h-20 items-center flex justify-end  ">
      <div className="w-3/4 xl:flex hidden items-center justify-between over">
        <nav className="flex items-center justify-center gap-12 text-2xl w-2/4">
          <Link href={"/category/technology"}>Technology</Link>
          <Link href={"/category/business"}>Business</Link>
          <Link href={"/category/sport"}>Sport</Link>
        </nav>

        <div className="text-2xl w-1/4 flex justify-end">
          {session ? (
            <div className="flex items-center gap-8">
              {session?.user?.isAdmin && <Link href={"/admin"}>Admin</Link>}
              <Link href={"/dashbord"}>Dashbord</Link>
              <Logout />
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link href={"/login"}>Login</Link>
              <Link href={"/register"}>Register</Link>
            </div>
          )}
        </div>
      </div>

      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        {!open ? (
          <IoMenu className="text-5xl xl:hidden" />
        ) : (
          <IoClose className="text-5xl xl:hidden" />
        )}
      </div>

      {open && (
        <div className="xl:hidden text-4xl overflow-hidden  font-bold h-fit w-screen absolute top-24 -left-4 bg-background z-50 flex items-center p-24 rounded-lg flex-col">
          <div className="w-3/4 flex flex-col items-center">
            <nav className="flex flex-col items-center justify-center pb-12 gap-8 w-2/4 border-b-4 border-secondary">
              <Link href={"/category/technology"}>Technology</Link>
              <Link href={"/category/business"}>Business</Link>
              <Link href={"/category/sport"}>Sport</Link>
            </nav>

            <div className=" w-1/4 flex flex-col mt-12">
              {session ? (
                <div className="flex items-center flex-col gap-8">
                  {session?.user?.isAdmin && <Link href={"/admin"}>Admin</Link>}
                  <Link href={"/dashbord"}>Dashbord</Link>
                  <Logout />
                </div>
              ) : (
                <div className="flex items-center flex-col gap-8">
                  <Link href={"/login"}>Login</Link>
                  <Link href={"/register"}>Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNav;
