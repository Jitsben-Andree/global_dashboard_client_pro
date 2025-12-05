import { Loader2 } from 'lucide-react';

export default function Loader({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-10">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
      <p className="text-gray-500 text-sm font-medium">{text}</p>
    </div>
  );
}