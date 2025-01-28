import { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as empty } from "@fortawesome/free-regular-svg-icons"
import { faSink, faPersonBooth, faBed, faWaveSquare, faStar, faStarHalfStroke, faStarHalf } from "@fortawesome/free-solid-svg-icons"
import greenLogo from '../assets/green.svg'
import defaultImg from '../assets/placeholder.png'
import HeroShow from '../components/HeroShow'
import MailForm from '../components/MailForm'
import VoteStar from '../components/VoteStar'
import FormReview from '../components/FormReview'
import CounterButton from "@/components/Hearts"
import GoHomeButton from "@/components/GoHomeButton"

export default function Show() {

    const [property, setProperty] = useState('')
    const [owner, setOwner] = useState('')
    const [review, setReview] = useState([])
    const [hearts, setHearts] = useState(0)


    //toggle form
    const [openForm, setOpenForm] = useState(false)
    function toggleForm() {
        setOpenForm(true)
        document.getElementById('openForm').style.display = 'none'
    }

    function closeForm() {
        setOpenForm(false)
        document.getElementById('openForm').style.display = 'block'
    }

    const { id } = useParams()

    function fetchPost() {
        axios.get(`http://localhost:3000/api/properties/${id}`)
            .then(res => {
                setProperty(res.data)
                setOwner(res.data.owner[0])
                setReview(res.data.reviews)
                setHearts(res.data.hearts)
                console.log(res.data)
            })
            .catch(err => err.message)
    }

    useEffect(() => {
        fetchPost()
    }, [id])

    return (
        <>
            <div className="container mt-5">
                <GoHomeButton />
            </div>
            <div className="p-6 mt-8 lg:px-60">
                {/*  HERO  */}
                <section>
                    <HeroShow img={property.img ? property.img : defaultImg} room={property.rooms} bed={property.beds} bath={property.bathrooms} heart={property.hearts} title={property.title} description={property.description} />
                </section>
                {/* DESCRIPTION */}
                <section className="mt-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold">{property.title}</h1>
                            <h4 className="text-2xl font-semibold">{property.building_type} a {property.city}, {property.address}</h4>
                        </div>
                        <div className="flex justify-between items-center gap-3 text-2xl">
                            {property && property.hearts !== undefined && (
                                <CounterButton property={property} />
                            )}
                        </div>
                    </div>
                    <div className="m-6 text-lg">
                        {property.description}
                    </div>
                </section>
                {/*  BADGE */}
                <section>
                    <div className="flex justify-around items-center py-8">
                        <div className="border border-green-500 border-solid py-3 px-5 w-1/5 rounded-md bg-green-50">
                            <h1 className="font-extrabold text-lg text-green-600/100">Stanze</h1>
                            <div className="font-bold"><FontAwesomeIcon icon={faSink} style={{ color: "#04f153", }} /><span> {property.rooms}</span></div>
                        </div>
                        <div className="border border-green-500 border-solid py-3 px-5 w-1/5 rounded-md bg-green-50">
                            <h1 className="font-extrabold text-lg text-green-600/100">Bagni</h1>
                            <div className="font-bold"><FontAwesomeIcon icon={faPersonBooth} style={{ color: "#04f153", }} /><span> {property.bathrooms}</span></div>
                        </div>
                        <div className="border border-green-500 border-solid py-3 px-5 w-1/5 rounded-md bg-green-50">
                            <h1 className="font-extrabold text-lg text-green-600/100">Letti</h1>
                            <div className="font-bold"><FontAwesomeIcon icon={faBed} style={{ color: "#04f153", }} /><span> {property.beds}</span></div>
                        </div>
                        <div className="border border-green-500 border-solid py-3 px-5 w-1/5 rounded-md bg-green-50">
                            <h1 className="font-extrabold text-lg text-green-600/100">m2</h1>
                            <div className="font-bold"><FontAwesomeIcon icon={faWaveSquare} style={{ color: "#04f153", }} /><span> {property.m2}</span></div>
                        </div>
                    </div>
                </section>
                {/* FORM CONTACT */}
                <section>
                    <h1 className="text-2xl font-semibold mt-12">Hai bisogno di più informazioni?</h1>
                    <p className="my-3 text-lg">Mettiti in contatto con {owner.name}, il proprietario di casa</p>
                    <div className="text-lg my-3">{owner.name} :
                        <span className="text-lg mx-24 italic "><button type="button" className="cursor-pointer hover:underline decoration-solid hover:text-green-700">{property.email}</button></span> </div>
                    <MailForm />
                </section>
                {/*  REVIEWS */}
                <section>
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-3xl mt-32 mb-6">RENCENSIONI <span className="italic font-normal opacity-45">({review.length})</span> </h1>
                        <div className="mt-32 mb-6 text-xl">
                            <span className="italic opacity-60">in media votato:</span>
                            <FontAwesomeIcon
                                icon={property.avg_vote >= 5 ? faStar : '' ||
                                    property.avg_vote <= 4 && property.avg_vote >= 3 ? faStarHalfStroke : '' ||
                                        property.avg_vote == 2 ? faStarHalf : '' ||
                                            property.avg_vote == 1 ? empty : ''}
                                style={{ color: " #FFD43B ", }} />
                            {property.avg_vote}
                        </div>
                    </div>
                    <button type="button" id="openForm" onClick={toggleForm} className="mb-6 hover:text-indigo-500 hover:underline active:text-green-500 ">Aggiungi una recensione</button>
                    {openForm &&
                        <FormReview id={id} callback={closeForm} onSubmit={fetchPost} />}
                    {review ?
                        review.map(element =>
                            <div key={element.id} className="py-12 sm:py-0 px-32 sm:px-0 flex justify-center items-center border-t-2 border-green-500">

                                <div className="relative isolate overflow-hidden bg-white grow">
                                    <div className="mx-auto max-w-2xl lg:max-w-4xl">
                                        <div className="flex justify-between items-center">
                                            <div className="mt-8 flex items-center justify-center space-x-3 text-base">
                                                <div className="font-semibold text-gray-900 text-xl">{element.name}</div>
                                            </div>
                                            <img
                                                src={greenLogo}
                                                className="h-20"
                                            />
                                        </div>
                                        <div className="p-1 my-3 w-40 border border-green-500 border-solid rounded-xs bg-green-50">
                                            permanenza: <b>{element.days}</b> <span className="italic text-gray-400 "> giorni</span>
                                        </div>
                                        <blockquote className="text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
                                            <p>{element.text}</p>
                                        </blockquote>
                                        <div className="flex justify-around items-center my-6">
                                            <VoteStar vote={element.vote} />
                                            <div className="opacity-35">{element.date_it}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        <div className="flex justify-center">Nessuna recensione</div>}
                </section>
            </div>
        </>
    )
}