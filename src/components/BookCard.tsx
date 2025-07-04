// src/components/BookCard.tsx

import { ShoppingCart, Star } from "lucide-react";

// Sesuaikan interface dengan tipe data dari API
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category_name: string; // Diubah dari 'category'
  image_url: string; // Diubah dari 'image'
  description: string;
}

interface BookCardProps {
  book: Book;
  onAddToCart: () => void;
}

const BookCard = ({ book, onAddToCart }: BookCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        {/* Gunakan image_url */}
        <img
          src={book.image_url}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="mb-2">
          {/* Gunakan category_name */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium capitalize">
            {book.category_name}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {book.title}
        </h3>

        <p className="text-gray-600 mb-2">oleh {book.author}</p>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {book.description}
        </p>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.0)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(book.price)}
          </div>

          <button
            onClick={onAddToCart}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            <ShoppingCart size={18} />
            <span>Tambah</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
