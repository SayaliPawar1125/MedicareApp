import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

class CartServices {
    
    addItemToCart(cartItemPayload) {
        return axios.post(`${API_BASE_URL}/addtocart`, cartItemPayload);
    }

    getAllCartItems() {
        return axios.get(`${API_BASE_URL}/getAllCartItems`);
    }

    deleteCartItem(id) {
        return axios.delete(`${API_BASE_URL}/deleteCartItem/${id}`);
    }

    updateItemQuantity(id, quantity) {
        return axios.put(`${API_BASE_URL}/updatequantity/${id}`, null, {
            params: { quantity: quantity }
        });
    }
}

export default new CartServices();
