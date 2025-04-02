import SearchBar from '@/components/search-bar';
import MovieItem from '@/components/movie-item';
import style from './search.module.css';
import { useEffect, useState } from 'react';
import { MovieData } from '@/types';
import { useRouter } from 'next/router';
import fetchMovie from '@/lib/fetch-movie';
import Head from 'next/head';

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
    <>
      <Head>
        <title>한입 씨네마 - 검색 결과</title>
        <meta property="og:title" content="한입 씨네마 - 검색 결과" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:description" content="검색 결과를 확인해보세요." />
      </Head>
      <div className={style.searchList}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return <SearchBar>{page}</SearchBar>;
};
