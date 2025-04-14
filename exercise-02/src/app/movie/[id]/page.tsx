import style from './page.module.css';
import { MovieData, ReviewData } from '@/types';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`);
  const movies = await response.json();
  return movies.map((movie: MovieData) => ({
    id: movie.id.toString(),
  }));
}

async function MovieDetail({ movieId }: Readonly<{ movieId: string }>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`, {
    cache: 'force-cache',
  });
  const movie: MovieData = await response.json();
  const { title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } = movie;

  if (!response.ok) {
    return <div>영화를 불러오는데 실패했습니다.</div>;
  }

  return (
    <section>
      <div className={style.cover_img_container} style={{ backgroundImage: `url(${posterImgUrl})` }}>
        <img src={posterImgUrl} alt={title} />
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
    </section>
  );
}

async function ReviewList({ movieId }: Readonly<{ movieId: string }>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`);

  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review: ReviewData) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Movie({
  params,
}: Readonly<{
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
