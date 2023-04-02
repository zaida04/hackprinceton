export default function Footer() {
  return (
    <footer className="shadow bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            EduCast
          </span>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <a href="/tos" className="mr-4 hover:underline md:mr-6">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/create" className="hover:underline">
                Create a Stream
              </a>
            </li>
          </ul>
        </div>
        <hr className="w-1/2 my-2 sm:mx-auto border-gray-700 lg:my-4" />
        <span className="block text-sm sm:text-center text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            EduCast
          </a>
          . I am in pain.
        </span>
      </div>
    </footer>
  );
}
