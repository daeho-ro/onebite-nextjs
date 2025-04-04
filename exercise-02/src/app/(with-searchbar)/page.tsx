import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import movies from '@/dummy.json';

export default function Home() {
  const recommendMovies = movies.toSorted(() => Math.random() - 0.5).slice(0, 3);
  const allMovies = movies;

  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommendList}>
          {recommendMovies.map((movie) => (
            <MovieItem key={`recommend-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.movieList}>
          {allMovies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
