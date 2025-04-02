export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>영화 상세 페이지 : {id}</div>;
}
