import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../AuthUserContext";
import { useEffect } from "react";

export default function Create() {
  const router = useRouter();
  const { authUser } = useAuth();

  // callback for stream create button
  const onCreateStreamClick = async (event) => {
    event.preventDefault();

    router.push("/streams/" + router.query.streamId);
  };

  useEffect(() => {
    if (!authUser) router.push("/signup?redirect=/payments");
  }, [authUser]);

  return (
    <Layout>
      <form className="flex justify-center items-center py-8 mx-8">
        <div className="space-y-4">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">
              Payment
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-5">
                <label
                  htmlFor="stream-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name on the Card
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="streamName"
                    id="stream-name"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Card Number
                </label>
                <div className="mt-2">
                  <input
                    id="about"
                    name="about"
                    // rows={3}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="class-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Expiry Month
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="classCode"
                    id="class-code"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* <div className="sm:col-span-2">
                <label
                  for="countries"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Select a price
                </label>
                <select
                  id="price"
                  name="price"
                  
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Select a price</option>
                  <option value="$5">$5</option>
                  <option value="$10">$10</option>
                  <option value="$15">$15</option>
                </select>
              </div> */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="exam-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Expiry Year
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="examDate"
                    id="exam-date"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="exam-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Security Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="examDate"
                    id="exam-date"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={onCreateStreamClick}
            className="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Pay
          </button>
        </div>
      </form>
    </Layout>
  );
}
