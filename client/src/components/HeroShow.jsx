import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRestroom, faSink, faBed, } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import placeholder from "../assets/placeholder.png"

export default function Example({ img, room, bed, bath, heart, title, description }) {

    useEffect(() => {
        const anim = document.getElementById('anim');
        if (anim) {
            const intervalId = setInterval(() => {
                anim.classList.remove('animate-[ping_2s_ease-in-out_forwards]', 'animate-[ping_5s_ease-in-out_reverse]');
                void anim.offsetWidth; // Trigger reflow to restart the animation
                anim.classList.add('animate-[ping_2s_ease-in-out_forwards]');
                setTimeout(() => {
                    anim.classList.remove('animate-[ping_2s_ease-in-out_forwards]');
                    void anim.offsetWidth; // Trigger reflow to restart the animation
                    anim.classList.add('animate-[ping_5s_ease-in-out_reverse]');
                    setTimeout(() => {
                        anim.classList.remove('animate-[ping_5s_ease-in-out_reverse]');
                    }, 5000); // Durata della seconda animazione
                }, 2000); // Durata della prima animazione
            }, 12000); // Intervallo totale tra le animazioni

            return () => clearInterval(intervalId);
        }
    }, []);




    return (
        <div className="relative isolate overflow-hidden bg-gray-900 lg:py-24 px-2 rounded-md flex justify-center items-center">
            <img
                alt=""
                src={img}
                className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
            />
            <div id="anim" className="m-6 max-w-7xl px-6 py-3 lg:px-8 backdrop-blur-md rounded-md bg-black bg-opacity-30">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl text-green-600/100">{title}</h2>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                        {description && description.slice(0, 150) + '...'}
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="flex flex-col-reverse gap-1">
                            <dt className="text-base/7 text-gray-300">Rooms</dt>
                            <dd className="text-4xl font-semibold tracking-tight text-white">
                                <div className="font-bold"><FontAwesomeIcon icon={faSink} style={{ color: "#c1cfe6", }} /><span> {room}</span></div>
                            </dd>
                        </div>
                        <div className="flex flex-col-reverse gap-1">
                            <dt className="text-base/7 text-gray-300">Beds</dt>
                            <dd className="text-4xl font-semibold tracking-tight text-white">
                                <div className="font-bold"><FontAwesomeIcon icon={faBed} style={{ color: "#c1cfe6", }} /><span> {bed}</span></div>
                            </dd>
                        </div>
                        <div className="flex flex-col-reverse gap-1">
                            <dt className="text-base/7 text-gray-300">Bathrooms</dt>
                            <dd className="text-4xl font-semibold tracking-tight text-white">
                                <div className="font-bold"><FontAwesomeIcon icon={faRestroom} style={{ color: "#c1cfe6", }} /><span> {bath}</span></div>
                            </dd>
                        </div>
                        <div className="flex flex-col-reverse gap-1 animate__backInLeft">
                            <dt className="text-base/7 text-gray-300">Loved</dt>
                            <dd className="text-4xl font-semibold tracking-tight text-white">
                                <div className="font-bold"><FontAwesomeIcon icon={faHeart} style={{ color: "#c1cfe6", }} /><span> {heart}</span></div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
