import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ORGANIZER_EVENTS } from "../data/organizer";
import type { OrganizerEvent, OrganizerParticipant } from "../types/organizer";

const DATE_FORMAT = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "long",
});

const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat("tr", {
  numeric: "auto",
});

const formatDate = (date: string) => DATE_FORMAT.format(new Date(date));

const formatRelativeTime = (timestamp: string) => {
  const diff = new Date(timestamp).getTime() - Date.now();
  const abs = Math.abs(diff);
  if (abs < 60 * 60 * 1000) {
    const minutes = Math.round(diff / (60 * 1000));
    return RELATIVE_TIME_FORMAT.format(minutes, "minute");
  }
  if (abs < 24 * 60 * 60 * 1000) {
    const hours = Math.round(diff / (60 * 60 * 1000));
    return RELATIVE_TIME_FORMAT.format(hours, "hour");
  }
  const days = Math.round(diff / (24 * 60 * 60 * 1000));
  return RELATIVE_TIME_FORMAT.format(days, "day");
};

const computeMetrics = (events: OrganizerEvent[]) => {
  const activeEvents = events.filter((event) => event.status === "Yayında").length;
  const confirmed = events.reduce((total, event) => total + event.volunteersConfirmed, 0);
  const waitlist = events.reduce((total, event) => total + event.volunteersWaitlist, 0);
  const pendingParticipants = events.reduce(
    (total, event) =>
      total + event.participants.filter((participant) => participant.status === "Beklemede").length,
    0,
  );

  return {
    activeEvents,
    confirmed,
    waitlist,
    pendingParticipants,
  };
};

const flattenParticipants = (events: OrganizerEvent[]) => {
  const allParticipants: Array<OrganizerParticipant & { eventId: number; eventTitle: string }> = [];
  events.forEach((event) => {
    event.participants.forEach((participant) => {
      allParticipants.push({ ...participant, eventId: event.id, eventTitle: event.title });
    });
  });
  return allParticipants;
};

export default function OrganizerDashboardPage() {
  const events = ORGANIZER_EVENTS;

  const metrics = useMemo(() => computeMetrics(events), [events]);
  const upcomingEvents = useMemo(
    () =>
      [...events]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3),
    [events],
  );
  const recentUpdates = useMemo(
    () =>
      [...events]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 4),
    [events],
  );
  const highlightedParticipants = useMemo(() => {
    const participants = flattenParticipants(events);
    return participants
      .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
      .slice(0, 5);
  }, [events]);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-10 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Organizatör Paneli
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              Etkinliklerini tek merkezden planla, ekibini yönlendir ve etkiyi büyüt.
            </h1>
            <p className="text-sm text-white/80">
              Katılımcı başvurularını takip et, yeni etkinlikler oluştur ve operasyon akışını hızlandırmak
              için hazır araçları kullan.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                to="/organizer/events"
                className="rounded-full bg-white px-5 py-2 font-semibold text-emerald-600 shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                Yeni Etkinlik Oluştur
              </Link>
              <Link
                to="/organizer/events"
                className="rounded-full border border-white/40 px-5 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Etkinlik Havuzu
              </Link>
            </div>
          </div>
          <div className="flex min-w-[16rem] flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Anlık Durum
            </p>
            <div className="space-y-2 text-white/90">
              <p>
                <span className="text-2xl font-semibold text-white">{metrics.confirmed}</span> kayıtlı gönüllü
              </p>
              <p>
                <span className="font-semibold">{metrics.pendingParticipants}</span> onay bekleyen başvuru
              </p>
              <p>
                <span className="font-semibold">{metrics.activeEvents}</span> aktif etkinlik
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Aktif Etkinlik",
            value: metrics.activeEvents,
            sublabel: "Yayında",
            accent: "bg-emerald-100 text-emerald-600",
          },
          {
            title: "Toplam Kontenjan",
            value: events.reduce((total, event) => total + event.volunteersNeeded, 0),
            sublabel: "Planlanan gönüllü kapasitesi",
            accent: "bg-sky-100 text-sky-600",
          },
          {
            title: "Onaylı Gönüllü",
            value: metrics.confirmed,
            sublabel: "Tüm etkinlikler",
            accent: "bg-indigo-100 text-indigo-600",
          },
          {
            title: "Bekleme Listesi",
            value: metrics.waitlist,
            sublabel: "Yer açıldığında dahil olacak",
            accent: "bg-amber-100 text-amber-600",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-emerald-50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
              {item.title}
            </p>
            <p className="mt-3 text-3xl font-semibold text-gray-900">{item.value}</p>
            <span className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold ${item.accent}`}>
              ✦ {item.sublabel}
            </span>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                  Yaklaşan Etkinlikler
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  Önümüzdeki üç hafta
                </h3>
              </div>
              <Link
                to="/organizer/events"
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 transition hover:border-emerald-300 hover:text-emerald-500"
              >
                Tümünü Gör
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {upcomingEvents.map((event) => (
                <article
                  key={event.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                      {formatDate(event.date)} · {event.location}
                    </p>
                    <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.teamLead} koordinasyonunda</p>
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-500">
                    <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-emerald-600">
                      {event.status}
                    </span>
                    <span className="mt-3 text-gray-400">
                      {event.volunteersConfirmed}/{event.volunteersNeeded} gönüllü
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Öncelikli Katılımcılar
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">
              Takip gerektiren başvurular
            </h3>

            <div className="mt-6 space-y-4">
              {highlightedParticipants.map((participant) => (
                <div
                  key={`${participant.eventId}-${participant.id}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{participant.name}</p>
                    <p className="text-xs text-gray-500">{participant.email}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-400">
                      {participant.eventTitle}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-600">
                      {participant.status}
                    </span>
                    <p className="mt-2 text-gray-400">Başvuru: {formatDate(participant.appliedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Operasyon Notları
            </p>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500">✦</span>
                <span>"Uzaktan Kodlama Mentörlüğü" için eğitim materyali güncellemesi 18 Haziran’da tamamlanacak.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500">✦</span>
                <span>Topluluk mutfağı lojistik toplantısı 20 Haziran’da koordinasyon ekibiyle çevrim içi yapılacak.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500">✦</span>
                <span>Yeni sponsorluk anlaşması için etkinlik ihtiyaç listesi güncellenmek üzere.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Hızlı Linkler
            </p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-emerald-600">
              <Link
                to="/organizer/events"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-600 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100"
              >
                Etkinlik kopyala ve yayınla
              </Link>
              <Link
                to="/organizer/events"
                className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-600 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-100"
              >
                Katılımcı listesi dışa aktar
              </Link>
              <Link
                to="/organizer/events"
                className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-indigo-600 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-100"
              >
                Operasyon görevleri ata
              </Link>
              <Link
                to="/organizer/settings"
                className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white"
              >
                Organizasyon ayarlarını düzenle
              </Link>
              <Link
                to="/organizer/members"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-slate-100"
              >
                Üyelik taleplerini yönet
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
            Güncel Hareketler
          </p>
          <div className="mt-6 space-y-4">
            {recentUpdates.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                  <span className="text-xs text-gray-400">{formatRelativeTime(event.updatedAt)}</span>
                </div>
                <p className="mt-2 text-gray-500">
                  {event.teamLead} tarafından güncellendi. {event.volunteersConfirmed}/{event.volunteersNeeded} gönüllü.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
            Ekip Planı
          </p>
          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
              <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600">
                18 Haz
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Koordinasyon Toplantısı</p>
                <p className="text-xs text-gray-500">09:30 · Hibrit</p>
                <p className="mt-2 text-xs text-gray-500">
                  Yeni etkinlik takvimi paylaşılacak, risk planı güncellenecek.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
              <div className="rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-600">
                21 Haz
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Saha Eğitimi</p>
                <p className="text-xs text-gray-500">13:00 · İstanbul Ofisi</p>
                <p className="mt-2 text-xs text-gray-500">
                  Kadıköy temizlik ekibi için güvenlik ve lojistik brifingi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
              <div className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-600">
                24 Haz
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Mentör Onboarding</p>
                <p className="text-xs text-gray-500">19:00 · Online</p>
                <p className="mt-2 text-xs text-gray-500">
                  Yeni mentörlere program akışı ve platform turu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
