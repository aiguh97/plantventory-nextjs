import { fetchUser, fetchCart, User, CartItem } from "../utils/fetchLocalStorageData";
import { PlantItem } from "./reducer"; // pastikan path-nya sesuai

export interface State {
  user: User | null;
  plantItems: PlantItem[] | null;
  cartShow: boolean;
  cartItems: CartItem[];
}

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState: State = {
  user: userInfo,
  plantItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
