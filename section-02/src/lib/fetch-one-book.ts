import { BookData } from '@/types';

export default async function fetchOneBook(id: number): Promise<BookData | null> {
  const urlPrefix = process.env.NEXT_PUBLIC_API_URL;
  const url = `${urlPrefix}/book/${id}`;

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
    return null;
  }
}
