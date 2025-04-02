import { MovieData } from '@/types';

export default async function fetchMovie(q?: string): Promise<MovieData[]> {
  const urlPrefix = process.env.NEXT_PUBLIC_API_URL;
  let url = `${urlPrefix}/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'yes',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
