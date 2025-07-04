
import { Book, Users, ShoppingBag } from "lucide-react";

interface StatsData {
  totalBooks: number;
  totalUsers: number;
  totalOrders: number;
  revenue: number;
}

interface AdminStatsProps {
  stats: StatsData;
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
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
  );
};

export default AdminStats;
