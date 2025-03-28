import { useRouter } from 'next/router';
import movies from '@/mock/movies.json';
import style from '@/pages/movie/[id].module.css';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const movie = movies.find((movie) => movie.id === Number(id));

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
