import { Link } from "react-router-dom";
import type { EventCard } from "../../types/home";

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));

type EventsSectionProps = {
  events: EventCard[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export function EventsSection({
  events,
  totalResults,
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
}: EventsSectionProps) {
  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
            Etkinlikler
          </p>
          <h3 className="text-3xl font-semibold text-gray-900">
            {totalResults} sonuç
          </h3>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>Güncellenen Liste</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {events.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-gray-200 bg-white/70 p-10 text-center text-gray-500">
            Aradığın kriterlerde bir etkinlik bulunamadı. Filtreleri
            genişletmeyi dene.
          </div>
        )}

        {events.map((event) => (
          <EventCardItem key={event.id} event={event} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
    </section>
  );
}

type EventCardItemProps = {
  event: EventCard;
};

function EventCardItem({ event }: EventCardItemProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-gray-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-700">
          {event.category}
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-2 font-semibold text-gray-800">
            {formatDate(event.date)}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            {event.mode}
          </span>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">
            {event.title}
          </h4>
          <p className="mt-1 text-sm uppercase tracking-[0.3em] text-gray-400">
            {event.organization}
          </p>
        </div>
        <p className="text-sm text-gray-600">{event.description}</p>
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
          <div className="text-gray-500">
            <p className="font-semibold text-gray-800">{event.location}</p>
            <p>+{event.volunteersNeeded} gönüllü</p>
          </div>
          <Link
            to={`/events/${event.id}`}
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
          >
            Detayları Gör
          </Link>
        </div>
      </div>
    </article>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
      <p className="text-sm text-gray-500">
        {currentPage} / {totalPages} sayfa
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={onPrevPage}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition enabled:hover:border-emerald-300 enabled:hover:text-emerald-600 disabled:opacity-40"
        >
          Önceki
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={onNextPage}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition enabled:hover:border-emerald-300 enabled:hover:text-emerald-600 disabled:opacity-40"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}
