'use client';

import style from './review-item-delete-button.module.css';
import { deleteReviewAction } from '@/actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({ reviewId, movieId }: Readonly<{ reviewId: number; movieId: number }>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="movieId" value={movieId} hidden readOnly />
      <button className={style.button} onClick={() => formRef.current?.requestSubmit()} disabled={isPending}>
        {isPending ? '🗑️ 리뷰 삭제중...' : '🗑️ 리뷰 삭제하기'}
      </button>
    </form>
  );
}
