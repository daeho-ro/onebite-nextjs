import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

async function SearchResult({ q }: Readonly<{ q: string }>) {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`, {
    cache: 'force-cache',
  });
  const movies: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

export default async function Search({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    q?: string;
  }>;
}>) {
  const { q } = await searchParams;
  return (
    <div className={style.searchList}>
      <Suspense key={q ?? ''} fallback={<MovieListSkeleton count={3} />}>
        <SearchResult q={q ?? ''} />
      </Suspense>
    </div>
  );
}
