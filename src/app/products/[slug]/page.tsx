import React from "react";
import { stackServerApp } from "@/stack";
import { getProductById } from "@/actions/product.action";
import ProductCard from "./ProductCard";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const product = await getProductById(id);

  return {
    title: product ? product.name : "Product Details",
    description: product ? product.description : "Product details page",
  };
}

async function Page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const product = await getProductById(id);

  if (!product) throw new Error("Product not found");

  // ✅ Konversi undefined → null
  const safeProduct = {
    ...product,
    imageUrl: product.imageUrl ?? null,
    downloadUrl: product.downloadUrl ?? null,
    description: product.description ?? null,
  };

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <ProductCard product={safeProduct} />
      </div>
    </div>
  );
}

export default Page;
