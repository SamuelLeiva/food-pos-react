const API_BASE_URL =
  "https://api20250917102933-bch7ehdme6d5geft.canadacentral-01.azurewebsites.net/api/categories";

export const fetchCategories = async () => {
  const response = await fetch(API_BASE_URL);
  // deestructuramos data del response porque data es una propiedad del objeto que devuelve la API
  const { data } = await response.json();
  return data;
};
