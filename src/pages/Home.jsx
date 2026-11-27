import Hero from "../components/home/Hero";
import Promises from "../components/home/Promises";
import AreaExplorer from "../components/home/AreaExplorer";
import PlanYourStay from "../components/home/PlanYourStay";
import AreaMap from "../components/home/AreaMap";
import Faq from "../components/home/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Promises />
      <AreaExplorer />
      <PlanYourStay />
      <AreaMap />
      <Faq />
    </main>
  );
}
