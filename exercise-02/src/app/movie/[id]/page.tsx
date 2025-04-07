import style from './page.module.css';
import { MovieData } from '@/types';

export default async function Movie({
  params,
}: Readonly<{
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`, {
    cache: 'force-cache',
  });
  const movie: MovieData = await response.json();
  const { title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } = movie;

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

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
