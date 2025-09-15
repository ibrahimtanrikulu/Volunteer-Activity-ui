// src/pages/MyEventsPage.tsx
import { useMemo, useState } from "react";
import type { EventItem } from "../types/all";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";

type Role = "volunteer" | "org";
type EventWithCategory = EventItem & { category?: string };

const D_JOINED: EventWithCategory[] = [
  {
    id: 11,
    title: "Park Temizliği",
    date: "2025-09-22T10:00:00",
    city: "İstanbul",
    place: "Moda Sahil",
    capacity: 25,
    joined: 20,
    description: "Mahalle parkında temizlik ve geri dönüşüm ayrıştırma.",
    category: "Çevre",
  },
  {
    id: 12,
    title: "Kültür Merkezi Etkinliği",
    date: "2025-10-02T18:00:00",
    city: "Ankara",
    place: "Çankaya Kültür Merkezi",
    capacity: 100,
    joined: 67,
    description: "Etkinlik organizasyonunda görev alımı.",
    category: "Sosyal",
  },
];

const D_CREATED: EventWithCategory[] = [
  {
    id: 21,
    title: "Okul Boyama",
    date: "2025-10-10T09:00:00",
    city: "İzmir",
    place: "Buca İlkokulu",
    capacity: 40,
    joined: 12,
    description: "Okulun bazı sınıflarını boyuyoruz. Malzeme kurumdan.",
    category: "Eğitim",
  },
  {
    id: 22,
    title: "Kıyı Temizliği",
    date: "2025-10-15T10:00:00",
    city: "İstanbul",
    place: "Karaköy",
    capacity: 60,
    joined: 48,
    description: "Kıyı şeridinde temizlik. Eldiven/poşet sağlanır.",
    category: "Çevre",
  },
];

export default function MyEventsPage() {
  // Geçici rol seçimi (auth gelince kalkacak)
  const [role, setRole] = useState<Role>("volunteer");

  // EventFilters state'leri
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState("");

  const data = role === "volunteer" ? D_JOINED : D_CREATED;

  const filtered = useMemo(() => {
    return data.filter((e) => {
      const txt = q.trim().toLowerCase();
      const matchQ =
        !txt ||
        e.title.toLowerCase().includes(txt) ||
        (e.description ?? "").toLowerCase().includes(txt) ||
        e.city.toLowerCase().includes(txt);

      const matchCity = city === "all" || e.city === city;
      const matchCategory = category === "all" || (e.category ?? "") === category;

      const evTime = new Date(e.date).getTime();
      const matchStart = !startDate || evTime >= new Date(startDate).getTime();
      const matchEnd = !endDate || evTime <= new Date(endDate).getTime();

      return matchQ && matchCity && matchCategory && matchStart && matchEnd;
    });
  }, [data, q, city, category, startDate, endDate]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      {/* Başlık + geçici rol toggle */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Etkinliklerim</h1>
        <div className="inline-flex rounded-md border overflow-hidden">
          <button
            className={`px-3 py-1.5 text-sm ${role === "volunteer" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}
            onClick={() => setRole("volunteer")}
          >
            Gönüllü (Katıldıklarım)
          </button>
          <button
            className={`px-3 py-1.5 text-sm border-l ${role === "org" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}
            onClick={() => setRole("org")}
          >
            Kurum (Oluşturduklarım)
          </button>
        </div>
      </div>

      {/* Detaylı filtreler */}
      <EventFilters
        q={q} setQ={setQ}
        city={city} setCity={setCity}
        category={category} setCategory={setCategory}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
      />

      {/* Liste */}
      {filtered.length === 0 ? (
        <p className="text-gray-600">Kriterlere uyan etkinlik bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ev) => (
            <EventCard key={ev.id} item={ev} />
          ))}
        </div>
      )}
    </div>
  );
}