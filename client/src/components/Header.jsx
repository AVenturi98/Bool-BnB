import logo from '../assets/logo.svg'
export default function Header() {
    return (
        <header className="p-4 flex justify-start items-center">
            <figure>
                <img className="h-40 w-auto" src={logo} alt='Bool BnB Logo' />
            </figure>
        </header>
    )
}