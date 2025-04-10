import { BookData } from '@/types';
import style from './page.module.css';

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  const books = await response.json();
  return books.map((book: BookData) => ({
    id: book.id.toString(),
  }));
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{
    id: string | string[];
  }>;
}>) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);
  const { title, subTitle, description, author, publisher, coverImgUrl } = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
