import { useRef } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  action: (query: string) => void;
}

const SearchBar = ({ action }: SearchBarProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = (formData: FormData) => {
    const query = formData.get('query')?.toString().trim();
    if (!query) {
      toast.error('Please enter your search query');
      return;
    }

    action(query);
    formRef.current?.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form
          className={styles.form}
          ref={formRef}
          action={formAction} 
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
