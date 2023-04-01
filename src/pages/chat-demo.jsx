import React from "react";
import Layout from "../components/Layout";
import Chat from "../components/Chat";

const ChatDemo = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Chat Demo</h1>
      <Chat />
    </Layout>
  );
};

export default ChatDemo;
