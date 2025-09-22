export const Navbar = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-30">
      {/* Título o Logo */}
      <h1 className="text-xl font-bold text-gray-800">
        FoodPos
      </h1>
      
      {/* Botones de autenticación */}
      <div className="flex items-center gap-4">
        <button className="text-gray-600 font-medium hover:text-gray-800 transition-colors">
          Log in
        </button>
        <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          Sign up
        </button>
      </div>
    </header>
  );
};