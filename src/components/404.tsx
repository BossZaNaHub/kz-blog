const Page404 = () => {
    return (
        <>
            <div className="relative overflow-x-clip">
            </div>
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 h-screen relative z-20 text-dark dark:text-white">
                <div className="text-center">
                <p className="text-base font-semibold ">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 ">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/" className="rounded-md btn-primaryy 0 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Go back home
                    </a>
                </div>
                </div>
            </main>
        </>
    )
}

export default Page404