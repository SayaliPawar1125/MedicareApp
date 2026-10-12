import api from "./api";

const API_BASE_URL = "/api/cart";

class CartServices {

    addItemToCart(cartItemPayload) {
        return api.post(
            `${API_BASE_URL}/addtocart`,
            cartItemPayload
        );
    }

    getAllCartItems() {
        return api.get(
            `${API_BASE_URL}/getAllCartItems`
        );
    }

    deleteCartItem(id) {
        return api.delete(
            `${API_BASE_URL}/deleteCartItem/${id}`
        );
    }

    updateItemQuantity(id, quantity) {
        return api.put(
            `${API_BASE_URL}/updatequantity/${id}`,
            null,
            {
                params: {
                    quantity: quantity
                }
            }
        );
    }
}

export default new CartServices();