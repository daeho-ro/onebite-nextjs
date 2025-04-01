import SearchBar from '@/components/search-bar';
import MovieItem from '@/components/movie-item';
import style from './search.module.css';
import { useEffect, useState } from 'react';
import { MovieData } from '@/types';
import { useRouter } from 'next/router';
import fetchMovie from '@/lib/fetch-movie';

export default function Search() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResults = async () => {
    const data = await fetchMovie(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResults();
    }
  }, [q]);

  return (
    <div className={style.searchList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return <SearchBar>{page}</SearchBar>;
};
