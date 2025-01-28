

import { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSink, faPersonBooth, faBed, faWaveSquare } from "@fortawesome/free-solid-svg-icons"
import greenLogo from '../assets/green.svg'
import HeroShow from '../components/HeroShow'
import MailForm from '../components/MailForm'
import VoteStar from '../components/VoteStar'
import defaultImg from '../assets/placeholder.png'
import CounterButton from "@/components/Hearts"

const text = `Lo Chalet Alpino, situato in Via delle Alpi 15 a Cortina, è una splendida proprietà che unisce eleganza e comfort in un contesto montano unico. Con una superficie di 200 m², la casa si sviluppa su due piani, offrendo ampi spazi per il relax e la convivialità. Composta da 6 stanze, tra cui 4 comodi letti e 3 bagni, è l'ideale per ospitare famiglie o gruppi di amici in cerca di una fuga nella natura senza rinunciare al lusso.
L'interior design è pensato per creare un'atmosfera calda e accogliente, con elementi tipici dello stile alpino e finiture moderne. Le grandi finestre permettono di godere della vista panoramica sulle montagne circostanti, mentre i dettagli in legno e pietra conferiscono un tocco rustico e sofisticato.
La posizione invidiabile di questo chalet lo rende un punto di partenza perfetto per esplorare le meraviglie delle Dolomiti, sia d'inverno, per praticare sci e sport sulla neve, che d'estate, per escursioni e passeggiate nella natura. Chalet Alpino è il luogo ideale per vivere una vera e propria esperienza montana, all'insegna del relax e della bellezza.
`

export default function Show() {

    const [property, setProperty] = useState('')
    const [owner, setOwner] = useState('')
    const [review, setReview] = useState([])
    const [hearts, setHearts] = useState(0)

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
        <div className="p-6 my-12 lg:px-60 border-b-4 border-grey-500">
            {/*  HERO  */}
            <section>
                <HeroShow img={property.img ? property.img : defaultImg} room={property.rooms} bed={property.beds} bath={property.bathrooms} heart={hearts} title={property.title} />
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
                    {text}
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
                <h1 className="font-bold text-3xl mt-32 mb-6">RENCENSIONI ({review.length})</h1>
                {review ?
                    review.map(element =>
                        <div key={element.id} className="py-12 flex justify-center items-center border-t-2 border-green-500">

                            <div className="relative isolate overflow-hidden bg-white">
                                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                                    <div className="flex justify-around items-center">
                                        <div className="mt-8 flex items-center justify-center space-x-3 text-base">
                                            <div className="font-semibold text-gray-900 text-xl">{element.name}</div>
                                        </div>
                                        <img
                                            src={greenLogo}
                                            className="h-20"

                                        />
                                    </div>
                                    <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
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
    )
}


