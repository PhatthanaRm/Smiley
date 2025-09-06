"use client"

import React from 'react'
import { useAdmin } from '@/components/admin-provider'
import { Card } from '@/components/ui/card'
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Activity,
  UserCheck,
  Package2,
  ShoppingBag,
  BarChart3
} from 'lucide-react'

const stats = [
  {
    name: 'Total Users',
    value: '2,345',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Total Products',
    value: '89',
    change: '+3',
    changeType: 'positive',
    icon: Package,
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+8%',
    changeType: 'positive',
    icon: ShoppingCart,
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '+15%',
    changeType: 'positive',
    icon: DollarSign,
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'order',
    description: 'New order #1234 from John Doe',
    time: '2 minutes ago',
    icon: ShoppingBag,
  },
  {
    id: 2,
    type: 'user',
    description: 'New user registration: jane@example.com',
    time: '5 minutes ago',
    icon: UserCheck,
  },
  {
    id: 3,
    type: 'product',
    description: 'Product "Strawberry Toothpaste" updated',
    time: '10 minutes ago',
    icon: Package2,
  },
  {
    id: 4,
    type: 'analytics',
    description: 'Daily report generated',
    time: '1 hour ago',
    icon: BarChart3,
  },
]

export function AdminDashboard() {
  const { user } = useAdmin()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.full_name || user?.email}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
                      <span className="sr-only">
                        {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                      </span>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <activity.icon className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">{activity.description}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Add New Product</div>
                  <div className="text-sm text-gray-500">Create a new product listing</div>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">View Users</div>
                  <div className="text-sm text-gray-500">Manage user accounts</div>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">View Orders</div>
                  <div className="text-sm text-gray-500">Process and track orders</div>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-500">Check store performance</div>
                </div>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
