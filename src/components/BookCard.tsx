import React from 'react';
import { BookOpen, User } from 'lucide-react';
import { StarRating } from './StarRating';
import { BookType } from '../types/book';

interface BookCardProps {
  book: BookType;
  onClick: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const { volumeInfo } = book;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="aspect-[2/3] relative">
        <img
          src={volumeInfo.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300'}
          alt={volumeInfo.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{volumeInfo.title}</h3>
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
          <User size={16} />
          <span className="line-clamp-1">{volumeInfo.authors?.[0] || 'Unknown Author'}</span>
        </div>
        {volumeInfo.averageRating && (
          <div className="flex items-center gap-2">
            <StarRating rating={volumeInfo.averageRating} size={16} />
            <span className="text-sm text-gray-600">({volumeInfo.averageRating})</span>
          </div>
        )}
      </div>
    </div>
  );
}