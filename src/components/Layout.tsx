import Header from "./Header";

export default function Layout(props: { children: any }) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}
