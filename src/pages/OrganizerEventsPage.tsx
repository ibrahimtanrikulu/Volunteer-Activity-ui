import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ORGANIZER_EVENTS } from "../data/organizer";
import type {
  OrganizerEvent,
  OrganizerEventStatus,
  OrganizerParticipant,
  OrganizerScheduleItem,
} from "../types/organizer";

type EventFormState = {
  id?: number;
  title: string;
  date: string;
  location: string;
  category: string;
  mode: OrganizerEvent["mode"];
  status: OrganizerEventStatus;
  volunteersNeeded: number;
  volunteersConfirmed: number;
  volunteersWaitlist: number;
  description: string;
  teamLead: string;
  schedule: OrganizerScheduleItem[];
};

type FormMode = "create" | "edit";

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

const emptyEventForm = (): EventFormState => ({
  title: "",
  date: new Date().toISOString().slice(0, 10),
  location: "",
  category: "Çevre",
  mode: "Yerinde",
  status: "Taslak",
  volunteersNeeded: 20,
  volunteersConfirmed: 0,
  volunteersWaitlist: 0,
  description: "",
  teamLead: "",
  schedule: [createScheduleItem()],
});

const advanceStatus = (status: OrganizerEventStatus): OrganizerEventStatus => {
  switch (status) {
    case "Taslak":
      return "Yayında";
    case "Yayında":
      return "Tamamlandı";
    default:
      return "Taslak";
  }
};

let scheduleIdCounter = 1000;

const createScheduleItem = (partial?: Partial<OrganizerScheduleItem>): OrganizerScheduleItem => {
  scheduleIdCounter += 1;
  return {
    id: scheduleIdCounter,
    time: "",
    activity: "",
    ...partial,
  };
};

const sanitizeSchedule = (schedule: OrganizerScheduleItem[]) =>
  schedule
    .map((item) => ({
      ...item,
      time: item.time.trim(),
      activity: item.activity.trim(),
    }))
    .filter((item) => item.time.length > 0 || item.activity.length > 0);

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<OrganizerEvent[]>(() => ORGANIZER_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(() =>
    ORGANIZER_EVENTS.length > 0 ? ORGANIZER_EVENTS[0].id : null,
  );
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<EventFormState>(() => emptyEventForm());

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [events, selectedEventId],
  );

  const stats = useMemo(() => {
    const activeEvents = events.filter((event) => event.status === "Yayında").length;
    const drafts = events.filter((event) => event.status === "Taslak").length;
    const pendingApprovals = events.reduce(
      (total, event) =>
        total + event.participants.filter((participant) => participant.status === "Beklemede").length,
      0,
    );
    const confirmed = events.reduce((total, event) => total + event.volunteersConfirmed, 0);
    return { activeEvents, drafts, pendingApprovals, confirmed };
  }, [events]);

  const handleOpenCreate = () => {
    setFormMode("create");
    setFormState(emptyEventForm());
    setIsFormOpen(true);
  };

  const handleOpenEdit = (event: OrganizerEvent) => {
    setFormMode("edit");
    setFormState({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      category: event.category,
      mode: event.mode,
      status: event.status,
      volunteersNeeded: event.volunteersNeeded,
      volunteersConfirmed: event.volunteersConfirmed,
      volunteersWaitlist: event.volunteersWaitlist,
      description: event.description,
      teamLead: event.teamLead,
      schedule:
        event.schedule.length > 0
          ? event.schedule.map((item) => ({ ...item }))
          : [createScheduleItem()],
    });
    setIsFormOpen(true);
  };

  const handleDuplicateEvent = (event: OrganizerEvent) => {
    const duplicated: OrganizerEvent = {
      ...event,
      id: Date.now(),
      title: `${event.title} (Kopya)`,
      status: "Taslak",
      volunteersConfirmed: 0,
      volunteersWaitlist: 0,
      schedule: event.schedule.map((item) =>
        createScheduleItem({ time: item.time, activity: item.activity }),
      ),
      participants: [],
      updatedAt: new Date().toISOString(),
    };
    setEvents((prev) => [...prev, duplicated]);
    setSelectedEventId(duplicated.id);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (typeof window !== "undefined" && !window.confirm("Etkinliği silmek istediğine emin misin?")) {
      return;
    }
    setEvents((prev) => {
      const updatedEvents = prev.filter((event) => event.id !== eventId);
      if (selectedEventId === eventId) {
        setSelectedEventId(updatedEvents.length > 0 ? updatedEvents[0].id : null);
      }
      return updatedEvents;
    });
  };

  const handleStatusAdvance = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? { ...event, status: advanceStatus(event.status), updatedAt: new Date().toISOString() }
          : event,
      ),
    );
  };

  const handleSelectEvent = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleFormChange = <K extends keyof EventFormState>(field: K, value: EventFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleScheduleItemChange = (
    index: number,
    field: "time" | "activity",
    value: string,
  ) => {
    setFormState((prev) => {
      const schedule = prev.schedule.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      );
      return { ...prev, schedule };
    });
  };

  const handleAddScheduleItem = () => {
    setFormState((prev) => ({
      ...prev,
      schedule: [...prev.schedule, createScheduleItem()],
    }));
  };

  const handleRemoveScheduleItem = (index: number) => {
    setFormState((prev) => {
      if (prev.schedule.length <= 1) return prev;
      const schedule = prev.schedule.filter((_, itemIndex) => itemIndex !== index);
      return { ...prev, schedule };
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitizedSchedule = sanitizeSchedule(formState.schedule);
    if (formMode === "create") {
      const newEvent: OrganizerEvent = {
        id: Date.now(),
        title: formState.title,
        date: formState.date,
        location: formState.location,
        category: formState.category,
        mode: formState.mode,
        status: formState.status,
        volunteersNeeded: formState.volunteersNeeded,
        volunteersConfirmed: formState.volunteersConfirmed,
        volunteersWaitlist: formState.volunteersWaitlist,
        description: formState.description,
        teamLead: formState.teamLead,
        schedule: sanitizedSchedule,
        participants: [],
        updatedAt: new Date().toISOString(),
      };
      setEvents((prev) => [...prev, newEvent]);
      setSelectedEventId(newEvent.id);
    } else if (formMode === "edit" && formState.id) {
      setEvents((prev) =>
        prev.map((eventItem) =>
          eventItem.id === formState.id
            ? {
                ...eventItem,
                title: formState.title,
                date: formState.date,
                location: formState.location,
                category: formState.category,
                mode: formState.mode,
                status: formState.status,
                volunteersNeeded: formState.volunteersNeeded,
                volunteersConfirmed: formState.volunteersConfirmed,
                volunteersWaitlist: formState.volunteersWaitlist,
                description: formState.description,
                teamLead: formState.teamLead,
                schedule: sanitizedSchedule,
                updatedAt: new Date().toISOString(),
              }
            : eventItem,
        ),
      );
    }
    setIsFormOpen(false);
  };

  const totalParticipants = selectedEvent?.participants.length ?? 0;
  const approvedParticipants = selectedEvent?.participants.filter((p) => p.status === "Onaylandı").length ?? 0;
  const pendingParticipants = selectedEvent?.participants.filter((p) => p.status === "Beklemede").length ?? 0;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Etkinlik Yönetimi
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">Program akışını planla ve optimize et</h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <button
              type="button"
              onClick={handleOpenCreate}
              className="rounded-full bg-gray-900 px-5 py-2 font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Yeni Etkinlik Ekle
            </button>
            {selectedEvent && (
              <button
                type="button"
                onClick={() => handleOpenEdit(selectedEvent)}
                className="rounded-full border border-gray-200 px-5 py-2 font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
              >
                Seçili Etkinliği Düzenle
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 text-sm text-gray-500 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Aktif</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{stats.activeEvents}</p>
            <p>yayında</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Taslak</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{stats.drafts}</p>
            <p>yayına hazır</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Onaylı Gönüllü</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{stats.confirmed}</p>
            <p>toplam</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Bekleyen Başvuru</p>
            <p className="mt-2 text-2xl font-semibold text-amber-500">{stats.pendingApprovals}</p>
            <p>takip edilmeli</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {events.map((event) => (
            <article
              key={event.id}
              className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-emerald-50 transition hover:-translate-y-0.5 hover:shadow-xl ${
                event.id === selectedEventId ? "ring-2 ring-emerald-200" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                    {formatDate(event.date)} · {event.location} · {event.mode}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-gray-900">{event.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{event.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-gray-500">
                    <span className="rounded-full bg-gray-100 px-3 py-1">{event.category}</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1">Takım: {event.teamLead}</span>
                  </div>
                  {event.schedule.length > 0 && (
                    <div className="mt-4 space-y-2 text-xs text-gray-600">
                      {event.schedule.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
                            {item.time}
                          </span>
                          <span className="flex-1">{item.activity}</span>
                        </div>
                      ))}
                      {event.schedule.length > 3 && (
                        <p className="text-xs text-gray-400">
                          +{event.schedule.length - 3} adım daha
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 text-right text-sm text-gray-500">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600">
                    {event.status}
                  </span>
                  <span className="text-gray-400">
                    {event.volunteersConfirmed}/{event.volunteersNeeded} gönüllü
                  </span>
                  <span className="text-xs text-gray-400">Güncelleme: {formatRelativeTime(event.updatedAt)}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectEvent(event.id)}
                    className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
                  >
                    Katılımcıları Gör
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusAdvance(event.id)}
                    className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
                  >
                    Durumu Değiştir
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicateEvent(event)}
                    className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
                  >
                    Kopyala
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
                >
                  Sil
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-6">
          {isFormOpen && (
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-emerald-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                    {formMode === "create" ? "Yeni Etkinlik" : "Etkinliği Düzenle"}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    {formMode === "create" ? "Planı oluştur" : "Detayları güncelle"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-full border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-500 transition hover:border-emerald-300 hover:text-emerald-600"
                >
                  Kapat
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4 text-sm text-gray-600">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Başlık</label>
                  <input
                    value={formState.title}
                    onChange={(event) => handleFormChange("title", event.target.value)}
                    required
                    placeholder="Etkinlik başlığı"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Tarih</label>
                    <input
                      type="date"
                      value={formState.date}
                      onChange={(event) => handleFormChange("date", event.target.value)}
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Lokasyon</label>
                    <input
                      value={formState.location}
                      onChange={(event) => handleFormChange("location", event.target.value)}
                      required
                      placeholder="Şehir veya dijital platform"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Kategori</label>
                    <select
                      value={formState.category}
                      onChange={(event) => handleFormChange("category", event.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    >
                      {["Çevre", "Eğitim", "Sağlık", "Sosyal Sorumluluk", "Acil Durum", "Kültür"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Katılım</label>
                    <select
                      value={formState.mode}
                      onChange={(event) => handleFormChange("mode", event.target.value as OrganizerEvent["mode"])}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    >
                      {["Yerinde", "Online", "Hibrit"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Durum</label>
                    <select
                      value={formState.status}
                      onChange={(event) => handleFormChange("status", event.target.value as OrganizerEventStatus)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    >
                      {["Taslak", "Yayında", "Tamamlandı"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Kontenjan</label>
                    <input
                      type="number"
                      min={0}
                      value={formState.volunteersNeeded}
                      onChange={(event) => handleFormChange("volunteersNeeded", Number(event.target.value))}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Onaylı</label>
                    <input
                      type="number"
                      min={0}
                      value={formState.volunteersConfirmed}
                      onChange={(event) => handleFormChange("volunteersConfirmed", Number(event.target.value))}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Bekleme</label>
                    <input
                      type="number"
                      min={0}
                      value={formState.volunteersWaitlist}
                      onChange={(event) => handleFormChange("volunteersWaitlist", Number(event.target.value))}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Sorumlu Lider</label>
                  <input
                    value={formState.teamLead}
                    onChange={(event) => handleFormChange("teamLead", event.target.value)}
                    placeholder="Takım lideri"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Açıklama</label>
                  <textarea
                    value={formState.description}
                    onChange={(event) => handleFormChange("description", event.target.value)}
                    rows={4}
                    placeholder="Etkinlik süreci, görevler ve özel notlar"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                      Program Akışı
                    </label>
                    <button
                      type="button"
                      onClick={handleAddScheduleItem}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600"
                    >
                      Adım ekle
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formState.schedule.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 md:flex-row md:items-start"
                      >
                        <div className="md:w-32">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                            Zaman
                          </label>
                          <input
                            value={item.time}
                            onChange={(event) => handleScheduleItemChange(index, "time", event.target.value)}
                            placeholder="Örn. 09:30"
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                            Aktivite
                          </label>
                          <textarea
                            value={item.activity}
                            onChange={(event) => handleScheduleItemChange(index, "activity", event.target.value)}
                            rows={2}
                            placeholder="Bu zaman diliminde yapılacak adımı yaz"
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                        {formState.schedule.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveScheduleItem(index)}
                            className="self-start rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:text-red-600"
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  {formMode === "create" ? "Etkinliği Oluştur" : "Değişiklikleri Kaydet"}
                </button>
              </form>
            </div>
          )}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-emerald-50">
            {selectedEvent ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                      Katılımcı Listesi
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-sm text-gray-500">{selectedEvent.location} · {formatDate(selectedEvent.date)}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                    <p className="font-semibold text-gray-900">{totalParticipants} kişi</p>
                    <p className="text-xs text-gray-400">Onaylı: {approvedParticipants} · Beklemede: {pendingParticipants}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedEvent.schedule.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                        Program Akışı
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        {selectedEvent.schedule.map((item) => (
                          <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                            <span className="mt-0.5 inline-flex min-w-[64px] items-center justify-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                              {item.time}
                            </span>
                            <span className="flex-1 text-gray-600">{item.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEvent.participants.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-500">
                      Henüz başvuru yok. Etkinliği paylaşarak gönüllüleri davet edebilirsin.
                    </div>
                  )}

                  {selectedEvent.participants.map((participant: OrganizerParticipant) => (
                    <div
                      key={participant.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{participant.name}</p>
                        <p className="text-xs text-gray-500">{participant.email}</p>
                        <p className="text-xs text-gray-400">Başvuru: {formatDate(participant.appliedAt)}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 font-semibold ${
                            participant.status === "Onaylandı"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                              : participant.status === "Beklemede"
                                ? "border-amber-200 bg-amber-50 text-amber-600"
                                : "border-red-200 bg-red-50 text-red-600"
                          }`}
                        >
                          {participant.status}
                        </span>
                        {participant.note && <p className="mt-2 text-gray-400">{participant.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
                Katılımcıları görüntülemek için bir etkinlik seç.
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
