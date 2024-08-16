import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./buttons/Logout";
import { IoMenu } from "react-icons/io5";
import HeaderNav from "./HeaderNav";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="w-screen relative h-20 bg-secondary flex justify-between items-center lg:px-36 md:px-16 px-8 ">
      <Link href={"/"}>
        <h1 className="text-5xl">
          <span className="font-extrabold -mr-2">Rabil</span>Blog
        </h1>
      </Link>

      <HeaderNav session={session} />
    </header>
  );
};

export default Header;
