import Image from "next/image";
import Heartbeat from "./components/Heartbeat";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Heartbeat
        </h1>

        <div className="mt-8">
          <Heartbeat from="Jacob" />
        </div>
      </main>
    </div>
  );
}
