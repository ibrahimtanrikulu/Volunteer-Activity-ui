import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EventItem } from "../types/all";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";

type EventWithCategory = EventItem & { category?: string };

const DUMMY: EventWithCategory[] = [
  {
    id: 1,
    title: "Sahil Temizliği",
    date: "2025-09-20T10:00:00",
    city: "İstanbul",
    place: "Kadıköy Caddebostan",
    capacity: 30,
    joined: 18,
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    description: "Kıyı şeridinde temizlik ve ayrıştırma etkinliği.",
    category: "Çevre",
  },
  {
    id: 2,
    title: "Fidan Dikimi",
    date: "2025-09-28T11:00:00",
    city: "Ankara",
    place: "Mamak Orman Alanı",
    capacity: 50,
    joined: 50,
    cover: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200",
    description: "Doğa için yeni fidanlar dikiyoruz. Katılmak ister misiniz?",
    category: "Çevre",
  },
  {
    id: 3,
    title: "Kan Bağışı Kampanyası",
    date: "2025-10-05T09:30:00",
    city: "İzmir",
    place: "Alsancak Meydan",
    capacity: 80,
    joined: 42,
    description: "Kan ver, hayat kurtar! Türk Kızılay iş birliği ile düzenleniyor.",
    category: "Sağlık",
  },
];

export default function EventsPage() {
  const nav = useNavigate();

  // Detaylı filtre state’leri
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState(""); // "YYYY-MM-DD"
  const [endDate, setEndDate] = useState("");

  const filtered = useMemo(() => {
    return DUMMY.filter((e) => {
      const matchQ =
        q.trim().length === 0 ||
        e.title.toLowerCase().includes(q.toLowerCase()) ||
        (e.description ?? "").toLowerCase().includes(q.toLowerCase());

      const matchCity = city === "all" || e.city === city;
      const matchCategory = category === "all" || (e.category ?? "") === category;

      const evDate = new Date(e.date).getTime();
      const matchStart = !startDate || evDate >= new Date(startDate).getTime();
      const matchEnd = !endDate || evDate <= new Date(endDate).getTime();

      return matchQ && matchCity && matchCategory && matchStart && matchEnd;
    });
  }, [q, city, category, startDate, endDate]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Etkinlikler</h1>

      <EventFilters
        q={q}
        setQ={setQ}
        city={city}
        setCity={setCity}
        category={category}
        setCategory={setCategory}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {filtered.length === 0 ? (
        <p className="text-gray-600">Kriterlere uygun etkinlik bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ev) => (
            <EventCard
              key={ev.id}
              item={ev}
              onClick={(id) => nav(`/events/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}