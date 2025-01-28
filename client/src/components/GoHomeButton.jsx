import { Link } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"


export default function GoHomeButton() {
    return (
        <Link to='/'>
            <button className="bg-green-600 rounded-xl hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon className="text-white hover:text-slate-100" icon={faHouse} />
            </button>
        </Link>
    )
}