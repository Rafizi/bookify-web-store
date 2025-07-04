import { useState } from "react";
import {
  Book,
  Users,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Impor hook auth
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Definisikan tipe data buku
interface Book {
  id: number;
  title: string;
  author: string;
  category_name: string;
  price: number;
  stock: number;
}

// Fungsi untuk mengambil data buku dari API
const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch("http://localhost:3001/api/books");
  if (!response.ok) {
    throw new Error("Gagal mengambil data buku");
  }
  return response.json();
};

const queryClient = useQueryClient();
const { token } = useAuth(); // Ambil token untuk otorisasi

// Fungsi untuk menghapus buku
const deleteBookMutation = useMutation({
  mutationFn: (bookId: number) => {
    return fetch(`http://localhost:3001/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        // Sertakan token di header Authorization
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // Setelah berhasil, segarkan kembali data buku
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["books"] });
    // Anda bisa menambahkan notifikasi toast di sini
  },
  onError: (error) => {
    // Handle error, misalnya tampilkan notifikasi
    console.error("Gagal menghapus buku:", error);
  },
});

const handleDelete = (bookId: number) => {
  if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
    deleteBookMutation.mutate(bookId);
  }
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState("books"); // Langsung ke tab buku
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header bisa Anda tambahkan kembali jika perlu, atau buat header khusus admin */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">Kelola toko buku Anda dengan mudah</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-8">
          <nav className="flex space-x-4 p-4 overflow-x-auto">
            {/* Navigasi Tab */}
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "dashboard" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "books"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {" "}
              <Book size={20} /> <span>Kelola Buku</span>
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "users" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {" "}
              <Users size={20} /> <span>Pengguna</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "orders" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {" "}
              <ShoppingBag size={20} /> <span>Pesanan</span>
            </button>
          </nav>
        </div>

        {activeTab === "books" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Daftar Buku</h3>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus size={20} />
                <span>Tambah Buku</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Judul
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Penulis
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Harga
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Stok
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    // Tampilan Loading Skeleton
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <Skeleton className="h-4 w-48" />
                        </td>
                        <td className="py-3 px-4">
                          <Skeleton className="h-4 w-32" />
                        </td>
                        <td className="py-3 px-4">
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="py-3 px-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="py-3 px-4">
                          <Skeleton className="h-4 w-12" />
                        </td>
                        <td className="py-3 px-4 flex space-x-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </td>
                      </tr>
                    ))}
                  {isError && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-red-500">
                        Gagal memuat data.
                      </td>
                    </tr>
                  )}
                  {books &&
                    books.map((book) => (
                      <tr
                        key={book.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium">{book.title}</td>
                        <td className="py-3 px-4">{book.author}</td>
                        <td className="py-3 px-4">{book.category_name}</td>
                        <td className="py-3 px-4">{formatPrice(book.price)}</td>
                        <td className="py-3 px-4">{book.stock}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-green-600 hover:bg-green-100 rounded">
                              {" "}
                              <Edit size={16} />{" "}
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded"
                            >
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
        )}
        {/* Tampilan untuk tab lain bisa ditambahkan di sini */}
      </div>
    </div>
  );
};

export default Admin;
