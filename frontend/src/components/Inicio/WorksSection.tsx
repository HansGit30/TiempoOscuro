import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORKS_DATA } from '../../data/worksData';
import './WorksSection.css';

gsap.registerPlugin(ScrollTrigger);

export const WorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const topImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación del trazo SVG (inicia con el bucle superior)
      if (strokePathRef.current) {
        const pathLength = strokePathRef.current.getTotalLength();

        gsap.set(strokePathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(strokePathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }

      // 2. Animación de las tarjetas: Colapso de las imágenes de la Fila 1
      gsap.to(topImagesRef.current, {
        height: 0,
        opacity: 0,
        marginBottom: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '40% center',
          scrub: 1,
        },
      });

      // 3. Animación de las tarjetas: Elevação / Solapamiento de la Fila 2
      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          y: -180,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '70% bottom',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1Data = WORKS_DATA.slice(0, 2);
  const row2Data = WORKS_DATA.slice(2, 4);

  return (
    <section className="works-section" id="works" ref={sectionRef}>
      {/* Contenedor del trazo con bucle en esquina superior derecha */}
      <div className="green-stroke-bg">
        <svg viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            ref={strokePathRef}
            d="M 380 -20 C 380 180, 220 220, 220 100 C 220 -20, 420 -10, 420 180 C 420 400, 150 500, 50 750"
            stroke="#00e676"
            strokeWidth="50"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="works-container">
        <h2 className="works-title">WORKS</h2>

        <div className="works-stack">
          {/* Fila 1 (animación de compresión de imagen) */}
          <div className="works-row row-1">
            {row1Data.map((work, index) => (
              <div key={work.id} className="work-card">
                <div className="work-card-header">
                  <h3 className="work-card-title">{work.title}</h3>
                  <span className="work-card-badge">{work.countOrBadge}</span>
                </div>

                <p className="work-card-description">{work.description}</p>

                <div
                  className="work-card-image-wrapper"
                  ref={(el) => (topImagesRef.current[index] = el)}
                >
                  <img src={work.imageUrl} alt={work.title} loading="lazy" />
                </div>
              </div>
            ))}
          </div>

          {/* Fila 2 (animación de desplazamiento hacia arriba) */}
          <div className="works-row row-2" ref={row2Ref}>
            {row2Data.map((work) => (
              <div key={work.id} className="work-card">
                <div className="work-card-header">
                  <h3 className="work-card-title">{work.title}</h3>
                  <span className="work-card-badge">{work.countOrBadge}</span>
                </div>

                <p className="work-card-description">{work.description}</p>

                <div className="work-card-image-wrapper">
                  <img src={work.imageUrl} alt={work.title} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;