
import * as React from "react"
import axios from "axios"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import placeHolder from '../assets/placeholder.png'
import { Link } from "react-router"

export default function ImgCarousel() {
    const plugin = React.useRef(
        Autoplay({ stopOnInteraction: false })
    );

    const [properties, setProperties] = useState([])

    useEffect(() => {
        fetchImg()
    }, [])

    function fetchImg() {
        axios.get('http://localhost:3000/api/properties')
            .then(res => {
                setProperties(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <section className="p-4 overflow-hidden ">
            <Carousel
                plugins={[plugin.current]}
                options={{ loop: true }}
                className="w-full max-w-screen-lg "
            >
                <CarouselContent className="-ml-2 md:-ml-4 animate-scroll">
                    {properties.map((property) => (
                        <CarouselItem key={property.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/4">
                            <div>
                                <Card className="h-full">
                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                        <Link to={`/api/properties/${property.id}`} className="block w-full h-full">
                                            <img src={property.img || placeHolder} alt={property.title} className="object-cover w-full h-full rounded-xl overflow-hidden" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}
