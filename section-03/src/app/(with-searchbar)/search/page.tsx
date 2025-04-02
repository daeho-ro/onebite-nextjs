export default async function Search({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  return <div>Search 페이지 : {q}</div>;
}
