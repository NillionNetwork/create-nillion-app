import { WelcomeContent } from "./components/WelcomeContent";
import { Login } from "./components/Login";
import StoreValue from "./components/StoreValue";
import FetchValue from "./components/FetchValue";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <WelcomeContent/>
        <Login/>
        <div className="flex flex-row">
          <StoreValue/>
          <FetchValue/>
        </div>
      </main>
    </div>
  );
}
