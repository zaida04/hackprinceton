import Layout from "../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { doc, getDocs, collection } from "firebase/firestore";
import firebase, { app, firestore } from "../service/firebase";
import thumbnail from "../../public/download.jpeg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../AuthUserContext";

// Page that creators will see
export default function Home() {
  const router = useRouter();
  const { authUser } = useAuth();
  const [selectedStream, setSelectedStream] = useState("");

  const [streamInfo, setStreamInfo] = useState(null);

  const proceedCheckout = (event, id) => {
    event.preventDefault();
    if (authUser) {
      router.push({
        pathname: "/payments",
        query: "streamId=" + id,
      });
    } else {
      router.push("/signup?redirect=/payments?streamId=" + id);
    }
  };
  const getStreamInfo = async () => {
    const doc_refs = await getDocs(collection(firestore, "streams"));

    const res = [];

    doc_refs.forEach((e) => {
      res.push({
        id: e.id,
        ...e.data(),
      });
    });

    return res;
  };
  useEffect(() => {
    getStreamInfo().then((data) => {
      setStreamInfo(data);
    });
  }, []);

  if (streamInfo) {
    return (
      <Layout>
        <main className="h-full">
          <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14 h-full">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                  <div className="lg:py-24">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">A better way to</span>
                      <span className="block text-indigo-400">learn</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Feeling lost in class and need help before the big exam?
                      Skip the office hours line and attend an online, robust
                      live stream taught by the top 5% in your class.
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div className="sm:mx-auto sm:max-w-xl lg:mx-0">
                        <div className="sm:flex">
                          <div className="mt-3">
                            <Link href="/create">
                              <button
                                type="submit"
                                className="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                              >
                                Create a stream
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
                  <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto flex justify-center items-center">
            <span className="text-3xl font-bold text-center mt-6 text-indigo-900">
              Upcoming Streams
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ml-8 mb-8 mr-8">
            {streamInfo.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow overflow-hidden border-[1px] border-gray-400 sm:rounded-lg relative"
              >
                <div className="relative h-48">
                  <Image
                    src={thumbnail}
                    alt={event.streamName}
                    fill={true}
                    objectFit="cover"
                  />
                </div>
                <div className="flex justify-center items-center mt-2">
                  <h2 className="text-2xl font-semibold">{event.streamName}</h2>
                </div>
                <div className="px-4 my-2 flex justify-between items-center">
                  {/* <p className="text-gray-500">{event.price}</p> */}
                  <Link href={`/streams/${event.id}/promo`}>
                    <button className="font-bold text-indigo-500">
                      Learn more
                    </button>
                  </Link>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => proceedCheckout(e, event.id)}
                  >
                    Enroll {event.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </Layout>
    );
  }
}
