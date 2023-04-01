import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useState } from "react";
import { firestore } from "../service/firebase";
import { createCloudflareStreamHTTP } from "../lib/api-backend";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Create() {
  const router = useRouter();
  const [state, setState] = useState({
    streamName: "",
    about: "",
    classCode: "",
    examDate: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // callback for stream create button
  const onCreateStreamClick = async (event) => {
    event.preventDefault();
    if (state.name == "" || (state.about == "") | (state.classCode == ""))
      return;
    // create the stream
    const createdStream = await createCloudflareStreamHTTP(state.streamName);
    // create stream from cloudflare
    if (!createdStream.uid) return;

    await setDoc(doc(collection(firestore, "streams"), createdStream.uid), {
      id: createdStream.uid,
      ...state,
    });

    router.push("/streams/" + createdStream.uid);
  };

  return (
    <Layout>
      <form className="flex justify-center items-center py-8">
        <div className="space-y-4">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">
              Stream Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-5">
                <label
                  htmlFor="stream-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stream Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="streamName"
                    id="stream-name"
                    onChange={handleChange}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    onChange={handleChange}
                    rows={3}
                    className="px-3 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about what the class is going to be
                  about.
                </p>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="class-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Class Code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="classCode"
                    onChange={handleChange}
                    id="class-code"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="countries"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Select a price
                </label>
                <select
                  id="price"
                  name="price"
                  onChange={handleChange}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Select a price</option>
                  <option value="$5">$5</option>
                  <option value="$10">$10</option>
                  <option value="$15">$15</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="exam-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Exam Date
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="examDate"
                    onChange={handleChange}
                    id="exam-date"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {state.price === "$15" && (
            <p className="text-sm p-4 rounded-lg text-white bg-yellow-400 max-w-lg">
              We noticed you chose $15 as your class price. Be sure that the
              help your class provides is truly beneficial to be priced at $15.
            </p>
          )}
          <button
            type="submit"
            onClick={onCreateStreamClick}
            className="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Create stream
          </button>
        </div>
      </form>
    </Layout>
  );
}
