import Link from "next/link";
import { useState, createContext } from "react";
import { useAuth } from "../AuthUserContext";
import { useRouter } from "next/router";

const topBars = {
  Home: "/",
  "Sign Up/In": "/signup",
  "Buy EduPurple": "/buy-edupurple",
};
export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const { authUser, signOut } = useAuth();
  const router = useRouter();

  const onSignOut = () => {
    signOut();
    router.push("/");
  };

  if (!authUser) {
    return (
      <div>
        <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6 md:pl-8">
          <Link href="/">
            <div className="flex items-center flex-shrink-0 mr-12 font-semibold text-3xl tracking-tight">
              <span className="text-white">Edu</span>
              <span className="text-indigo-400">Cast</span>
            </div>
          </Link>
          <div
            className="block md:hidden"
            onClick={() => setExpanded(!expanded)}
          >
            <button
              className="flex items-center px-3 py-2 border rounded text-white border-white"
              type="button"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`${
              expanded ? "block" : "hidden"
            } md:block w-full lg:flex lg:justify-between lg:items-center lg:w-auto`}
          >
            <div className="text-lg lg:justify-between">
              {Object.keys(topBars).map((link) => (
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-guilded mr-16 font-semibold hover:text-gray-400 transition-colors"
                  href={topBars[link]}
                  key={link}
                >
                  {link}
                </Link>
              ))}
              {/* <button className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-guilded mr-16 font-semibold hover:text-gray-400 transition-colors"
            onClick={signOut} type="button"></button> */}
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6 md:pl-8">
          <Link href="/">
            <div className="flex items-center flex-shrink-0 mr-12 font-semibold text-3xl tracking-tight">
              <span className="text-white">Edu</span>
              <span className="text-indigo-400">Live</span>
            </div>
          </Link>
          <div
            className="block md:hidden"
            onClick={() => setExpanded(!expanded)}
          >
            <button
              className="flex items-center px-3 py-2 border rounded text-white border-white"
              type="button"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`${
              expanded ? "block" : "hidden"
            } md:block w-full lg:flex lg:justify-between lg:items-center lg:w-auto`}
          >
            <div className="text-lg lg:justify-between">
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-guilded mr-16 font-semibold hover:text-gray-400 transition-colors"
                href="/"
                key="Home"
              >
                Home
              </Link>
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-guilded mr-16 font-semibold hover:text-gray-400 transition-colors"
                href="/"
                key="Sign Out"
                onClick={signOut}
              >
                Sign Out
              </Link>
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-guilded mr-16 font-semibold hover:text-gray-400 transition-colors"
                href="/create"
                key="Create a stream"
              >
                Create a Stream
              </Link>
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-guilded mr-16 font-semibold hover:text-gray-400 transition-colors"
                href="/buy-edupurple"
                key="Create a stream"
              >
                Buy EduPurple
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
