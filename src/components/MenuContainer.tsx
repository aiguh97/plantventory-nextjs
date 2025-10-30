"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categories } from "../utils/data";
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

interface MenuClientProps {
  initialProducts: Product[];
}

export default function MenuClient({ initialProducts }: MenuClientProps) {
  const [filter, setFilter] = useState<string>("all");
  const [plants, setPlants] = useState<Product[]>(initialProducts);

  // optional: refresh via API route (tanpa error async/await)
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

  const filteredPlants = plants.filter(
    (plant) => filter === "all" || plant.category === filter
  );

  return (
    <section className="w-full mb-6 pt-24" id="ourPlants">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:w-32 before:content-start before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100 mr-auto mb-4">
          What are you looking for?
        </p>

        {/* Category Filter */}
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories?.map((category) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={category.id}
              className={`group ${
                filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
              } w-auto min-w-[94px] h-10 p-4 cursor-pointer rounded-lg drop-shadow-md flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
              onClick={() => setFilter(category.urlParamName)}
            >
              <p
                className={`text-sm group-hover:text-white text-center ${
                  filter === category.urlParamName
                    ? "text-white"
                    : "text-textColor"
                }`}
              >
                {category.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Product List */}
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <ProductCard
                key={plant.id}
                product={{
                  ...plant,
                  createdAt: new Date(plant.createdAt),
                  updatedAt: new Date(plant.updatedAt),
                }}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-center w-full py-10">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
