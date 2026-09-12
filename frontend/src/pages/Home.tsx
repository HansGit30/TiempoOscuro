import { HeroBanner } from "../components/home/HeroBanner"
import Marquee from "../components/home/Marquee";
import Mundo from "../components/home/Mundo";
import Navbar from "../components/home/Navbar";
import Novedades from "../components/home/Novedades";
import '../index.css';

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <HeroBanner />
      <Marquee 
        items={[
          '📚 Explora tus mundos favoritos', 
          '🐉 Colección completa de Mangas', 
          '🧙‍♂️ Un mundo para cada lector'
        ]} 
        speed={50} 
      />

      <Novedades></Novedades>
      <Mundo />



    </>

  )
}

export default Home