import SearchBar from '@/components/search-bar';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import fetchRandomMovies from '@/lib/fetch-random-movie';
import fetchMovie from '@/lib/fetch-movie';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [recoMovies, allMovies] = await Promise.all([fetchRandomMovies(), fetchMovie()]);

  return {
    props: { recoMovies, allMovies },
    revalidate: 10,
  };
};

export default function Home({ recoMovies, allMovies }: Readonly<InferGetStaticPropsType<typeof getStaticProps>>) {
  const recommendMovies = recoMovies.toSorted((a, b) => a.runtime - b.runtime).slice(0, 3);

  return (
    <>
      <Head>
        <title>한입 씨네마</title>
        <meta property="og:title" content="한입 씨네마" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:description" content="한입 씨네마에 방문하신 것을 환영합니다." />
      </Head>
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
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SearchBar>{page}</SearchBar>;
};
