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
            <div
                aria-hidden="true"
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-1097/845 w-[68.5625rem] bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                />
            </div>
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
