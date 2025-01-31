import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import axios from "axios"

// hook
import { useState, useEffect } from "react"
import { Link } from "react-router"

import placeHolder from '../assets/placeholder.png'


export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  )

  const [properties, setProperties] = useState([])

  function fetchProperties() {

    axios
      .get("http://localhost:3000/api/properties/")
      .then((response) => {
        setProperties(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      })

  }

  useEffect(() => {
    fetchProperties();
  }, []);

  // Funzione per ottenere un'immagine casuale dall'array
  const getRandomImage = () => {
    if (properties.length > 0) {
      const randomIndex = Math.floor(Math.random() * properties.length);
      return properties[randomIndex].img !== "" ? properties[randomIndex].img : placeHolder;
    }
    return placeHolder;
  };


  return (
    <div className="flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        options={{ loop: true }}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {properties.map((property) => (
            <CarouselItem key={property.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-0 h-[250px] w-full">
                    <Link to={`/properties/${property.slug}`} className="block w-full h-full rounded-xl overflow-hidden">
                      <img
                        src={property.img !== "" ? property.img : getRandomImage()}
                        alt={property.title}
                        className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
