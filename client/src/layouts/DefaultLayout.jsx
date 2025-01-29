import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalContext from "@/contexts/GlobalContext";
import { useContext } from "react";
import Loader from "@/components/Loader";
import InfiniteSlideTextLeft from "@/components/InfiniteSlideTextLeft";

export default function DefualtLayout({ authenticated, setAuthenticated }) {
  const { isLoading } = useContext(GlobalContext);

  return (
    <>
      <Header
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Outlet />
      <InfiniteSlideTextLeft />
      <Footer />
      {isLoading && <Loader />}
    </>
  );
}
