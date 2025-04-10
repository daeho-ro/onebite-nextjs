import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    q?: string;
  }>;
}>) {
  const { q } = await searchParams;
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {
    cache: 'force-cache',
  });
  const books: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
