import { useEffect, useState } from 'react';
import { getProvinces } from '@/services/data.service';
import { Province } from '@/types';
import Loader from '../ui/Loader';
import { MapPin } from 'lucide-react';

export default function ProvinceList({ countryCode }: { countryCode: string }) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getProvinces(countryCode)
      .then(data => {
        setProvinces(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [countryCode]);

  if (loading) return <Loader text="Cargando provincias..." />;
  if (error) return <p className="text-red-500 text-center py-4">Error cargando provincias</p>;
  if (provinces.length === 0) return <p className="text-gray-500 text-center py-4">No hay información regional disponible.</p>;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 mb-4 px-1">Regiones / Estados</h3>
      <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-2 no-scrollbar">
        {provinces.map((prov: any) => (
          <div key={prov.id || prov.wikiDataId} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-full text-blue-500">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="font-medium text-gray-800">{prov.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}