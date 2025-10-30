import React from "react";
import { RiPlantFill } from "react-icons/ri";
import { heroData } from "../utils/data";
import heroimage from "../img/frame-1.png";
import Image, { StaticImageData } from "next/image";

interface HeroItem {
  id: number;
  name: string;
  decp: string;
  prize: number;
  imageSrc: string | StaticImageData;
}

const HomeContainer: React.FC = () => {
  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col items-start justify-center gap-5">
        <div className="flex items-center justify-center gap-2 bg-green-100 px-3 py-1 rounded-full">
          <p className="text-base text-green-500 font-semibold">
            100,000+ Plants Shipped
          </p>
          <div className="w-7 h-7 bg-white rounded-full overflow-hidden drop-shadow-xl flex items-center justify-center">
            <RiPlantFill className="text-base text-green-600" />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold text-headingColor tracking-wide">
          We love helping you save the
          <span className="text-green-600 text-[3rem] lg:text-[5rem]">
            {" "}
            Earth
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Provide your house & office space with the right plants and let them
          make a positive impact on your environment.
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-green-400 to-green-600 px-4 py-2 rounded-lg
          transition-all ease-in-out duration-100 w-full md:w-auto hover:shadow-lg"
        >
          Explore Plants
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="py-2 flex-1 flex items-center relative">
        <Image
          src={heroimage}
          alt="hero-bg"
          className="ml-auto h-[420px] lg:h-[650px] lg:w-auto object-contain"
          // style={{ zIndex:20 }}
        />

        {/* floating cards */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-6">
          <div className="grid xl:grid-cols-3 grid-cols-2 gap-6 gap-y-20 place-items-center">
            {heroData &&
              heroData.map((n: HeroItem, i: number) => {
                const isLast = i === heroData.length - 1;
                const remainder3 = heroData.length % 3;
                const centerIn3Cols = remainder3 === 1 && isLast; // kalau ganjil dan terakhir

                return (
                  <div
                    key={n.id}
                    className={`
              w-36 lg:w-48 bg-white/80 backdrop-blur-md rounded-3xl drop-shadow-xl
              flex flex-col items-center justify-center p-4 relative
              ${centerIn3Cols ? "xl:col-start-2" : ""}
            `}
                  >
                    <div className="w-20 h-20 lg:w-28 lg:h-28 -mt-12 relative z-10">
                      <Image
                        src={n.imageSrc}
                        alt={n.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <p className="text-sm lg:text-lg font-semibold text-gray-800 mt-3 text-center">
                      {n.name}
                    </p>
                    <p className="text-[10px] lg:text-sm text-gray-500 font-medium my-1 text-center">
                      {n.decp}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      <span className="text-red-600 text-sm">₹</span> {n.prize}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
