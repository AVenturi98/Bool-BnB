import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function GoBackBtn() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-green-600 rounded-xl hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xl"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}