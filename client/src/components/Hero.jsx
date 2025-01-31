import ImgCarousel from "./ImgCarousel"
import CarouselResponse from './CarouselResponse'
import { useWindowWidth } from '../contexts/WindowContext.jsx'


export default function Hero() {
    
    // Response Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth >= 640
    
    return (
        <section className={`bg-gradient-to-r from-white via-green-100 to-white flex items-center justify-center my-5 px-10 ${mobileWidth ? 'pb-8 pt-[90px]' : 'pb-8 pt-[30px] mt-[-10px]'}`}>
             {mobileWidth ?
             <ImgCarousel /> :
            <CarouselResponse />}
        </section>
    )
}