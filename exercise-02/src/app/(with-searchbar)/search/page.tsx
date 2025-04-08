import MovieItem from '@/components/movie-item';
import style from './page.module.css';
import { MovieData } from '@/types';

export default async function Search({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    q?: string;
  }>;
}>) {
  const { q } = await searchParams;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`, {
    cache: 'force-cache',
  });
  const movies: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className={style.searchList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
