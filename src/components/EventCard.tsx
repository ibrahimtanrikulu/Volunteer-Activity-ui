import { useNavigate } from "react-router-dom";
import type { EventItem } from "../types/all";

type Props = {
  item: EventItem;
  onClick?: (id: number) => void; // şimdilik opsiyonel
};

export default function EventCard({ item, onClick }: Props) {
  const left = Math.max(0, item.capacity - item.joined);
  const nav = useNavigate();

  return (
    <article
      className="rounded-lg border bg-white shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
      onClick={() => {
        if (onClick) {
          onClick(item.id);
        } else { 
          nav(`/events/${item.id}`);
        }
      }}
      role="button"
    >
      {item.cover && (
        <img src={item.cover} alt={item.title} className="h-40 w-full object-cover" />
      )}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">
          {new Date(item.date).toLocaleString()} • {item.city}
          {item.place ? `, ${item.place}` : ""}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">
            Kapasite: {item.capacity} • Katılan: {item.joined}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs ${left === 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {left === 0 ? "DOLU" : `Kalan: ${left}`}
          </span>
        </div>
      </div>
    </article>
  );
}