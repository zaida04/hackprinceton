import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function BuyEduPurple() {
  const router = useRouter();
  return (
    <Layout>
      <div className="bg-gray-900  flex flex-col justify-center text-white w-full items-center h-screen">
        <h1 className="text-5xl font-bold py-4">Buy EduPurple</h1>
        <p className="text-3xl">Only $8/month (not actually, just click buy)</p>
        <p className="text-xl py-8">Why? IDK, shiny checkmark</p>
        <button
          className="py-4 px-8 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg shadow-md shadow-indigo-800"
          onClick={() => router.push("/edu-purple-payment")}
        >
          Buy it now!
        </button>
      </div>
    </Layout>
  );
}
