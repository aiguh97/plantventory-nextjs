import { NextResponse } from "next/server";
import { getProducts } from "@/actions/product.action";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
