import SearchBar from '@/components/search-bar';

export default function Home() {
  return (
    <>
      <h3>Home</h3>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SearchBar>{page}</SearchBar>;
};
