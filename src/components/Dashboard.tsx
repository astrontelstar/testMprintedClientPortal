import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orders } from '../data';
import { Order } from '../types';
import { Package, LogOut, Mail, ExternalLink } from 'lucide-react';

const getImageUrl = (item: string): string => {
  if (item.toLowerCase().includes('polo shirt')) {
    return 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80';
  } else if (item.toLowerCase().includes('rubik')) {
    return 'https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?w=400&q=80';
  } else if (item.toLowerCase().includes('table throw')) {
    return 'https://images.unsplash.com/photo-1414115880398-afebc3d95efc?w=400&q=80';
  } else if (item.toLowerCase().includes('banner')) {
    return 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&q=80';
  }
  return 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=400&q=80';
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAskQuestion = (order: Order) => {
    const subject = encodeURIComponent(`Question about order ${order.JobNumber}`);
    const body = encodeURIComponent(`Hi,\n\nI have a question about order ${order.JobNumber}:\n\n`);
    window.location.href = `mailto:stephen@mprinted.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Package className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Promo Products Portal</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {user}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <div key={`${order.JobNumber}-${order.PO}-${index}`} className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="relative pb-2/3">
                  <img 
                    src={getImageUrl(order.Item)} 
                    alt={order.Item} 
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{order.Item}</h3>
                  <p className="text-sm text-gray-600 mb-2">Job Number: {order.JobNumber}</p>
                  <p className="text-sm text-gray-600 mb-2">Order Date: {order["Order Date"]}</p>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Payment: ${order["Client Payment"].toFixed(2)}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAskQuestion(order)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setSelectedOrder(null)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Order Details</h3>
              <img 
                src={getImageUrl(selectedOrder.Item)} 
                alt={selectedOrder.Item} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="mt-2 text-sm text-gray-500">
                <p><strong>Job Number:</strong> {selectedOrder.JobNumber}</p>
                <p><strong>Order Date:</strong> {selectedOrder["Order Date"]}</p>
                <p><strong>Item:</strong> {selectedOrder.Item}</p>
                <p><strong>Payment:</strong> ${selectedOrder["Client Payment"].toFixed(2)}</p>
                <p><strong>Scheduled to Ship:</strong> {selectedOrder["Scheduled to Ship"]}</p>
                {selectedOrder["Expected to Arrive"] && (
                  <p><strong>Expected to Arrive:</strong> {selectedOrder["Expected to Arrive"]}</p>
                )}
                <p><strong>Status:</strong> {selectedOrder["Order Acknowledged"]}</p>
              </div>
              <div className="mt-5 flex justify-between">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
                <button
                  onClick={() => handleAskQuestion(selectedOrder)}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Ask Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;