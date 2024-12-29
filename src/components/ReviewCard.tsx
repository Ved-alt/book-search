import React from 'react';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  author: string;
  date: string;
  rating: number;
  content: string;
  avatar: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  date,
  rating,
  content,
  avatar,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-4">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{author}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <StarRating rating={rating} />
      <p className="mt-4 text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};