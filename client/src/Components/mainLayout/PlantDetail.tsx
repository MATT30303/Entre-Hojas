import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useHeader } from "../../contexts/HeaderContext";
import * as Images from "../../assets/images"
import { Search, Share, Arrow } from "../../assets/icons";
import React from "react";
export interface PlantImage{
  id: number;
  url: string;
  tipo: string
}


interface Plant {
  id: number;
  nombre: string;
  familia: string;
  stock: number;
  precio: number;
  discount: number;
  etiqueta: string;
  origen: string;
  tipo: string;
  iluminacion: string;
  resistencia: string;
  tamano: string;
  cuidado: string;
  descripcion: string;
  imagenes: PlantImage[];
}



export default function PlantDetail({id}:{id?:number}) {
  const navigate = useNavigate();
  const {configureHeader} = useHeader()
  React.useEffect(() => {
      configureHeader({
        placeholder: "Buscar Entre Hojas",
        showBackButton: true,
        showShadow: false,
        showSearch: false,
        showShare: true,
        showHeader: false
      })
    }, [])

  const {id : idParam} = useParams();
  const selectedPlant = id ?? idParam;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plant, setPlant] = useState<Plant | null>(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
  useEffect(() => {
    const controller = new AbortController();

    const getPlantsByFamily = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const requestedPlant = selectedPlant;
        const response = await axios.get<Plant>(
          `${API_BASE_URL}/api/plantas/${encodeURIComponent(requestedPlant!)}`,
          { signal: controller.signal },
        );
        setPlant(response.data);
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setPlant([]);
          setError("No pudimos cargar las plantas. Intentá nuevamente más tarde.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void getPlantsByFamily();

    return () => controller.abort();
  }, [selectedPlant]);


  const [currentImage, setCurrentImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const index = Math.round(
      scrollRef.current.scrollLeft / scrollRef.current.clientWidth
    );

    setCurrentImage(index);
  };


  return (
    <main className="h-[200svh] bg-bg-light">
      {isLoading && <p className="mt-6 font-Manrope text-black">Cargando planta...</p>}
      {error && <p className="mt-6 font-Manrope text-black">{error}</p>}  

      <div className="w-screen h-12 fixed top-0 grid grid-cols-3 items-center bg-primary z-0 shadow-md"></div>
      <header className="w-screen h-12 fixed top-0 grid grid-cols-3 items-center z-10">
        
        <div className="flex justify-center items-center w-10 h-10 cursor-pointer" onClick={() => navigate(-1)}>
          <div className="p-1.5 bg-primary/70 rounded-2xl cursor-pointer">
            <Arrow className="w-4 h-4 cursor-pointer z-20" />
          </div>
        </div>
        <div className="col-start-3 w-18 h-8 justify-self-center flex justify-between items-center">
          <div className="p-1.5 bg-primary/70 rounded-2xl cursor-pointer">
          <Search className="w-4 h-4 z-0" />
          </div>
          <div className="p-1.5 bg-primary/70 rounded-2xl cursor-pointer">
          <Share className="w-4 h-4 z-0"/>
          </div>
        </div>
      </header>

      {plant &&
      <section className="relative">
        <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-55 flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none z-0 relative">
          {plant.imagenes
          .filter((imagen)=> imagen.tipo === "detail")
          .map((imagen) => (
              <img
              key={imagen.id}
              src={Images[imagen.url as keyof typeof Images]}
              alt={plant.nombre}
              className="w-full shrink-0 snap-center object-cover -z-0"
              />
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20 ">
          {plant.imagenes
          .filter((imagen)=> imagen.tipo === "detail")
          .map((_, index) => (
            <div
              key={index}
              className={`h-1 w-1 rounded-full transition-all duration-300 ease-in-out shadow-lg ${
                currentImage === index
                  ? "bg-alt w-2"
                  : "bg-white"
              }`}
            />
          ))}
        </div>
      </section>
      }

    </main>
  )
}
