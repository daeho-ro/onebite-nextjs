'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

export async function createReviewAction(_: unknown, formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };
  }

  try {
    await delay(2000);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ bookId, content, author }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`reviews-${bookId}`);

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
