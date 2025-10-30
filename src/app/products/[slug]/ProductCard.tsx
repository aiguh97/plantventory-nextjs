import React from "react";
import { motion } from "framer-motion";
import { MdShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  imageUrl: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface ProductCardProps {
  product: Product;
  flag?: boolean;
}

export default function ProductCard({
  product,
  flag = false,
}: ProductCardProps) {
  const imageSrc = product?.imageUrl;

  return (
    <div
      key={product?.id}
      className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center justify-evenly gap-3 
      ${flag ? "h-[320px]" : "h-[260px]"}`}
    >
      {/* Top Section */}
      <div className="w-full flex items-center justify-between">
        {/* Product Image */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative w-36 h-36 -mt-12 drop-shadow-lg"
        >
          <img
            src={imageSrc || "https://placehold.co/400x400?text=No+Image"}
            alt={product?.name || "Product Image"}
            className="h-full w-full object-contain rounded-lg"
          />
        </motion.div>

        {/* Cart Icon */}
        <motion.div
          whileTap={{ scale: 0.8 }}
          className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:shadow-md"
          onClick={() => console.log("Add to cart:", product.name)}
        >
          <MdShoppingCart className="text-white text-lg" />
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="w-full flex flex-col items-end justify-end -mt-2 gap-2">
        <p className="text-gray-800 font-semibold text-base md:text-lg text-right">
          {product?.name}
        </p>

     {flag && (
          <div className=" flex items-end flex-col justify-center">
            <p className="text-sm text-green-500 mb-1 capitalize">
              {product.category}
            </p>
            <p className="text-[.8rem] text-gray-500 text-right">
              {product?.description}
            </p>
          </div>
        )}

        <div className="w-full flex items-center justify-between mt-1">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaStar className="text-yellow-400" /> 4.6
          </p>
          <p className="text-lg text-green-600 font-semibold">
            ₹ {product?.price}
          </p>
        </div>
      </div>
    </div>
  );
}
