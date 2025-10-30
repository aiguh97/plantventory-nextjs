export interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageURL?: string;
  [key: string]: any;
}

/**
 * Mengambil data user dari localStorage
 */
export const fetchUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") {
      localStorage.clear();
      return null;
    }
    return JSON.parse(storedUser) as User;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    localStorage.clear();
    return null;
  }
};

/**
 * Mengambil data cart dari localStorage
 */
export const fetchCart = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cartItems");
    if (!storedCart || storedCart === "undefined") {
      localStorage.clear();
      return [];
    }
    return JSON.parse(storedCart) as CartItem[];
  } catch (error) {
    console.error("Failed to parse cartItems from localStorage:", error);
    localStorage.clear();
    return [];
  }
};
