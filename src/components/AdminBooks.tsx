
import { Eye, Edit, Trash2 } from "lucide-react";
import AddBookDialog from "./AddBookDialog";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
}

interface AdminBooksProps {
  books: Book[];
  onAddBook: (book: any) => void;
  onEditBook: (book: Book) => void;
}

const AdminBooks = ({ books, onAddBook, onEditBook }: AdminBooksProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Kelola Buku</h3>
        <AddBookDialog onBookAdded={onAddBook} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Judul</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Penulis</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Kategori</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Harga</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Stok</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{book.title}</td>
                <td className="py-3 px-4">{book.author}</td>
                <td className="py-3 px-4">{book.category}</td>
                <td className="py-3 px-4">{formatPrice(book.price)}</td>
                <td className="py-3 px-4">{book.stock}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => onEditBook(book)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooks;
