import { BookData } from '@/types';

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  const urlPrefix = process.env.NEXT_PUBLIC_API_URL;
  let url = `${urlPrefix}/book`;

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
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
