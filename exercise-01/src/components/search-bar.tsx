import style from './search-bar.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SearchBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <>
      <div className={style.searchbar_container}>
        <input
          type="text"
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </>
  );
}
