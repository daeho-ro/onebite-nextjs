import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    },
  };
};

export default function Page({ books }: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
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
