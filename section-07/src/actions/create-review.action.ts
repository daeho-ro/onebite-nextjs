'use server';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ bookId, content, author }),
    });
    console.log(response.status);
  } catch (error) {
    console.error(error);
    return;
  }
}
