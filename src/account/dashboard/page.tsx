// src/app/account/dashboard/page.tsx
import { Calendar, MapPin, DollarSign, Star } from 'lucide-react';
import Card from '@/components/ui/card';

export default function DashboardPage() {
  const upcomingTrips = [
    { id: 1, name: 'Arctic Exploration', date: 'Jun 15-29, 2024', status: 'Confirmed' },
    { id: 2, name: 'Amazon Rainforest', date: 'Aug 10-20, 2024', status: 'Pending' },
  ];

  const recentActivity = [
    { id: 1, action: 'Booked Arctic Expedition', date: '2 days ago' },
    { id: 2, action: 'Updated profile information', date: '1 week ago' },
    { id: 3, action: 'Completed safety waiver', date: '2 weeks ago' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your expedition overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Upcoming Trips</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
            <Calendar className="h-10 w-10 text-primary/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-3xl font-bold mt-2">$8,498</p>
            </div>
            <DollarSign className="h-10 w-10 text-green-500/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Loyalty Points</p>
              <p className="text-3xl font-bold mt-2">1,250</p>
            </div>
            <Star className="h-10 w-10 text-amber-500/20" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Trips */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Trips</h2>
          <div className="space-y-4">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{trip.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{trip.date}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  trip.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {trip.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors">
            View All Trips
          </button>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            View All Activity
          </button>
        </Card>
      </div>
    </div>
  );
}