import Link from 'next/link';
import { MovieData } from '@/types';
import style from './movie-item.module.css';

export default function MovieItem({ id, title, posterImgUrl }: MovieData, col: number) {
  return (
    <div>
      <Link href={`/movie/${id}`}>
        <img className={style.img} src={posterImgUrl} alt={title} />
      </Link>
    </div>
  );
}
