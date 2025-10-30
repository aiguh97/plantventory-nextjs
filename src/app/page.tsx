// ❌ hapus "use client"
import { AnimatePresence, motion } from "framer-motion";
import HomeContainer from "@/components/HomeContainer";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Footer from "@/components/Footer";
import MenuContainer from "@/components/MenuContainer";
import { getProducts } from "@/actions/product.action"; // contoh

export default async function Home() {
  const products = await getProducts();

  // 🟢 convert Date ke string agar cocok dengan type Product di client
  const serializedProducts = products.userProducts.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <AnimatePresence>
      <main className="mt-24 px-4 md:px-16 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <HomeContainer />
          <section className="w-full my-10">
            <div className="w-full flex items-center justify-between mb-4">
              <p className="text-2xl font-semibold capitalize text-gray-800 relative before:absolute before:rounded-lg before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600">
                Customer Favourites
              </p>
            </div>
          </section>

          {/* ✅ kirim yang sudah di-serialize */}
          <MenuContainer initialProducts={serializedProducts} />
          <Footer />
        </div>
      </main>
    </AnimatePresence>
  );
}

