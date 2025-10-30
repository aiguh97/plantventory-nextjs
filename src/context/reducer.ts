import { User, CartItem } from "../utils/fetchLocalStorageData";

export interface PlantItem {
  id: string;
  name: string;
  category: string;
  price: number;
  imageURL: string;
  [key: string]: any;
}

export interface State {
  user: User | null;
  plantItems: PlantItem[] | null;
  cartShow: boolean;
  cartItems: CartItem[];
}

export const actionType = {
  SET_USER: "SET_USER",
  SET_PLANT_ITEMS: "SET_PLANT_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEMS: "SET_CART_ITEMS",
} as const;

export type ActionType = typeof actionType[keyof typeof actionType];

export type Action =
  | { type: typeof actionType.SET_USER; user: User | null }
  | { type: typeof actionType.SET_PLANT_ITEMS; plantItems: PlantItem[] | null }
  | { type: typeof actionType.SET_CART_SHOW; cartShow: boolean }
  | { type: typeof actionType.SET_CART_ITEMS; cartItems: CartItem[] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_PLANT_ITEMS:
      return {
        ...state,
        plantItems: action.plantItems,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};
