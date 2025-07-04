
import { Eye, Edit } from "lucide-react";
import AddUserDialog from "./AddUserDialog";

interface User {
  id: number;
  name: string;
  email: string;
  registeredAt: string;
  status: string;
}

interface AdminUsersProps {
  users: User[];
  onAddUser: (user: any) => void;
  onEditUser: (user: User) => void;
}

const AdminUsers = ({ users, onAddUser, onEditUser }: AdminUsersProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Daftar Pengguna</h3>
        <AddUserDialog onUserAdded={onAddUser} />
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
                      onClick={() => onEditUser(user)}
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
  );
};

export default AdminUsers;
