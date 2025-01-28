import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function DefualtLayout({authenticated,setAuthenticated}) {

    return (
        <>
            <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
            <Outlet />
            <Footer />
        </>
    )
}