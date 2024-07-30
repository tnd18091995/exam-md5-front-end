import axios from 'axios';
import { PRODUCT_API_URL } from "../config/backend.config";

class ProductService {
    static async getAllProducts() {
        return await axios.get(PRODUCT_API_URL);
    }

    static async deleteProductById(id) {
        return await axios.delete(PRODUCT_API_URL + "/" + id);
    }

    static updateProduct(id, updatedProduct) {
        return axios.put(PRODUCT_API_URL + "/" + id, updatedProduct);
    }

    static getProductById(id) {
        return axios.get(PRODUCT_API_URL + "/" + id);
    }

    static addProduct(productData) {
        return axios.post(PRODUCT_API_URL + '/', productData);
    }
}

export default ProductService;
