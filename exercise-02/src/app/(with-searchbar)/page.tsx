import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import { MovieData } from '@/types';
import { Suspense } from 'react';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';
import { delay } from '@/util/delay';

async function RecommendMovies() {
  await delay(2000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`, {
    next: { revalidate: 3 },
  });
  const recommendMovies: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      {recommendMovies.map((movie) => (
        <MovieItem key={`recommend-${movie.id}`} {...movie} />
      ))}
    </>
  );
}

async function AllMovies() {
  await delay(1000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
    cache: 'force-cache',
  });
  const allMovies: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommendList}>
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <RecommendMovies />
          </Suspense>
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.movieList}>
          <Suspense fallback={<MovieListSkeleton count={10} />}>
            <AllMovies />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
