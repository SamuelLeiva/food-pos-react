import React from 'react';
import type { IProduct } from '../types/Product/IProduct';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto' }} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Categoría:</strong> {product.category.name}</p>
    </div>
  );
};

export default ProductCard;