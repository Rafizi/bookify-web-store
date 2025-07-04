
import { Eye, Edit } from "lucide-react";

interface Order {
  id: number;
  user: string;
  books: string;
  total: number;
  status: string;
  date: string;
}

interface AdminOrdersProps {
  orders: Order[];
}

const AdminOrders = ({ orders }: AdminOrdersProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
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
  );
};

export default AdminOrders;
