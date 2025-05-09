'use client';

import { deleteReviewAction } from '@/actions/delete-review.action';
import { useEffect, useActionState, useRef } from 'react';
import style from './review-item-delete-button.module.css';

export default function ReviewItemDeleteButton({ reviewId, bookId }: Readonly<{ reviewId: number; bookId: number }>) {
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
      <input name="bookId" value={bookId} hidden readOnly />
      <button className={style.button} onClick={() => formRef.current?.requestSubmit()} disabled={isPending}>
        {isPending ? '...' : '삭제하기'}
      </button>
    </form>
  );
}
