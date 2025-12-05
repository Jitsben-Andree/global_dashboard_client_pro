import { useEffect, useState } from 'react';
import { getNews } from '@/services/data.service';
import { NewsItem } from '@/types';
import Loader from '../ui/Loader';
import { ExternalLink } from 'lucide-react';

export default function NewsFeed({ query }: { query: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNews(query)
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  if (loading) return <Loader text="Buscando noticias..." />;
  if (news.length === 0) return <p className="text-gray-500 text-center py-4">No hay noticias recientes.</p>;

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <a 
          key={item.article_id} 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors group"
        >
          {item.image_url && (
            <div className="h-32 w-full relative overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image_url} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600">{item.title}</h4>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>{new Date(item.pubDate).toLocaleDateString()}</span>
              <ExternalLink className="h-3 w-3" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}