'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

export async function createReviewAction(_: unknown, formData: FormData) {
  const movieId = formData.get('movieId') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };
  }

  try {
    await delay(1000);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ movieId, content, author }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`reviews-${movieId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${error}`,
    };
  }
}
