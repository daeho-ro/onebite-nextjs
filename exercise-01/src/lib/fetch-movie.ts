import { MovieData } from '@/types';

export default async function fetchMovie(q?: string): Promise<MovieData[]> {
  let url = 'http://localhost:12346/movie';

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
