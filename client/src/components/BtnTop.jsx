import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function BtnTop() {

    window.onscroll = function () { functionScroll() }

    function functionScroll() {
        if (document.documentElement.scrollTop <= 500) {
            btn_top.style.display = 'none'
        } else if (document.documentElement.scrollTop >= 500) {
            btn_top.style.display = 'block'
        }
    }

    function goBackTop() {
        document.documentElement.scrollTop = 0
    }

    return (
        <div>
            <button
                type="button"
                id="btn_top"
                onClick={goBackTop}
                className="p-0 fixed right-[60px] bottom-[50px] z-1 rounded-full transition hover:-translate-y-1 hover:scale-105 delay-50 hidden">
                <FontAwesomeIcon icon={faCircleArrowUp} className="text-4xl text-green-600 hover:text-cyan-600" />
            </button>
        </div>
    )
}