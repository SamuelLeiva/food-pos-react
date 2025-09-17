import { useState, useMemo, useEffect } from "react";
import { MenuItemCard } from "./components/MenuItemCard";
import type { MenuItem } from "../../types/MenuItem";
import { CategoryTabs } from "./components/CategoryTabs";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../services/categoryService";
import type { ICategory } from "./../../types/Category/ICategory";

// --- DATOS DE PRUEBA DE PRODUCTOS ---
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Chha Kdav Sach Mon",
    price: 2.4,
    originalPrice: 2.5,
    category: "Appetizers",
    imageUrl: "https://i.imgur.com/2Y2m4Lu.jpeg",
  },
  {
    id: "2",
    name: "Rice with Basil",
    price: 2.4,
    originalPrice: 2.5,
    category: "Appetizers",
    imageUrl: "https://i.imgur.com/T0f21Ko.jpeg",
  },
  {
    id: "3",
    name: "Garlic Shrimp",
    price: 2.4,
    originalPrice: 2.5,
    category: "Appetizers",
    imageUrl: "https://i.imgur.com/GfnIqAc.jpeg",
  },
  {
    id: "4",
    name: "Spicy Seafood Salad",
    price: 2.4,
    originalPrice: 2.5,
    category: "Appetizers",
    imageUrl: "https://i.imgur.com/kS9Tf7T.jpeg",
  },
  {
    id: "5",
    name: "Pad Thai",
    price: 3.0,
    category: "Soups",
    imageUrl: "https://i.imgur.com/2Y2m4Lu.jpeg",
  },
  {
    id: "6",
    name: "Tom Yum Goong",
    price: 3.5,
    category: "Soups",
    imageUrl: "https://i.imgur.com/GfnIqAc.jpeg",
  },
  {
    id: "7",
    name: "Iced Coffee",
    price: 1.5,
    category: "Beverages",
    imageUrl: "https://i.imgur.com/GfnIqAc.jpeg",
  },
  {
    id: "8",
    name: "Mango Sticky Rice",
    price: 2.8,
    category: "Desserts",
    imageUrl: "https://i.imgur.com/kS9Tf7T.jpeg",
  },
];

export const OrderMenuPanel = () => {
  // Use React Query para llamar y cachear las categorías
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"], // Identificador único para el query
    queryFn: fetchCategories, // La función que hace la llamada
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtramos los items basándonos en la categoría seleccionada
  const filteredItems = useMemo(
    () => mockMenuItems.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  );

  // useEffect para establecer la primera categoría al cargar
  useEffect(() => {
    if (categories && categories.length > 0 && selectedCategory === null) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory]);

  // Si los datos están cargando, muestra un estado de carga
  if (isLoading) {
    return <div>Cargando categorías...</div>;
  }

  // Si hubo un error, muestra un mensaje de error
  if (isError) {
    return <div>Error al cargar las categorías.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Order Menu</h2>
      </div>

      {/* Pestañas de Categoría */}
      <CategoryTabs
        categories={categories.map((c: ICategory) => c.name)} 
        selectedCategory={selectedCategory as string}
        onSelectCategory={setSelectedCategory}
      />

      {/* Grid de Platillos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};
