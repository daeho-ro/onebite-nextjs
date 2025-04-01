import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BookData } from '@/types';

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResults = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };
  useEffect(() => {
    if (q) {
      fetchSearchResults();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
