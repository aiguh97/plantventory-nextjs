"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { stackServerApp } from "@/stack";

// Get all products with optional search
export async function getProducts(searchTerm?: string) {
  try {
    const whereClause: Record<string, any> = {};

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userProducts = await prisma.product.findMany({
      where: whereClause,
    });

    revalidatePath("/");
    return { success: true, userProducts };
  } catch (error) {
    console.error("Error in getProducts", error);
    return { success: false, userProducts: [] };
  }
}

// Get single product
export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

// Create product
export async function createProduct(data: Prisma.ProductCreateInput) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) throw new Error("Unauthorized");

    const newProduct = await prisma.product.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/products");
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Update product
export async function editProduct(id: string, data: Prisma.ProductUpdateInput) {
  try {
    const currentUserId = await getUserId();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/products");
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete product
export async function deleteProduct(id: string) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    // Hapus CartItems terlebih dahulu
    await prisma.cartItem.deleteMany({
      where: { productId: id },
    });

    // Ambil order terkait
    const orderItems = await prisma.orderItem.findMany({
      where: { productId: id },
      select: { orderId: true },
    });

    const orderIds = Array.from(new Set(orderItems.map((item) => item.orderId)));

    // Hapus produk
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    // Hapus order kosong
    for (const orderId of orderIds) {
      const remaining = await prisma.orderItem.count({
        where: { orderId },
      });

      if (remaining === 0) {
        await prisma.order.delete({ where: { id: orderId } });
      }
    }

    revalidatePath("/products");
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
