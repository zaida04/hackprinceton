import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faG } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../AuthUserContext";
import Layout from "../components/Layout";

const listOfColleges = ["University at College", "College University", "Spain"];

function MenuItem(props) {
  return (
    <p
      className="block px-4 py-2 cursor-pointer text-black hover:bg-gray-200"
      onClick={props.onClick}
    >
      {props.children}
    </p>
  );
}

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInUserWithGoogle, createUserWithEmailAndPassword } = useAuth();
  const [error, setError] = useState(null);

  const [showDrop, setShowDrop] = useState(false);
  const [grade, setGrade] = useState("");

  const [typedCollege, setTypedCollege] = useState("");
  const [showColleges, setShowColleges] = useState(false);
  const [matchedColleges, setMatchedColleges] = useState([]);

  const signUpWithEmailAndPassword = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Create an account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-gray-600">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="block text-black w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full text-black appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <button
                id="dropdownHoverButton"
                onClick={() => {
                  if (showColleges) setShowColleges(false);
                  setShowDrop(!showDrop);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {grade === "" ? "Choose your grade level" : grade}{" "}
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                id="dropdownHover"
                className={
                  "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 " +
                  (showDrop ? "fixed" : "hidden")
                }
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <p
                      href="#"
                      onClick={() => {
                        setGrade("Freshman");
                        setShowDrop(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Freshman
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => {
                        setGrade("Sophomore");
                        setShowDrop(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sophomore
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => {
                        setGrade("Junior");
                        setShowDrop(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Junior
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => {
                        setGrade("Senior");
                        setShowDrop(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Senior
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="college"
                  className="block text-sm font-medium text-gray-700"
                >
                  College
                </label>
                <div className="mt-1">
                  <input
                    id="college"
                    name="college"
                    type="text"
                    onFocus={() => {
                      if (showDrop) setShowDrop(false);
                      setShowColleges(true);
                    }}
                    autoComplete="off"
                    value={typedCollege}
                    onChange={(event) => {
                      const content = event.target.value;
                      if (content.trim() == "") {
                        setTypedCollege("");
                        setMatchedColleges([]);
                      } else {
                        setTypedCollege(event.target.value);
                        const matchingColleges = listOfColleges.filter((x) =>
                          x.includes(content)
                        );
                        setMatchedColleges(matchingColleges);
                      }
                    }}
                    required
                    className="block w-full appearance-none border text-black border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {Boolean(showColleges || matchedColleges.length) && (
                <div className="z-10 bg-white divide-y divide-gray-100 shadow w-44 font-semibold fixed">
                  {(matchedColleges.length
                    ? matchedColleges
                    : listOfColleges
                  ).map((x) => (
                    <MenuItem
                      key={x}
                      onClick={() => {
                        setTypedCollege(x);
                        setShowColleges(false);
                        setMatchedColleges([]);
                      }}
                    >
                      {x}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={() => setShowColleges(false)}>
                    Close menu
                  </MenuItem>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/signin"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={signUpWithEmailAndPassword}
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div>
                  <div className="hover:cursor-pointer inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                    <span className="sr-only">Sign in with Google</span>
                    <FontAwesomeIcon
                      icon={faG}
                      className="font-bold text-3xl"
                      onClick={signInUserWithGoogle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
