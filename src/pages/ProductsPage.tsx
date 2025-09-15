import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/products.service';
import type { IProductsResponse } from '../types/Product/IProductsResponse';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  const [productsData, setProductsData] = useState<IProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts(pageIndex, 5, search);
        setProductsData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [pageIndex, search]);

  const handleNextPage = () => setPageIndex(prev => prev + 1);
  const handlePreviousPage = () => setPageIndex(prev => prev - 1);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Menú de Productos</h1>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '8px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productsData?.registers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePreviousPage} disabled={!productsData?.hasPreviousPage}>
          Anterior
        </button>
        <span style={{ margin: '0 16px' }}>
          Página {productsData?.pageIndex} de {productsData?.totalPages}
        </span>
        <button onClick={handleNextPage} disabled={!productsData?.hasNextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;