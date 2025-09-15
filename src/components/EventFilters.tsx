import type { Dispatch, SetStateAction } from "react";
 
type Props = {
  q: string;
  setQ: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
};

export default function EventFilters({
  q,
  setQ,
  city,
  setCity,
  category,
  setCategory,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
  return (
    <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm space-y-4">
      {/* Arama */}
      <div>
        <label className="block text-sm font-medium mb-1">Anahtar Kelime</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Etkinlik adı, açıklama..."
          className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Grid düzeninde diğer filtreler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Şehir */}
        <div>
          <label className="block text-sm font-medium mb-1">Şehir</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">Tümü</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
          </select>
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">Tümü</option>
            <option value="Çevre">Çevre</option>
            <option value="Sağlık">Sağlık</option>
            <option value="Eğitim">Eğitim</option>
            <option value="Sosyal">Sosyal</option>
          </select>
        </div>

        {/* Tarih başlangıç */}
        <div>
          <label className="block text-sm font-medium mb-1">Başlangıç</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Tarih bitiş */}
        <div>
          <label className="block text-sm font-medium mb-1">Bitiş</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
    </div>
  );
}