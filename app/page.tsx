export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-blue-600">StreetSmart</span>
        </h1>
        <p className="text-center text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400">
          Your mobile-friendly web application is ready to go!
        </p>
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base text-gray-500">
            Start building your app by editing{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              app/page.tsx
            </code>
          </p>
        </div>
      </div>
    </main>
  );
}

