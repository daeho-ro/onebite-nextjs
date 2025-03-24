import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <>
      <h3>검색 결과 : {q}</h3>
    </>
  );
}
