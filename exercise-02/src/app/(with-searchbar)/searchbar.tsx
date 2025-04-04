'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const q = useSearchParams().get('q');
  const [search, setSearch] = useState(q ?? '');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요 ..."
      />
      <button onClick={onSearch}>검색</button>
    </div>
  );
}
