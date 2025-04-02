export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Book/[id] 페이지 : {id}</div>;
}
