import axios from 'axios';
import { ORDER_API_URL } from "../config/backend.config";

class OrderService {
    static async getAllOrders() {
        return await axios.get(ORDER_API_URL);
    }

    static updateOrder(id, updatedOrder) {
        return axios.put(ORDER_API_URL + "/" + id, updatedOrder);
    }

    static getOrderById(id) {
        return axios.get(`${ORDER_API_URL}/${id}`);
    }

    static addOrder(orderData) {
        return axios.post(`${ORDER_API_URL}/`, orderData);
    }
}

export default OrderService;
