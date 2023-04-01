export default function Footer() {
  return (
    <footer class="bg-white shadow dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            EduCast
          </span>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/tos" class="mr-4 hover:underline md:mr-6">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/create" class="hover:underline">
                Create a Stream
              </a>
            </li>
          </ul>
        </div>
        <hr class="w-1/2 my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            EduCast
          </a>
          . I am in pain.
        </span>
      </div>
    </footer>
  );
}
