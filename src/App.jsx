import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import Home from "./pages/Home";
import Stays from "./pages/Stays";
import House from "./pages/House";
import Area from "./pages/Area";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import ManageBooking from "./pages/ManageBooking";
import FrontDesk from "./pages/FrontDesk";
import NotFound from "./pages/NotFound";

function ScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollOnNavigate />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/stays/:id" element={<House />} />
        <Route path="/areas/:area" element={<Area />} />
        <Route path="/book" element={<Checkout />} />
        <Route path="/booking/:ref" element={<Confirmation />} />
        <Route path="/manage" element={<ManageBooking />} />
        <Route path="/front-desk" element={<FrontDesk />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
