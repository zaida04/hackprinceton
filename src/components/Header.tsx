import Link from "next/link";
import { useState } from "react";

const topBars = {
  Home: "/",
  "Sign In": "/signin",
  "Create a Stream": "/create",
};

export default function Header() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-black p-6 md:pl-8">
        <Link href="/">
          <div className="flex items-center flex-shrink-0 mr-12 font-semibold text-3xl tracking-tight">
            <span className="text-white">Edu</span>
            <span className="text-yellow-800">Cast</span>
          </div>
        </Link>
        <div className="block md:hidden" onClick={() => setExpanded(!expanded)}>
          <button
            className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-white hover:border-white"
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
                href={topBars[link as keyof typeof topBars]}
                key={link}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
