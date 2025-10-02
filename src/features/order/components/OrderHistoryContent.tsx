import React, { useEffect, useState } from 'react';
import type { PaginatedResponse } from '../../menu/types/PaginatedResponse';
import type { Order } from '../../menu/types/Order';
import OrderService from '../../menu/services/orderService';

// Definimos un tipo para inicializar el estado paginado
const initialPaginationState: PaginatedResponse<Order> = {
    search: " ",
    pageIndex: 1,
    pageSize: 5,
    total: 0,
    registers: [], // Aquí es donde están las órdenes reales
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
};

export const OrderHistoryContent: React.FC = () => {
    const [ordersData, setOrdersData] = useState<PaginatedResponse<Order>>(initialPaginationState);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Estado de paginación
    const [currentPage, setCurrentPage] = useState(1); 
    const pageSize = 5; // Valor fijo, por ahora

    const fetchOrders = async (page: number) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // 💡 Llamada al servicio con parámetros de paginación
            const fetchedData = await OrderService.getOrdersByUser(page, pageSize);
            setOrdersData(fetchedData);
            setCurrentPage(fetchedData.pageIndex);
            
        } catch (err) {
            setError('No se pudieron cargar tus órdenes. Por favor, revisa tu conexión o inicia sesión de nuevo.');
            console.error("Fetch Orders Error:", err);
            setOrdersData(initialPaginationState); 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Carga inicial al abrir el modal
        fetchOrders(1);
    }, []); 

    // Botones de navegación
    const goToPreviousPage = () => {
        if (ordersData.hasPreviousPage) {
            fetchOrders(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (ordersData.hasNextPage) {
            fetchOrders(currentPage + 1);
        }
    };


    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">My Orders History</h2>
            {isLoading && <p className="text-center text-blue-500">Cargando historial de órdenes...</p>}
            {error && <p className="p-2 bg-red-100 text-red-700 rounded mb-4">{error}</p>}

            {!isLoading && ordersData.registers.length === 0 && !error && (
                <p className="text-gray-500 text-center">No tienes órdenes registradas.</p>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {ordersData.registers.map(order => (
                    <div key={order.id} className="p-3 border rounded-lg shadow-sm bg-gray-50">
                        <div className="flex justify-between font-semibold">
                            <span>Order #{order.id}</span>
                            <span className={`text-sm font-medium ${order.status === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                                Pending
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">Total Items: {order.orderItems.length || 0}</p>
                    </div>
                ))}
            </div>
            
            {/* Controles de paginación */}
            {!isLoading && ordersData.registers.length > 0 && (
                <div className="flex justify-between items-center mt-4 border-t pt-3">
                    <button
                        onClick={goToPreviousPage}
                        disabled={!ordersData.hasPreviousPage || isLoading}
                        className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="text-sm text-gray-700">
                        Página {ordersData.pageIndex} de {ordersData.totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={!ordersData.hasNextPage || isLoading}
                        className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};