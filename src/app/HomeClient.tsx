"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import HomeContainer from "@/components/HomeContainer";
import Footer from "@/components/Footer";
import MenuContainer from "@/components/MenuContainer";
import ProductCard from "@/app/products/[slug]/ProductCard";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  imageUrl: string | null;
  downloadUrl?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

interface HomeClientProps {
  initialProducts?: Product[];
}

export default function HomeClient({ initialProducts = [] }: HomeClientProps) {
  const [plants, setPlants] = useState<Product[]>(initialProducts);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data?.success && Array.isArray(data.userProducts)) {
          setPlants(data.userProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence>
      <main className="mt-24 px-4 md:px-16 w-full relative">
        <div className="flex flex-col items-center justify-center w-full">
          <HomeContainer />

          <section className="w-full my-10 relative">
            <p className="text-2xl font-semibold capitalize text-gray-800 mb-6 relative before:absolute before:rounded-lg before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600">
              Customer Favourites
            </p>

            {canScrollLeft && (
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-green-400 hover:bg-green-500 shadow-md cursor-pointer flex items-center justify-center transition-all duration-200"
                onClick={() => scroll("left")}
              >
                <MdChevronLeft className="text-2xl text-white" />
              </motion.div>
            )}

            {canScrollRight && (
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-green-400 hover:bg-green-500 shadow-md cursor-pointer flex items-center justify-center transition-all duration-200"
                onClick={() => scroll("right")}
              >
                <MdChevronRight className="text-2xl text-white" />
              </motion.div>
            )}

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto scrollbar-hide gap-6 scroll-smooth py-4"
            >
              {plants && plants.length > 0 ? (
                plants.map((plant) => (
                  <div key={plant.id} className="min-w-[260px] flex-shrink-0">
                    <ProductCard
                      flag={true}
                      product={{
                        ...plant,
                        createdAt: new Date(plant.createdAt),
                        updatedAt: new Date(plant.updatedAt),
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center w-full py-10">
                  No products found for this category.
                </p>
              )}
            </div>
          </section>

          <MenuContainer initialProducts={initialProducts} />
          <Footer />
        </div>
      </main>
    </AnimatePresence>
  );
}
