
import { Book, Users, ShoppingBag } from "lucide-react";

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminNavigation = ({ activeTab, onTabChange }: AdminNavigationProps) => {
  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: Book },
    { id: "books", name: "Kelola Buku", icon: Book },
    { id: "users", name: "Pengguna", icon: Users },
    { id: "orders", name: "Pesanan", icon: ShoppingBag }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8">
      <nav className="flex space-x-8 p-4">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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
  );
};

export default AdminNavigation;
