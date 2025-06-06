import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import toast from 'react-hot-toast';

export default function App() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    // Можно сделать запрос, передать в API и т.д.
    console.log('Search query:', searchQuery);
    setQuery(searchQuery);
    toast.success(`Поиск по запросу: ${searchQuery}`);
  };

  return (
    <div>
      <SearchBar action={handleSearch} />
      {/* Вы можете отобразить результаты поиска ниже */}
      <p>Результаты для: {query}</p>
    </div>
  );
}
