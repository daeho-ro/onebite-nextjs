import { MovieData } from '@/types';

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const urlPrefix = process.env.NEXT_PUBLIC_API_URL;
  const url = `${urlPrefix}/movie/random`;

  try {
    const response = await fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'yes',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch random movies');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
