import { Outlet } from "react-router"

export default function DefualtLayout() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}