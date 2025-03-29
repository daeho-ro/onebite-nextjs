
import { MovieData } from '@/types';

export default async function fetchOneMovie(id: number): Promise<MovieData | null> {
  const url = `http://localhost:12346/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch random movies');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
