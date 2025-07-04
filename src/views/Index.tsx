
import { useState } from "react";
import { Book, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import CategoryFilter from "@/components/CategoryFilter";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState(0);

  // Sample book data
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 125000,
      category: "fiction",
      image: "/placeholder.svg",
      description: "A classic American novel set in the Jazz Age"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 110000,
      category: "fiction",
      image: "/placeholder.svg",
      description: "A gripping tale of racial injustice and childhood innocence"
    },
    {
      id: 3,
      title: "JavaScript: The Definitive Guide",
      author: "David Flanagan",
      price: 350000,
      category: "technology",
      image: "/placeholder.svg",
      description: "Comprehensive guide to JavaScript programming"
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: 200000,
      category: "history",
      image: "/placeholder.svg",
      description: "A brief history of humankind"
    },
    {
      id: 5,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 175000,
      category: "business",
      image: "/placeholder.svg",
      description: "Timeless lessons on wealth, greed, and happiness"
    },
    {
      id: 6,
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 300000,
      category: "technology",
      image: "/placeholder.svg",
      description: "A handbook of agile software craftsmanship"
    }
  ];

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "fiction", name: "Fiksi" },
    { id: "technology", name: "Teknologi" },
    { id: "business", name: "Bisnis" },
    { id: "history", name: "Sejarah" }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (bookId: number) => {
    setCartItems(prev => prev + 1);
    console.log(`Added book ${bookId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header cartItems={cartItems} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Selamat Datang di <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BookStore</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Temukan koleksi buku terbaik untuk memperkaya pengetahuan dan hiburan Anda
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Books Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={() => addToCart(book.id)}
              />
            ))}
          </div>
          
          {filteredBooks.length === 0 && (
            <div className="text-center py-16">
              <Book className="mx-auto mb-4 text-gray-400" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada buku ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Mengapa Memilih BookStore?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Koleksi Lengkap</h3>
              <p className="text-gray-600">Ribuan buku dari berbagai kategori dan penulis terkenal</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mudah Berbelanja</h3>
              <p className="text-gray-600">Proses pembelian yang simple dengan berbagai metode pembayaran</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Layanan Terbaik</h3>
              <p className="text-gray-600">Customer service responsif dan pengiriman terpercaya</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
