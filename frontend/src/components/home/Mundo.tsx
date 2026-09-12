import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mundo.css';

import harryImg from '../../assets/mundos/HARRYPOTTER_CATEGORIAS.png';
import luffyImg from '../../assets/mundos/ANIME_CATEGORIAS.png';
import pawImg from '../../assets/mundos/MUNDOINFANTIL_CATEGORIAS.png';
import principitoImg from '../../assets/mundos/FONDOPROPIO_CATEGORIAS.png';

interface WorldCard {
    id: number;
    title: string;
    bgClass: string;
    image: string;
    path: string;
}

const worldsData: WorldCard[] = [
    { id: 1, title: 'Harry Potter', bgClass: 'bg-harry', image: harryImg, path: '/categoria/harry-potter' },
    { id: 2, title: 'Mangas', bgClass: 'bg-mangas', image: luffyImg, path: '/categoria/mangas' },
    { id: 3, title: 'Mundo Infantil', bgClass: 'bg-infantil', image: pawImg, path: '/categoria/infantil' },
    { id: 4, title: 'Fondo Propio', bgClass: 'bg-fondo', image: principitoImg, path: '/categoria/fondo-propio' },
];

const Main: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="mundos-container">
            <h2 className="mundos-title">Un mundo para cada lector</h2>

            <div className="mundos-grid">
                {worldsData.map((world) => (
                    <img
                        key={world.id}
                        src={world.image}
                        alt={world.title}
                        className="card-banner-img"
                        onClick={() => navigate(world.path)}
                        role="button"
                        tabIndex={0}
                    />
                ))}
            </div>
        </section>
    );
};

export default Main;