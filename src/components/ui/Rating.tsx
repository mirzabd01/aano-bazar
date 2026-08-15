import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

export default function Rating({ value, reviewCount, size = 'sm' }: RatingProps) {
  const starSize = size === 'sm' ? 14 : 18;
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;

  return (
    <div className="rating">
      <div className="rating-stars">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < fullStars;
          const isHalfStar = i === fullStars && hasHalf;
          return (
            <Star
              key={i}
              size={starSize}
              className={isFull || isHalfStar ? 'star-filled' : 'star-empty'}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="rating-count">
          {value.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}
