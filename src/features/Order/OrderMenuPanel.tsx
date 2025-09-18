import { useState, useEffect } from 'react';
import { PiMagnifyingGlass, PiLayout } from 'react-icons/pi';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { MenuItemCard } from './components/MenuItemCard';
import { CategoryTabs } from './components/CategoryTabs';
import { fetchCategories } from '../../services/categoryService';
import { fetchMenuItemsByCategory } from '../../services/menuService';
import type { ICategory } from '../../types/Category/ICategory';
import type { PaginatedResponse } from '../../types/PaginatedResponse';
import type { MenuItem } from '../../types/MenuItem';

export const OrderMenuPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // ✅ Query para las categorías
  const { 
    data: categories, 
    isLoading: isCategoriesLoading, 
    isError: isCategoriesError 
  } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // ✅ Sincroniza la primera categoría al cargar
  useEffect(() => {
    if (categories && categories.length > 0 && selectedCategory === null) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // ✅ Query infinito para los productos, usando paginación y búsqueda
  const {
    data,
    isLoading: isMenuItemsLoading,
    isError: isMenuItemsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedResponse<MenuItem>>({
    // ✅ La clave de la magia: el queryKey incluye la categoría y el término de búsqueda
    // Esto hace que React Query refetchee automáticamente cuando cambies de categoría o busques
    queryKey: ['menuItems', selectedCategory?.id, searchTerm],
    queryFn: ({ pageParam = 1 }) => 
      fetchMenuItemsByCategory(selectedCategory?.id as number, pageParam as number | undefined, 5, searchTerm),
    enabled: !!selectedCategory, // Solo ejecuta el query si hay una categoría seleccionada
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.pageIndex + 1;
      }
      return undefined;
    },
    // ✅ Configura para que las nuevas búsquedas no se unan a las páginas anteriores
    initialPageParam: 1, // Added for React Query v5
  });
  
  // ✅ Obtén una lista plana de todos los productos
  const allMenuItems = data?.pages.flatMap(page => page.registers) ?? [];

  // ✅ Lógica de renderizado condicional para ambos queries
  if (isCategoriesLoading) {
    return <div>Cargando categorías...</div>;
  }

  if (isCategoriesError) {
    return <div>Error al cargar las categorías.</div>;
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Order Menu</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <PiLayout size={24} />
          </button>
        </div>
      </div>

      <CategoryTabs
        categories={categories!.map(c => c.name)}
        selectedCategory={selectedCategory?.name as string}
        onSelectCategory={(categoryName) => {
          const cat = categories!.find(c => c.name === categoryName);
          if (cat) setSelectedCategory(cat);
        }}
      />
      
      {isMenuItemsLoading && !isFetchingNextPage ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
        </div>
      ) : isMenuItemsError ? (
        <div>Error al cargar los productos.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onSelect={() => {}} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {isFetchingNextPage ? 'Cargando más...' : 'Cargar más'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};