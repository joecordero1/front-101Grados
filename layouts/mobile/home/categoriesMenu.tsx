import { useRouter } from 'next/router';
import { useCategories } from 'hooks';

function CategoriesMenu() {
  const { categories } = useCategories({
    take: 10,
    random: true,
  });
  const router = useRouter();

  const handleRedirect = (categoryId) => {
    router.push({
      pathname: '/shop',
      query: { category: categoryId, random: true },
    });
  };

  return (
    <nav className='w-full overflow-x-auto'>
      <ul className='flex space-x-4 px-4 py-4  rounded-lg shadow-md whitespace-nowrap'>
        {/* Botón para todas las categorías */}
        <li>
          <button
            onClick={() => router.push('/shop?random=true')}
            className='px-4 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition'
          >
            Todas
          </button>
        </li>

        {/* Categorías dinámicas */}
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => handleRedirect(category.id)}
              className='px-4 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition'
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoriesMenu;
