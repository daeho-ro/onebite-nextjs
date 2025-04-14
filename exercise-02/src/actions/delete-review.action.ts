'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

export async function deleteReviewAction(_: unknown, formData: Readonly<FormData>) {
  const reviewId = formData.get('reviewId') as string;
  const movieId = formData.get('movieId') as string;

  if (!reviewId || !movieId) {
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다.',
    };
  }

  try {
    await delay(1000);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`, {
      method: 'DELETE',
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
      error: `리뷰 삭제에 실패했습니다 : ${error}`,
    };
  }
}
