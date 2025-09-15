import axios from 'axios';
import type { IProductsResponse } from '../types/Product/IProductsResponse';

const API_URL = 'https://localhost:5001/api/products';

export const getProducts = async (pageIndex: number, pageSize: number, search: string = '') => {
    try{
        const response = await axios.get<IProductsResponse>(
            `${API_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`
        )
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}