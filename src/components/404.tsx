const Page404 = () => {
  return (
    <>
      <div className="relative overflow-x-clip"></div>
      <main className="text-dark relative z-20 grid h-screen min-h-full place-items-center px-6 py-24 dark:text-white sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold ">404</p>
          <h1 className="text-primary mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 ">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="btn-primaryy 0 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page404;
