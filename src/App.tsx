import React, { useState } from 'react';
import { BookOpen, Clock, User } from 'lucide-react';
import { StarRating } from './components/StarRating';
import { ReviewCard } from './components/ReviewCard';
import { SearchBar } from './components/SearchBar';
import { BookCard } from './components/BookCard';
import { BookType } from './types/book';

function App() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=12`
      );
      const data = await response.json();
      setBooks(data.items || []);
      setSelectedBook(null);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Book Search 📙
          </h1>
          <p className="text-lg opacity-90 text-center mb-8">
            Discover your next favorite book
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {books.length > 0 && !selectedBook ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        ) : selectedBook ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Book Cover and Info */}
            <div className="md:col-span-1">
              <img
                src={
                  selectedBook.volumeInfo.imageLinks?.thumbnail ||
                  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300'
                }
                alt={selectedBook.volumeInfo.title}
                className="w-full rounded-lg shadow-lg mb-6"
              />
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  {selectedBook.volumeInfo.averageRating && (
                    <>
                      <StarRating
                        rating={selectedBook.volumeInfo.averageRating}
                      />
                      <span className="text-gray-600">
                        ({selectedBook.volumeInfo.averageRating}/5)
                      </span>
                    </>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={20} />
                    <span>
                      {selectedBook.volumeInfo.authors?.[0] || 'Unknown Author'}
                    </span>
                  </div>
                  {selectedBook.volumeInfo.pageCount && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen size={20} />
                      <span>{selectedBook.volumeInfo.pageCount} pages</span>
                    </div>
                  )}
                  {selectedBook.volumeInfo.publishedDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={20} />
                      <span>
                        Published {selectedBook.volumeInfo.publishedDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Search Results
              </button>
            </div>

            {/* Book Details */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedBook.volumeInfo.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedBook.volumeInfo.description ||
                    'No description available.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-12">
            Search for books to get started
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
