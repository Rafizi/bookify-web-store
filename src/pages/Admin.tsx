import { useState } from "react";
import { Book, Users, ShoppingBag, Plus, Edit, Trash2, Eye } from "lucide-react";
import Header from "@/components/Header";
import AddUserDialog from "@/components/AddUserDialog";
import EditUserDialog from "@/components/EditUserDialog";
import AddBookDialog from "@/components/AddBookDialog";
import EditBookDialog from "@/components/EditBookDialog";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingUser, setEditingUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editBookDialogOpen, setEditBookDialogOpen] = useState(false);
  
  // Sample data
  const stats = {
    totalBooks: 1234,
    totalUsers: 567,
    totalOrders: 89,
    revenue: 15750000
  };

  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", price: 125000, stock: 25 },
    { id: 2, title: "JavaScript Guide", author: "David Flanagan", category: "Technology", price: 350000, stock: 12 },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", category: "History", price: 200000, stock: 8 }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", registeredAt: "2024-01-15", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", registeredAt: "2024-01-20", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", registeredAt: "2024-01-25", status: "Inactive" }
  ]);

  const orders = [
    { id: 1, user: "John Doe", books: "The Great Gatsby, Sapiens", total: 325000, status: "Pending", date: "2024-01-30" },
    { id: 2, user: "Jane Smith", books: "JavaScript Guide", total: 350000, status: "Delivered", date: "2024-01-28" },
    { id: 3, user: "Bob Johnson", books: "Sapiens", total: 200000, status: "Processing", date: "2024-01-29" }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser]);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setEditDialogOpen(true);
  };

  const handleUpdateUser = (updatedUser: any) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleAddBook = (newBook: any) => {
    setBooks([...books, newBook]);
  };

  const handleEditBook = (book: any) => {
    setEditingBook(book);
    setEditBookDialogOpen(true);
  };

  const handleUpdateBook = (updatedBook: any) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header cartItems={0} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola toko buku Anda dengan mudah</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <nav className="flex space-x-8 p-4">
            {[
              { id: "dashboard", name: "Dashboard", icon: Book },
              { id: "books", name: "Kelola Buku", icon: Book },
              { id: "users", name: "Pengguna", icon: Users },
              { id: "orders", name: "Pesanan", icon: ShoppingBag }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Buku</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalBooks}</p>
                  </div>
                  <Book className="text-blue-500" size={32} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Pengguna</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                  </div>
                  <Users className="text-green-500" size={32} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Pesanan</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                  </div>
                  <ShoppingBag className="text-purple-500" size={32} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pendapatan</p>
                    <p className="text-2xl font-bold text-gray-800">{formatPrice(stats.revenue)}</p>
                  </div>
                  <div className="text-yellow-500 text-2xl">💰</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Pesanan #12345 telah dikirim</span>
                  <span className="text-gray-500 text-sm ml-auto">2 jam lalu</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Pengguna baru mendaftar: jane@example.com</span>
                  <span className="text-gray-500 text-sm ml-auto">5 jam lalu</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Stok buku "JavaScript Guide" hampir habis</span>
                  <span className="text-gray-500 text-sm ml-auto">1 hari lalu</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Books Tab */}
        {activeTab === "books" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Kelola Buku</h3>
              <AddBookDialog onBookAdded={handleAddBook} />
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
                            onClick={() => handleEditBook(book)}
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
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Daftar Pengguna</h3>
              <AddUserDialog onUserAdded={handleAddUser} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal Daftar</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.registeredAt}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded"
                          >
                            <Edit size={16} />
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

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Daftar Pesanan</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ID Pesanan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Pengguna</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Buku</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">#{order.id.toString().padStart(5, '0')}</td>
                      <td className="py-3 px-4">{order.user}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{order.books}</td>
                      <td className="py-3 px-4">{formatPrice(order.total)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded">
                            <Edit size={16} />
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

        <EditUserDialog
          user={editingUser}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onUserUpdated={handleUpdateUser}
        />

        <EditBookDialog
          book={editingBook}
          open={editBookDialogOpen}
          onOpenChange={setEditBookDialogOpen}
          onBookUpdated={handleUpdateBook}
        />
      </div>
    </div>
  );
};

export default Admin;
