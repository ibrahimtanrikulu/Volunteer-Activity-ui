import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { VOLUNTEER_EVENTS } from "../data/publicEvents";

export default function VolunteerEventDetailPage() {
  const { id } = useParams<{ id: string }>();

  const event = useMemo(() => {
    if (!id) return undefined;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return undefined;
    return VOLUNTEER_EVENTS.find((item) => item.id === numericId);
  }, [id]);

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-xl shadow-emerald-50">
          <h1 className="text-2xl font-semibold text-gray-900">Etkinlik bulunamadı</h1>
          <p className="mt-3 text-sm text-gray-500">
            Aradığın gönüllü etkinliği yayından kaldırılmış ya da bağlantı hatalı olabilir.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <Link
              to="/"
              className="rounded-full bg-gray-900 px-5 py-2 font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Anasayfaya dön
            </Link>
            <Link
              to="/"
              className="rounded-full border border-gray-200 px-5 py-2 font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
            >
              Gönüllü fırsatlarına göz at
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const heroImage = event.heroImage ?? event.image;

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-emerald-50">
        <div className="relative">
          <img
            src={heroImage}
            alt={event.title}
            className="h-72 w-full object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              <span>{event.category}</span>
              <span>•</span>
              <span>{event.mode}</span>
            </div>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-white">{event.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80">{event.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90">
                📅 {new Date(event.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90">
                📍 {event.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90">
                👥 {event.volunteersNeeded} gönüllü hedefi
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-6 border-t border-white/20 bg-white/90 p-8 text-sm text-gray-600 backdrop-blur md:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <p>
              <span className="text-gray-900">Son başvuru:</span>{" "}
              {new Date(event.applicationEndDate).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>
              <span className="text-gray-900">Organizasyon:</span> {event.organization}
            </p>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/register"
              className="rounded-full bg-gray-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Gönüllü Başvurusu Yap
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
            >
              Hesabın varsa giriş yap
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Etkinlik Özeti
            </p>
            <p className="mt-4 text-sm text-gray-600">{event.description}</p>
            <div className="mt-6 space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Hedefler</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {event.objectives.map((objective) => (
                  <li key={objective} className="flex items-start gap-3">
                    <span className="mt-1 text-emerald-500">✦</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                  Program Akışı
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">Gün planı</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600">
                {event.mode}
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {event.schedule.map((item) => (
                <div
                  key={`${item.time}-${item.activity}`}
                  className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600 md:flex-row md:items-center md:justify-between"
                >
                  <span className="font-semibold text-gray-900">{item.time}</span>
                  <span>{item.activity}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="grid gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                Katılım Şartları
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {event.requirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-3">
                    <span className="mt-1 text-emerald-500">✔</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                Katkılar
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {event.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 text-emerald-500">★</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Lokasyon & Lojistik
            </p>
            <p className="mt-3 text-sm text-gray-600">{event.locationDetails}</p>
            {event.mapUrl && (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500"
              >
                Haritada aç
                <span aria-hidden>↗</span>
              </a>
            )}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">İletişim</p>
              <p className="mt-2 font-semibold text-gray-900">{event.contact.name}</p>
              <p>{event.contact.email}</p>
              <p>{event.contact.phone}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-sm text-emerald-700 shadow-inner shadow-emerald-100">
            <p className="font-semibold text-emerald-700">Katılım notu</p>
            <p className="mt-3">
              Başvurunu tamamladıktan sonra organizatör ekibi seninle iletişime geçerek görev paylaşımı ve gerekli
              eğitimleri aktarır. Katılım durumunu profilinden takip edebilirsin.
            </p>
            <Link
              to="/profile"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
            >
              Profilini güncelle
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
