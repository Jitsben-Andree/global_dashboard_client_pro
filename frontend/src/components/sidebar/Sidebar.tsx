'use client';

import { useMapStore } from '@/store/useMapStore';
import { X, Info, Map, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import CountryInfo from './CountryInfo';
import ProvinceList from './ProvinceList';
import NewsFeed from './NewsFeed';
import Loader from '../ui/Loader';

export default function Sidebar() {
  const { isSidebarOpen, selectedCountryData, closeSidebar, selectedCountryCode } = useMapStore();
  const [activeTab, setActiveTab] = useState<'info' | 'provinces' | 'news'>('info');

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[1000] flex flex-col transition-transform duration-300">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <h2 className="font-bold text-lg text-gray-800">
          {selectedCountryData ? 'Detalles del País' : 'Cargando...'}
        </h2>
        <button 
          onClick={closeSidebar}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Tabs de Navegación */}
      <div className="flex border-b bg-gray-50">
        <TabButton 
          active={activeTab === 'info'} 
          onClick={() => setActiveTab('info')} 
          icon={<Info className="h-4 w-4" />} 
          label="Info" 
        />
        <TabButton 
          active={activeTab === 'provinces'} 
          onClick={() => setActiveTab('provinces')} 
          icon={<Map className="h-4 w-4" />} 
          label="Provincias" 
        />
        <TabButton 
          active={activeTab === 'news'} 
          onClick={() => setActiveTab('news')} 
          icon={<Newspaper className="h-4 w-4" />} 
          label="Noticias" 
        />
      </div>

      {/* Contenido Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        {!selectedCountryData ? (
           <Loader text="Obteniendo datos globales..." />
        ) : (
          <>
            {activeTab === 'info' && <CountryInfo country={selectedCountryData} />}
            {activeTab === 'provinces' && <ProvinceList countryCode={selectedCountryData.cca2} />}
            {activeTab === 'news' && <NewsFeed query={selectedCountryData.name.common} />}
          </>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2",
        active 
          ? "border-blue-600 text-blue-600 bg-white" 
          : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      {label}
    </button>
  );
}