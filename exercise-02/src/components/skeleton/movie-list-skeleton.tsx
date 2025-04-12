import MovieItemSkeleton from './movie-item-skeleton';

export default function MovieListSkeleton({ count }: Readonly<{ count: number }>) {
  return (
    <>
      {new Array(count).fill(0).map((_, index) => (
        <MovieItemSkeleton key={`movie-item-skeleton-${index}`} />
      ))}
    </>
  );
}
