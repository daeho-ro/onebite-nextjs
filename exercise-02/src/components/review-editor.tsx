'use client';

import style from './review-editor.module.css';
import { useEffect, useActionState } from 'react';
import { createReviewAction } from '@/actions/create-review.action';

export default function ReviewEditor({ movieId }: Readonly<{ movieId: string }>) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea name="content" placeholder="리뷰 내용" required disabled={isPending} />
        <div className={style.submit_container}>
          <input name="author" placeholder="작성자" required disabled={isPending} />
          <button type="submit" disabled={isPending}>
            {isPending ? '작성중...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
