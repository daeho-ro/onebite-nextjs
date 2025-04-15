import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
