import { getProducts } from "@/actions/product.action";
import HomeClient from "./HomeClient";
// import HomeClient from "./HomeClient"; // pastikan path ini benar

export default async function Page() {
  const products = await getProducts();

  const serializedProducts = products.userProducts.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <HomeClient initialProducts={serializedProducts} />;
}
