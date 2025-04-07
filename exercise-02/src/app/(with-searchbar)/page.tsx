import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import { MovieData } from '@/types';

async function RecommendMovies() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`, {
    next: { revalidate: 3 },
  });
  const recommendMovies: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className={style.recommendList}>
      {recommendMovies.map((movie) => (
        <MovieItem key={`recommend-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function AllMovies() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
    cache: 'force-cache',
  });
  const allMovies: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className={style.movieList}>
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecommendMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
