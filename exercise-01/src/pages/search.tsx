import SearchBar from '@/components/search-bar';
import MovieItem from '@/components/movie-item';
import style from './search.module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchMovie from '@/lib/fetch-movie';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q as string;
  const movies = await fetchMovie(q);
  return { props: { movies } };
};

export default function Search({ movies }: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
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
