import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import GlobalContext from "../contexts/GlobalContext.jsx";

// Components
import HeroShow from "../components/HeroShow";
import MailForm from "../components/MailForm";
import VoteStar from "../components/VoteStar";
import FormReview from "../components/FormReview";
import CounterButton from "@/components/Hearts";
import GoHomeButton from "@/components/GoHomeButton";

// Images
import greenLogo from "../assets/green.svg";
import defaultImg from "../assets/placeholder.png";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as empty } from "@fortawesome/free-regular-svg-icons";
import {
    faSink,
    faPersonBooth,
    faBed,
    faWaveSquare,
    faStar,
    faStarHalfStroke,
    faStarHalf
} from "@fortawesome/free-solid-svg-icons";


export default function Show() {
    const [property, setProperty] = useState("");
    const [owner, setOwner] = useState("");
    const [review, setReview] = useState([]);
    const [hearts, setHearts] = useState(0);
    const [openForm, setOpenForm] = useState(false); // Toggle form

    const { setIsLoading } = useContext(GlobalContext)

    const { id } = useParams()

    const fetchPost = () => {

        setIsLoading(true)

        axios
            .get(`http://localhost:3000/api/properties/${id}`)
            .then((res) => {
                setProperty(res.data);
                setOwner(res.data.owner[0]);
                if (res.data.reviews.length !== 0) {
                    setReview(res.data.reviews);
                }
                setHearts(res.data.hearts);
                console.log(res.data);
            })
            .catch((err) => console.error(err.message))
            .finally(() => {
                setIsLoading(false);
            })
    }


    useEffect(() => {
        fetchPost();
    }, [id]);

    const toggleForm = () => {
        setOpenForm(true);
        document.getElementById("openForm").style.display = "none";
    };

    const closeForm = () => {
        setOpenForm(false);
        document.getElementById("openForm").style.display = "block";
    };

    console.log('Property Image:', property.img);


    return (
        <>
            <div className="container mt-5">
                <GoHomeButton />
            </div>

            <div className="p-6 mt-8 lg:px-60">
                {/* HERO */}
                <section>
                    <HeroShow
                        img={property.img && property.img.trim() !== '' && !property.img.endsWith('/') ? property.img : defaultImg}
                        room={property.rooms}
                        bed={property.beds}
                        bath={property.bathrooms}
                        heart={property.hearts}
                        title={property.title}
                        description={property.description}
                    />
                </section>

                {/* DESCRIPTION */}
                <section className="mt-6">
                    <div className="flex flex-col items-start py-2">
                        <div className="flex justify-between w-full">
                            <div>
                                <h1 className="text-4xl font-bold">{property.title}</h1>
                                <h4 className="text-2xl font-semibold">
                                    {property.building_type} a {property.city}
                                </h4>
                                <h4 className="text-2xl font-semibold">{property.address}</h4>
                            </div>
                            {property.hearts !== undefined && (
                                <div className="flex items-center">
                                    <CounterButton property={property} />
                                </div>
                            )}
                        </div>
                        <p className="mt-5">{property.description}</p>
                    </div>

                    {/* BADGE */}
                    <div className="flex justify-around items-center py-8">
                        {[
                            { label: "Stanze", value: property.rooms, icon: faSink },
                            { label: "Bagni", value: property.bathrooms, icon: faPersonBooth },
                            { label: "Letti", value: property.beds, icon: faBed },
                            { label: "m2", value: property.m2, icon: faWaveSquare },
                        ].map(({ label, value, icon }, index) => (
                            <div
                                key={index}
                                className="border border-green-500 py-3 px-5 w-1/5 rounded-md bg-green-50"
                            >
                                <h1 className="font-extrabold text-lg text-green-600/100">
                                    {label}
                                </h1>
                                <div className="font-bold">
                                    <FontAwesomeIcon icon={icon} style={{ color: "#04f153" }} />
                                    <span> {value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FORM CONTACT */}
                <section>
                    <h1 className="text-2xl font-semibold mt-12">
                        Hai bisogno di più informazioni?
                    </h1>
                    <p className="my-3 text-lg">
                        Mettiti in contatto con {owner.name}, il proprietario di casa
                    </p>
                    <div className="text-lg my-3">
                        {owner.name} :{" "}
                        <span className="text-lg mx-24 italic">
                            <button
                                type="button"
                                className="cursor-pointer hover:underline hover:text-green-700"
                            >
                                {owner.owner_email}
                            </button>
                        </span>
                    </div>
                    <MailForm />
                </section>

                {/* REVIEWS */}
                <section>
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-3xl mt-32 mb-6">
                            RECENSIONI{" "}
                            <span className="italic font-normal opacity-45">
                                ({review.length})
                            </span>
                        </h1>
                        <div className="mt-32 mb-6 text-xl">
                            <span className="italic opacity-60">in media votato:</span>
                            <FontAwesomeIcon
                                icon={
                                    property.avg_vote >= 5
                                        ? faStar
                                        : property.avg_vote >= 3
                                            ? faStarHalfStroke
                                            : property.avg_vote === 2
                                                ? faStarHalf
                                                : empty
                                }
                                style={{ color: "#FFD43B" }}
                            />
                            {property.avg_vote}
                        </div>
                    </div>

                    <button
                        type="button"
                        id="openForm"
                        onClick={toggleForm}
                        className="mb-6 hover:text-indigo-500 hover:underline"
                    >
                        Aggiungi una recensione
                    </button>
                    {openForm && (
                        <FormReview id={id} callback={closeForm} onSubmit={fetchPost} />
                    )}

                    {review.length > 0 ? (
                        review.map((element) => (
                            <div
                                key={element.id}
                                className="py-12 sm:py-0 px-32 sm:px-0 flex justify-center items-center border-t-2 border-green-500"
                            >
                                <div className="relative isolate overflow-hidden bg-white grow">
                                    <div className="mx-auto max-w-2xl lg:max-w-4xl">
                                        <div className="flex justify-between items-center">
                                            <div className="mt-8 flex items-center space-x-3 text-base">
                                                <div className="font-semibold text-gray-900 text-xl">
                                                    {element.name}
                                                </div>
                                            </div>
                                            <img src={greenLogo} className="h-20" alt="logo" />
                                        </div>
                                        <div className="p-1 my-3 w-40 border border-green-500 rounded-xs bg-green-50">
                                            permanenza: <b>{element.days}</b>{" "}
                                            <span className="italic text-gray-400">giorni</span>
                                        </div>
                                        <blockquote className="text-xl font-semibold text-gray-900">
                                            <p>{element.text}</p>
                                        </blockquote>
                                        <div className="flex justify-around items-center my-6">
                                            <VoteStar vote={element.vote} />
                                            <div className="opacity-35">{element.date_it}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center">Nessuna recensione</div>
                    )}
                </section>
            </div>
        </>
    );
}
