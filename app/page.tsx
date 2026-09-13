"use client"
import Carousel from "./components/BrandsCarousel/Carousel"
import DressStyle from "./components/DressStyle/DressStyle"
import First from "./components/FirstPart/First"
import ProductPage from "./components/ProductsPage/ProductPage"
import SwiperComm from "./components/SwiperForComm/SwiperComm"

function HomePage() {
  return (
    <div>
      <First/>
      <Carousel/>
      <ProductPage/>
      <DressStyle/>
      <SwiperComm/>
    </div>
  )
}

export default HomePage