import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Book as BookIcon, Search, ShoppingCart, User } from "lucide-react"; // Ubah nama import Book agar tidak bentrok

import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Skeleton } from "@/components/ui/skeleton";

// Definisikan tipe data buku agar sesuai dengan API
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category_name: string;
  image_url: string;
  description: string;
}

// Fungsi async untuk mengambil data dari backend
const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch("http://localhost:3001/api/books");
  if (!response.ok) {
    throw new Error("Gagal mengambil data dari server");
  }
  return response.json();
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState(0);

  // Gunakan useQuery untuk mengambil dan mengelola data buku
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "Fiksi", name: "Fiksi" },
    { id: "Teknologi", name: "Teknologi" },
    { id: "Bisnis", name: "Bisnis" },
    { id: "Sejarah", name: "Sejarah" },
    { id: "Pengembangan Diri", name: "Pengembangan Diri" },
  ];

  const filteredBooks = books?.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (bookId: number) => {
    setCartItems((prev) => prev + 1);
    console.log(`Added book ${bookId} to cart`);
  };

  // Tampilkan UI Loading saat data sedang diambil
  const renderLoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 space-y-4"
        >
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header cartItems={cartItems} />

      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Selamat Datang di{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TokoBukuKita
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Temukan koleksi buku terbaik untuk memperkaya pengetahuan dan
            hiburan Anda
          </p>
          <div className="max-w-md mx-auto relative mb-8">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari buku atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {isLoading && renderLoadingState()}
          {isError && (
            <div className="text-center text-red-500">
              Gagal memuat data buku.
            </div>
          )}
          {filteredBooks && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToCart={() => addToCart(book.id)}
                />
              ))}
            </div>
          )}
          {filteredBooks?.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <BookIcon className="mx-auto mb-4 text-gray-400" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Tidak ada buku ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian atau kategori
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- BAGIAN YANG HILANG DIMULAI DI SINI --- */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Mengapa Memilih TokoBukuKita?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookIcon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Koleksi Lengkap</h3>
              <p className="text-gray-600">
                Ribuan buku dari berbagai kategori dan penulis terkenal
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mudah Berbelanja</h3>
              <p className="text-gray-600">
                Proses pembelian yang simpel dengan berbagai metode pembayaran
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Layanan Terbaik</h3>
              <p className="text-gray-600">
                Customer service responsif dan pengiriman terpercaya
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* --- AKHIR BAGIAN YANG HILANG --- */}
    </div>
  );
};

export default Index;
