'use server';

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get('movieId') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  if (!movieId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ movieId, content, author }),
    });
    console.log(response.status);
  } catch (error) {
    console.error(error);
    return;
  }
}
