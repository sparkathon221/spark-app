import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard,
  Package,
  Heart,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';

interface ProfilePageProps {
  isDarkMode: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isDarkMode }) => {
  const stats = [
    { label: 'Orders', value: '47', icon: Package, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Wishlist', value: '23', icon: Heart, color: 'text-red-600 dark:text-red-400' },
    { label: 'Reviews', value: '89', icon: Star, color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Points', value: '2,450', icon: Award, color: 'text-purple-600 dark:text-purple-400' }
  ];

  const recentOrders = [
    {
      id: '1',
      product: 'Wireless Headphones',
      date: '2024-01-15',
      status: 'Delivered',
      amount: '$149.99',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      product: 'Smart Watch',
      date: '2024-01-10',
      status: 'Shipped',
      amount: '$299.99',
      image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      product: 'Coffee Maker',
      date: '2024-01-05',
      status: 'Processing',
      amount: '$89.99',
      image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Updated Profile Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-md p-6 relative text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
              />
              <span className="absolute bottom-0 right-0 block w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">user#404</h1>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>user404@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+91 9999999999</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>wb, India </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h2>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{order.product}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{order.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Account Settings</h2>
          
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100">General Settings</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100">Notifications</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100">Privacy & Security</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100">Payment Methods</span>
            </button>
          </div>         
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
