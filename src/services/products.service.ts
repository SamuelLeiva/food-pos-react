import axios from 'axios';
import type { IProductResponse } from '../types/Product/IProductResponse';

const API_URL = 'http://localhost:5001/api/products';

export const getProducts = async (pageIndex: number, pageSize: number, search: string = '') => {
    try{
        const response = await axios.get<IProductResponse>(
            `${API_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`
        )
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}