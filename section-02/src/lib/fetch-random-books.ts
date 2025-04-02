import { BookData } from '@/types';

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const urlPrefix = process.env.NEXT_PUBLIC_API_URL;
  const url = `${urlPrefix}/book/random`;

  try {
    const response = await fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'yes',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch random books');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
