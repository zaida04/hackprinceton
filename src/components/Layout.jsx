import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  return (
    <>
      <div className="flex flex-col justify-between">
        <Header />
        <div className="min-h-full min-w-full">{props.children}</div>
        <Footer />
      </div>
    </>
  );
}
