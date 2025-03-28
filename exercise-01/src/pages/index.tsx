import SearchBar from '@/components/search-bar';
import MovieItem from '@/components/movie-item';
import movies from '@/mock/movies.json';
import style from './index.module.css';

export default function Home() {
  const recommendMovies = movies.toSorted((a, b) => a.runtime - b.runtime).slice(0, 3);

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
          {movies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SearchBar>{page}</SearchBar>;
};
