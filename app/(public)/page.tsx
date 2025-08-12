import { LandingPage } from "@/app/(public)/_components/landingPage";
import { Navbar } from "./_components/navBar";

export default function Home() {
  return (
    <div className="max-w-[85%] md:max-w-[80%]  mx-auto">
      <Navbar />
      <LandingPage />
    </div>
  );
}
