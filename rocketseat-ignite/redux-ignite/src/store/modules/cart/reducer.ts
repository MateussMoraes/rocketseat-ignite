import { Reducer } from "redux";
import { ActionTypes, ICartState } from "./types";
import produce from "immer";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
}

// Toda regra de negócio que adionarmos em nossa aplicação
// ...verificações, ifs.. sempre ficam no reducer, a action não deve ter
// responsabilidade de fazer nenhuma validação, busca e etc...

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {

  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(item =>
          item.product.id === product.id,
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId)
        break;
      }

      default: {
        return draft;
      }
    }
  });
}

export default cart;