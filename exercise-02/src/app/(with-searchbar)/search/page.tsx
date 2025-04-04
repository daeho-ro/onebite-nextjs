import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import movies from '@/dummy.json';

export default function Search() {
  return (
    <div className={style.searchList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
