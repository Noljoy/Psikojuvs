'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'banned';
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: "ahmetyilmaz",
      email: "ahmet@example.com",
      role: "user",
      joinDate: "2024-02-15",
      status: "active"
    },
    {
      id: 2,
      username: "moderator1",
      email: "mod1@example.com",
      role: "moderator",
      joinDate: "2024-02-10",
      status: "active"
    }
  ]);

  return (
    <div className="relative z-0">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-accent-gold">Kullanıcı Yönetimi</h1>
          <button className="animated-button">
            Yeni Kullanıcı Ekle
          </button>
        </div>

        <div className="glass-card p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-purple/20">
                <th className="text-left p-3 text-accent-gold">Kullanıcı Adı</th>
                <th className="text-left p-3 text-accent-gold">E-posta</th>
                <th className="text-left p-3 text-accent-gold">Rol</th>
                <th className="text-left p-3 text-accent-gold">Katılım Tarihi</th>
                <th className="text-left p-3 text-accent-gold">Durum</th>
                <th className="text-left p-3 text-accent-gold">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-light-purple/10">
                  <td className="p-3 text-light-purple">{user.username}</td>
                  <td className="p-3 text-light-purple">{user.email}</td>
                  <td className="p-3 text-light-purple">{user.role}</td>
                  <td className="p-3 text-light-purple">{user.joinDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      user.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="p-2 text-accent-gold hover:bg-accent-gold/10 rounded">
                        Düzenle
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 