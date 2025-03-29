import { MovieData } from '@/types';

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = 'http://localhost:12346/movie/random';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch random movies');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
