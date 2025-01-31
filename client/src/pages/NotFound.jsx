import { Link } from "react-router"
import logo from '../assets/logo.svg'

export default function NotFound() {
    return (
        <section className="bg-slate-100 text-green-800 h-screen w-screen flex items-center justify-center ">
            <div className="container flex items-center justify-center flex-col gap-6 ">
                <figure>
                    <img src={logo} alt="Logo" className="w-auto h-40" />
                </figure>
                <h1 className="font-extrabold text-5xl">404</h1>
                <span className="font-bold text-xl">Page not found!</span>
                <Link to='/' className="text-green-600 underline hover:text-cyan-600">Go back to homepage</Link>
            </div>
        </section>
    )
}
