import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function GoBackBtn() {
  const navigate = useNavigate();
  return (
    <button
    type="button"
      onClick={() => navigate(-1)}
      className="bg-green-600 rounded-xl hover:bg-cyan-600 text-white font-bold py-2 px-4 text-xl transition hover:-translate-y-1 hover:scale-105 delay-50"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}