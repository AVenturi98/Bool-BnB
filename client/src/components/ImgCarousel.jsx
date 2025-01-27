
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

export default function ImgCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
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
        <section className="p-4">
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-screen-lg"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {properties.map((property) => (
                        <CarouselItem key={property.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/4">
                            <div className="">
                                <Card className="h-full">
                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                        <img src={property.img} alt={property.title} className="object-cover w-full h-full rounded-xl overflow-hidden" />
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
