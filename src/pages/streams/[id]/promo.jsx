import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

// import { firestore } from "../service/firebase";
import { firestore } from "../../../service/firebase";

export default function Promo() {
  const [streamInfo, setStreamInfo] = useState(null);
  const router = useRouter();

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
    const infoRef = doc(firestore, "streams", router.query.id);
    const querySnapshot = await getDoc(infoRef);
    return querySnapshot.data();
  };

  // On page load/stream ID retrievable from router
  useEffect(() => {
    if (!router.query.id) return;

    getStreamInfo().then((data) => {
      setStreamInfo(data);
    });
  }, [router.query.id]);

  return (
    <Layout>
      <div className="flex flex-col items-center space-y-8 pt-16 h-screen bg-gray-900 text-white">
        <h1 className="text-6xl font-bold">{streamInfo?.streamName}</h1>
        <p className="text-2xl">{streamInfo?.about}</p>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 text-2xl rounded"
          onClick={(e) => proceedCheckout(e, event.id)}
        >
          Pay {streamInfo?.price}
        </button>

        <p className="text-2xl mx-16">
          Come join your classmates in learning from the best of the best.
          Picked straight from your classroom, our streamers are the top 1% of
          this classes grades.
        </p>
      </div>
    </Layout>
  );
}
