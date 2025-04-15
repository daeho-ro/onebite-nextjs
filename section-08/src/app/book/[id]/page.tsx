import { BookData, ReviewData } from '@/types';
import style from './page.module.css';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  const books = await response.json();
  return books.map((book: BookData) => ({
    id: book.id.toString(),
  }));
}

async function BookDetail({ bookId }: Readonly<{ bookId: string }>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);

  if (!response.ok) {
    throw new Error(`Book fetch failed: ${response.statusText}`);
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } = await response.json();

  return (
    <section>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: Readonly<{ bookId: string }>) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, {
    next: { tags: [`reviews-${bookId}`] },
  });

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

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
