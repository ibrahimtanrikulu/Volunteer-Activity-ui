import { useParams, useNavigate, Link } from "react-router-dom";
import type { EventItem } from "../types/all";
 
const DUMMY: EventItem[] = [
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
  },
];

export default function EventDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const event = DUMMY.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold">Etkinlik bulunamadı.</p>
        <Link to="/events" className="text-blue-600 underline">
          Tüm etkinliklere dön
        </Link>
      </div>
    );
  }

  const left = Math.max(0, event.capacity - event.joined);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-4">
      {event.cover && (
        <img
          src={event.cover}
          alt={event.title}
          className="w-full h-64 object-cover rounded-md"
        />
      )}

      <h1 className="text-2xl font-bold">{event.title}</h1>

      <p className="text-gray-600">
        {new Date(event.date).toLocaleString()} • {event.city}
        {event.place ? `, ${event.place}` : ""}
      </p>

      <p className="text-gray-700">{event.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">
          Katılan: {event.joined} / {event.capacity}
        </span>
        <span
          className={`px-2 py-0.5 rounded text-xs ${
            left === 0
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {left === 0 ? "DOLU" : `Kalan: ${left}`}
        </span>
      </div>

      <button
              onClick={() => {
          // Şimdilik dummy — ileride API bağlayacağız
          if (left === 0) return alert("Kontenjan dolmuş!");
          alert("Katılım isteği (dummy).");
          nav("/events");
        }}
        disabled={left === 0}
        className="rounded-md bg-gray-900 text-white px-4 py-2 font-medium disabled:opacity-50"
      >
        Etkinliğe Katıl
      </button>
    </div>
  );
}