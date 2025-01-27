import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Hero from "@/components/Hero"

export default function DefualtLayout() {

    return (
        <>
            <Header />
            <Hero />
            <Outlet />
            <Footer />
        </>
    )
}