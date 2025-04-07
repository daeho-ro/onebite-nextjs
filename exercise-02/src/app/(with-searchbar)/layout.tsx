import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
      {children}
    </div>
  );
}
