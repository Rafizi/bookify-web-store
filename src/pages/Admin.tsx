
import { useState } from "react";
import Header from "@/components/Header";
import AdminNavigation from "@/components/AdminNavigation";
import AdminDashboard from "@/components/AdminDashboard";
import AdminBooks from "@/components/AdminBooks";
import AdminUsers from "@/components/AdminUsers";
import AdminOrders from "@/components/AdminOrders";
import EditUserDialog from "@/components/EditUserDialog";
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard stats={stats} />;
      case "books":
        return <AdminBooks books={books} onAddBook={handleAddBook} onEditBook={handleEditBook} />;
      case "users":
        return <AdminUsers users={users} onAddUser={handleAddUser} onEditUser={handleEditUser} />;
      case "orders":
        return <AdminOrders orders={orders} />;
      default:
        return <AdminDashboard stats={stats} />;
    }
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

        <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {renderActiveTab()}

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
