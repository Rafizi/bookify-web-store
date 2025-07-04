
import AdminStats from "./AdminStats";

interface StatsData {
  totalBooks: number;
  totalUsers: number;
  totalOrders: number;
  revenue: number;
}

interface AdminDashboardProps {
  stats: StatsData;
}

const AdminDashboard = ({ stats }: AdminDashboardProps) => {
  return (
    <div className="space-y-8">
      <AdminStats stats={stats} />
      
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
  );
};

export default AdminDashboard;
