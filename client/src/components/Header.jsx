import logo from '../assets/logo.svg'
export default function Header() {
    return (
        <header>
            <figure>
                <img src={logo} alt='Bool BnB Logo' />
                <figcaption>Book your perfect stay</figcaption>
            </figure>
        </header>
    )
}