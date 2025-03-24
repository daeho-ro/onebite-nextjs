import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h3>{id} 영화 상세페이지</h3>
    </>
  );
}
