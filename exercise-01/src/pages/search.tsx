import SearchBar from '@/components/search-bar';
import { useRouter } from 'next/router';
import movies from '@/mock/movies.json';
import MovieItem from '@/components/movie-item';
import style from './search.module.css';

export default function Search() {
  const router = useRouter();

  const q = router.query.q as string;
  const searchMovies = movies.filter((movie) => movie.title.includes(q));

  return (
    <div className={style.searchList}>
      {searchMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return <SearchBar>{page}</SearchBar>;
};
