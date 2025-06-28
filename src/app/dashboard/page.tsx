'use client';

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Car, 
  Shield, 
  Zap, 
  Bell, 
  Search, 
  Filter,
  Heart,
  Navigation,
  Calendar,
  Settings,
  LogOut,
  User,
  Crown,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [activePage, setActivePage] = useState('map');
  const [userPlan, setUserPlan] = useState('premium'); // 'free' or 'premium'
  const [notifications, setNotifications] = useState(3);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Mock data for parking spots
  const [parkingSpots, setParkingSpots] = useState([
    { 
      id: 1, 
      name: 'Piața Victoriei', 
      address: 'Piața Victoriei 1, Sector 1', 
      available: 5, 
      total: 20, 
      distance: '0.3 km', 
      price: '5 RON/oră', 
      rating: 4.8, 
      reviews: 124,
      isFavorite: false,
      lastUpdated: '2 min'
    },
    { 
      id: 2, 
      name: 'Centrul Vechi', 
      address: 'Strada Lipscani 15, Sector 3', 
      available: 12, 
      total: 30, 
      distance: '0.8 km', 
      price: '8 RON/oră', 
      rating: 4.5, 
      reviews: 89,
      isFavorite: true,
      lastUpdated: '1 min'
    },
    { 
      id: 3, 
      name: 'Parcarea ta actuală', 
      address: 'Piața Romana 1, Sector 1', 
      available: 0, 
      total: 15, 
      distance: '0.1 km', 
      price: '6 RON/oră', 
      rating: 4.2, 
      reviews: 67,
      isFavorite: false,
      lastUpdated: 'Acum',
      isCurrent: true
    },
    { 
      id: 4, 
      name: 'Calea Victoriei', 
      address: 'Calea Victoriei 45, Sector 1', 
      available: 3, 
      total: 25, 
      distance: '1.2 km', 
      price: '7 RON/oră', 
      rating: 4.6, 
      reviews: 156,
      isFavorite: false,
      lastUpdated: '5 min'
    },
  ]);

  const [reservations] = useState([
    {
      id: 1,
      parkingName: 'Piața Victoriei',
      date: 'Astăzi',
      time: '14:00 - 16:00',
      spot: 'A15',
      status: 'active'
    },
    {
      id: 2,
      parkingName: 'Centrul Vechi',
      date: 'Mâine',
      time: '10:00 - 12:00',
      spot: 'B8',
      status: 'upcoming'
    }
  ]);

  const [recentActivity] = useState([
    { 
      id: 1, 
      type: 'reservation', 
      title: 'Rezervare confirmată', 
      description: 'Piața Victoriei - Locul A15 pentru astăzi, 14:00-16:00', 
      time: '2 min în urmă',
      icon: '📅'
    },
    { 
      id: 2, 
      type: 'report', 
      title: 'Loc raportat ca eliberat', 
      description: 'Ai raportat plecarea din Piața Romana', 
      time: '15 min în urmă',
      icon: '🚗'
    },
    { 
      id: 3, 
      type: 'notification', 
      title: 'Loc disponibil în zona ta', 
      description: 'Centrul Vechi - 12 locuri noi disponibile', 
      time: '1 oră în urmă',
      icon: '🔔'
    },
  ]);

  const [settings, setSettings] = useState({
    notifications: {
      availableSpots: true,
      reservationReminders: true,
      weeklyNewsletter: false
    },
    preferredZone: 'București - Centru'
  });

  // Functions
  const toggleFavorite = (spotId: number) => {
    setParkingSpots(spots => 
      spots.map(spot => 
        spot.id === spotId 
          ? { ...spot, isFavorite: !spot.isFavorite }
          : spot
      )
    );
    showToastMessage('Loc adăugat la favorite!', 'success');
  };

  const navigateToSpot = (spotName: string) => {
    showToastMessage(`Navigare către ${spotName}...`, 'success');
  };

  const openReserveModal = () => {
    setModalType('reservation');
    setShowModal(true);
  };

  const reportDeparture = (spotName: string) => {
    showToastMessage(`Loc raportat ca eliberat în ${spotName}`, 'success');
  };

  const showToastMessage = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleSetting = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting as keyof typeof prev.notifications]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center text-2xl font-bold text-blue-600">
          <span className="text-3xl mr-2">🅿️</span>
          Unde Parchez?
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </div>
          
          {/* Plan Indicator */}
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            userPlan === 'premium' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {userPlan === 'premium' ? 'Premium' : 'Free'}
          </div>
          
          {/* User Menu */}
          <div className="relative">
            <div 
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              MP
            </div>
            
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-48 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="font-semibold text-gray-900">Maria Popescu</div>
                  <div className="text-sm text-gray-500">{userPlan === 'premium' ? 'Plan Premium' : 'Plan Gratuit'}</div>
                </div>
                <div className="py-1">
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3">
                    <User className="w-4 h-4" />
                    <span>Profilul meu</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3">
                    <Settings className="w-4 h-4" />
                    <span>Setări</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3">
                    <LogOut className="w-4 h-4" />
                    <span>Deconectare</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 py-8 overflow-y-auto">
          <nav className="space-y-8">
            {/* Navigation Section */}
            <div>
              <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Navigare
              </div>
              <div className="space-y-1">
                {[
                  { id: 'map', icon: '🗺️', label: 'Harta parcărilor' },
                  { id: 'available', icon: '🚗', label: 'Locuri disponibile' },
                  { id: 'favorites', icon: '❤️', label: 'Favorite' },
                  { id: 'reservations', icon: '📅', label: 'Rezervările mele' }
                ].map(item => (
                  <div
                    key={item.id}
                    className={`px-6 py-3 cursor-pointer transition-colors flex items-center space-x-3 ${
                      activePage === item.id 
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePage(item.id)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Section */}
            <div>
              <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Activitate
              </div>
              <div className="space-y-1">
                <div
                  className={`px-6 py-3 cursor-pointer transition-colors flex items-center space-x-3 ${
                    activePage === 'activity' 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActivePage('activity')}
                >
                  <span className="text-xl">🕒</span>
                  <span className="font-medium">Activitate recentă</span>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Cont
              </div>
              <div className="space-y-1">
                <div
                  className={`px-6 py-3 cursor-pointer transition-colors flex items-center space-x-3 ${
                    activePage === 'settings' 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActivePage('settings')}
                >
                  <span className="text-xl">⚙️</span>
                  <span className="font-medium">Setări cont</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="px-6 pt-6 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-900 mb-4">Statistici Rapide</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Locuri salvate</span>
                  <span className="font-medium">{parkingSpots.filter(s => s.isFavorite).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rezervări active</span>
                  <span className="font-medium">{reservations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Puncte comunitate</span>
                  <span className="font-medium">1,250</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Map Page */}
          {activePage === 'map' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Harta Parcărilor</h1>
                <p className="text-gray-600">Vezi în timp real toate locurile de parcare disponibile în București</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-3 flex-1 max-w-md">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Caută o adresă sau zonă..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                        🔍 Caută
                      </button>
                      <button className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                        ⚙️ Filtre
                      </button>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Disponibil (24)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Ocupat (18)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Hartă interactivă Google Maps</p>
                    <p className="text-sm">Integrare în curs de dezvoltare</p>
                  </div>
                  
                  {/* Sample parking pins */}
                  <div className="absolute top-1/4 left-1/5 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-125 transition-transform">
                    5
                  </div>
                  <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-125 transition-transform">
                    0
                  </div>
                  <div className="absolute top-1/2 left-2/5 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-125 transition-transform">
                    12
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Available Spots Page */}
          {activePage === 'available' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Locuri Disponibile</h1>
                <p className="text-gray-600">{parkingSpots.filter(s => s.available > 0).length} locuri de parcare disponibile în zona ta</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {parkingSpots.map((spot) => (
                  <div key={spot.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{spot.name}</h3>
                        <p className="text-gray-600 text-sm">{spot.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${spot.available > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-sm font-semibold ${spot.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {spot.available} libere
                        </span>
                        <button 
                          className={`text-2xl transition-colors ${spot.isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                          onClick={() => toggleFavorite(spot.id)}
                        >
                          {spot.isFavorite ? '♥' : '♡'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{spot.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>💰</span>
                        <span>{spot.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{spot.rating} ({spot.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Acum {spot.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        onClick={() => navigateToSpot(spot.name)}
                      >
                        🧭 Navighează
                      </button>
                      {userPlan === 'premium' && spot.available > 0 && (
                        <button 
                          className="flex-1 py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                          onClick={openReserveModal}
                        >
                          📅 Rezervă
                        </button>
                      )}
                      {spot.isCurrent && (
                        <button 
                          className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                          onClick={() => reportDeparture(spot.name)}
                        >
                          🚗 Am plecat
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorites Page */}
          {activePage === 'favorites' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Locurile Mele Favorite</h1>
                <p className="text-gray-600">Parcările tale salvate pentru acces rapid</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {parkingSpots.filter(spot => spot.isFavorite).map((spot) => (
                  <div key={spot.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{spot.name}</h3>
                        <p className="text-gray-600 text-sm">{spot.address}</p>
                      </div>
                      <button 
                        className="text-2xl text-red-500"
                        onClick={() => toggleFavorite(spot.id)}
                      >
                        ♥
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                      <span className={spot.available > 0 ? 'text-green-600' : 'text-red-600'}>
                        {spot.available} disponibile
                      </span>
                      <span>{spot.distance}</span>
                    </div>
                    
                    <button 
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      onClick={() => navigateToSpot(spot.name)}
                    >
                      🧭 Navighează
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reservations Page */}
          {activePage === 'reservations' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Rezervările Mele</h1>
                <p className="text-gray-600">Gestionează rezervările tale active și viitoare</p>
              </div>
              
              {userPlan === 'premium' ? (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">{reservation.parkingName}</h3>
                          <p className="text-gray-600">{reservation.date}, {reservation.time}</p>
                          <p className="text-sm text-gray-500">Locul {reservation.spot}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            reservation.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {reservation.status === 'active' ? 'Activă' : 'Viitoare'}
                          </span>
                          <div className="mt-3">
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                              Anulează
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Funcție Premium</h3>
                  <p className="text-gray-600 mb-6">Upgrade la Premium pentru a rezerva locuri în avans</p>
                  <button className="px-8 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                    Upgrade la Premium
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Activity Page */}
          {activePage === 'activity' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Activitate Recentă</h1>
                <p className="text-gray-600">Istoricul acțiunilor tale în aplicație</p>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Page */}
          {activePage === 'settings' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Setări Cont</h1>
                <p className="text-gray-600">Personalizează experiența ta în aplicație</p>
              </div>
              
              <div className="space-y-6">
                {/* Notifications */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Notificări</h3>
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <div className="font-medium text-gray-900">
                            {key === 'availableSpots' && 'Notificări pentru locuri disponibile'}
                            {key === 'reservationReminders' && 'Reminder-uri pentru rezervări'}
                            {key === 'weeklyNewsletter' && 'Newsletter săptămânal'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {key === 'availableSpots' && 'Primește alerte când se eliberează locuri în zona ta'}
                            {key === 'reservationReminders' && 'Notificări înainte de rezervările tale'}
                            {key === 'weeklyNewsletter' && 'Noutăți și statistici săptămânale'}
                          </div>
                        </div>
                        <button
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                          onClick={() => toggleSetting(key)}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferred Zone */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Zona Preferată</h3>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={settings.preferredZone}
                    onChange={(e) => setSettings(prev => ({ ...prev, preferredZone: e.target.value }))}
                  >
                    <option>București - Centru</option>
                    <option>București - Sector 1</option>
                    <option>București - Sector 2</option>
                    <option>București - Sector 3</option>
                  </select>
                </div>

                {/* Plan */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan Cont</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {userPlan === 'premium' ? 'Plan Premium' : 'Plan Gratuit'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {userPlan === 'premium' ? 'Toate funcțiile disponibile' : 'Funcții limitate'}
                        </p>
                      </div>
                      {userPlan === 'free' && (
                        <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                          Upgrade
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {modalType === 'reservation' ? 'Rezervare Loc de Parcare' : 'Confirmare'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setShowModal(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {modalType === 'reservation' && (
              <div>
                <p className="text-gray-600 mb-6">
                  Confirmă rezervarea pentru locul de parcare selectat?
                </p>
                <div className="flex gap-3">
                  <button 
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setShowModal(false);
                      showToastMessage('Rezervare confirmată!', 'success');
                    }}
                  >
                    Confirmă
                  </button>
                  <button 
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => setShowModal(false)}
                  >
                    Anulează
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-8 right-8 bg-white border border-gray-200 rounded-xl p-4 shadow-lg flex items-center gap-3 z-50 ${
          toastType === 'success' ? 'border-green-200 bg-green-50' :
          toastType === 'error' ? 'border-red-200 bg-red-50' :
          'border-yellow-200 bg-yellow-50'
        }`}>
          {toastType === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
          {toastType === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
          {toastType === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
          <span className="text-gray-900">{toastMessage}</span>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
} 