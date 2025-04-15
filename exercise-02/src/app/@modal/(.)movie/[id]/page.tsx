import MoviePage from '@/app/movie/[id]/page';
import Modal from '@/components/modal';

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Modal>
      <MoviePage {...props} />
    </Modal>
  );
}
