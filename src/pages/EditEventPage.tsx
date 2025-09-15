import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import Text from "../components/Form/Text";

// Aynı dummy veriyi burada da tanımladım (gerçekte API'den gelecek)
type EventItem = {
  id: number;
  title: string;
  date: string;   // ISO
  city: string;
  place?: string;
  capacity: number;
  joined: number;
  category?: string;
  description?: string;
  cover?: string;
};

const DUMMY: EventItem[] = [
  {
    id: 1,
    title: "Sahil Temizliği",
    date: "2025-09-20T10:00:00",
    city: "İstanbul",
    place: "Kadıköy Caddebostan",
    capacity: 30,
    joined: 18,
    category: "Çevre",
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
    category: "Çevre",
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
    category: "Sağlık",
    description: "Kan ver, hayat kurtar! Türk Kızılay iş birliği ile düzenleniyor.",
  },
];

// RHF ham tipleri (input'tan gelen)
type RawFormValues = {
  title: string;
  description: string;
  date: string;     // YYYY-MM-DD
  time: string;     // HH:mm
  city: string;
  place?: string;
  capacity: string; // number'ı biz parse edeceğiz
  category: string;
  cover?: FileList;
};

function toDateInputValue(iso: string) {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function toTimeInputValue(iso: string) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mi}`;
}

export default function EditEventPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const event = DUMMY.find((e) => e.id === Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RawFormValues>({
    defaultValues: event
      ? {
        title: event.title,
        description: event.description ?? "",
        date: toDateInputValue(event.date),
        time: toTimeInputValue(event.date),
        city: event.city,
        place: event.place ?? "",
        capacity: String(event.capacity),
        category: event.category ?? "",
      }
      : undefined,
  });

  if (!event) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 text-center space-y-3">
        <p className="text-lg font-semibold">Etkinlik bulunamadı.</p>
        <Link className="text-indigo-600 underline" to="/events">
          Etkinlik listesine dön
        </Link>
      </div>
    );
  }

  const onSubmit: SubmitHandler<RawFormValues> = async (raw) => {
    const capacity = Number(raw.capacity);
    if (!Number.isFinite(capacity) || capacity < 1) {
      alert("Kapasite sayısal ve en az 1 olmalı.");
      return;
    }

    const coverFile = raw.cover?.[0] ?? null;
    const starts_at =
      raw.date && raw.time ? new Date(`${raw.date}T${raw.time}:00`).toISOString() : null;

    const payload = {
      id: event.id,
      title: raw.title.trim(),
      description: raw.description.trim(),
      city: raw.city,
      place: raw.place?.trim() || null,
      capacity,
      category: raw.category,
      starts_at,
      cover_name: coverFile?.name ?? null,
    };

    console.log("EditEvent payload (dummy):", payload);
    alert("Etkinlik güncellendi (dummy) — payload konsolda.");
    // İstersen detaya dön:
    nav(`/events/${event.id}`);
    reset(raw);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Etkinliği Düzenle</h1>
        <Link to={`/events/${event.id}`} className="text-sm text-indigo-600 underline">
          Detaya dön
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Text
          label="Başlık"
          placeholder="Ör. Kıyı Temizliği"
          error={errors.title?.message}
          {...register("title", { required: "Başlık gerekli", minLength: { value: 3, message: "En az 3 karakter" } })}
        />

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Açıklama</span>
          <textarea
            rows={4}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            placeholder="Etkinliğin amacı, toplanma noktası vb."
            {...register("description", { required: "Açıklama gerekli", minLength: { value: 10, message: "En az 10 karakter" } })}
          />
          {errors.description && <span className="text-xs text-red-600">{errors.description.message}</span>}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text label="Tarih" type="date" error={errors.date?.message} {...register("date", { required: "Tarih gerekli" })} />
          <Text label="Saat" type="time" error={errors.time?.message} {...register("time", { required: "Saat gerekli" })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Şehir</span>
            <select
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              defaultValue={event.city}
              {...register("city", { required: "Şehir gerekli" })}
            >
              <option value="" disabled>Seçiniz</option>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
            </select>
            {errors.city && <span className="text-xs text-red-600">{errors.city.message}</span>}
          </label>

          <Text label="Yer (opsiyonel)" placeholder="Ör. Caddebostan Sahil" {...register("place")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text
            label="Kapasite"
            type="number"
            min={1}
            error={errors.capacity?.message}
            {...register("capacity", {
              required: "Kapasite gerekli",
              validate: (v) => Number(v) >= 1 || "Kapasite en az 1 olmalı",
            })}
          />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Kategori</span>
            <select
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              defaultValue={event.category ?? ""}
              {...register("category", { required: "Kategori gerekli" })}
            >
              <option value="" disabled>Seçiniz</option>
              <option value="Çevre">Çevre</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Eğitim">Eğitim</option>
              <option value="Sosyal">Sosyal</option>
            </select>
            {errors.category && <span className="text-xs text-red-600">{errors.category.message}</span>}
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Etkinlik Görseli (opsiyonel)</span>
          <input type="file" accept="image/*" {...register("cover")} />
        </label>

        {/* Küçük özet */}
        <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
          <div><strong>Tarih:</strong> {watch("date") || "-"} / <strong>Saat:</strong> {watch("time") || "-"}</div>
          <div><strong>Şehir:</strong> {watch("city") || "-"}</div>
          <div><strong>Kategori:</strong> {watch("category") || "-"}</div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 text-white px-4 py-2 font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </button>
          <Link
            to={`/events/${event.id}`}
            className="rounded-md border px-4 py-2 font-medium text-gray-700 bg-white"
          >
            Vazgeç
          </Link>
        </div>
      </form>
    </div>
  );
}