import Hero from "../components/home/Hero";
import Ribbon from "../components/home/Ribbon";
import Stats from "../components/home/Stats";
import AreaExplorer from "../components/home/AreaExplorer";
import DayWithUs from "../components/home/DayWithUs";
import PlanYourStay from "../components/home/PlanYourStay";
import AreaMap from "../components/home/AreaMap";
import Faq from "../components/home/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ribbon />
      <Stats />
      <AreaExplorer />
      <DayWithUs />
      <PlanYourStay />
      <AreaMap />
      <Faq />
    </main>
  );
}
