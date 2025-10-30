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

  // === PERBAIKAN FILTER ===
  const filteredPlants = plants.filter((plant) => {
    if (filter === "all") return true;
    // Normalisasi nama kategori agar tidak case sensitive dan tidak error jika null
    const plantCategory = (plant.category || "").trim().toLowerCase();
    const selectedCategory = filter.toLowerCase();
    return plantCategory === selectedCategory;
  });

  return (
    <section className="w-full mb-6 pt-24" id="ourPlants">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:w-32 before:content-start before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100 mr-auto mb-4">
          What are you looking for?
        </p>

        {/* Category Filter */}
        <div className="w-full flex items-center justify-start lg:justify-center gap-4 py-6 overflow-x-scroll scrollbar-none">
          {/* Tambahkan tombol 'All' */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className={`group ${
              filter === "all" ? "bg-cartNumBg" : "bg-card"
            } min-w-[80px] h-10 px-4 cursor-pointer rounded-lg flex items-center justify-center hover:bg-cartNumBg`}
            onClick={() => setFilter("all")}
          >
            <p
              className={`text-sm ${
                filter === "all" ? "text-white" : "text-textColor"
              }`}
            >
              All
            </p>
          </motion.div>

          {categories?.map((category) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              key={category.id}
              className={`group ${
                filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
              } min-w-[100px] h-10 px-4 cursor-pointer rounded-lg flex items-center justify-center hover:bg-cartNumBg`}
              onClick={() => setFilter(category.urlParamName)}
            >
              <p
                className={`text-sm text-center ${
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
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-28">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <ProductCard
              flag={false}
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
