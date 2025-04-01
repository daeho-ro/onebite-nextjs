import style from '@/pages/movie/[id].module.css';
import fetchOneMovie from '@/lib/fetch-one-movie';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchMovie from '@/lib/fetch-movie';

export const getStaticPaths = async () => {
  const movies = await fetchMovie();
  return {
    paths: movies.map((movie) => ({ params: { id: movie.id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;
  const movie = await fetchOneMovie(Number(id));
  return { props: { movie } };
};

export default function Movie({ movie }: Readonly<InferGetStaticPropsType<typeof getStaticProps>>) {
  if (!movie) {
    return <div>존재하지 않는 영화입니다.</div>;
  }

  const { title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } = movie;

  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url(${posterImgUrl})` }}>
        <img src={posterImgUrl} />
      </div>

      <div className={style.info}>
        <div>
          <div className={style.title}>{title}</div>
          <div>
            {releaseDate} / {genres.join(', ')} / {runtime}분
          </div>

          <div>{company}</div>
        </div>

        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
