import SearchBar from '@/components/search-bar';
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <>
      <h3>검색 결과 : {q}</h3>
    </>
  );
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return <SearchBar>{page}</SearchBar>;
};
