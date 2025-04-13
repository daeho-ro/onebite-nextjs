import style from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';

export default function ReviewEditor({ bookId }: Readonly<{ bookId: string }>) {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea name="content" placeholder="리뷰 내용" required />
        <div className={style.submit_container}>
          <input name="author" placeholder="작성자" required />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
