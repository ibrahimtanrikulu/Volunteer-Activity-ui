import { useForm, type SubmitHandler } from "react-hook-form";
import Text from "../components/Form/Text"; // senin Text component

// Input'lardan gelecek ham tipler (hepsi string; file hariç)
type RawFormValues = {
  title: string;
  description: string;
  date: string;     // YYYY-MM-DD
  time: string;     // HH:mm
  city: string;
  place?: string;
  capacity: string; // number'ı kendimiz parse edeceğiz
  category: string;
  cover?: FileList;
};

export default function CreateEventPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RawFormValues>({
    // resolver YOK
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      city: "",
      place: "",
      capacity: "10",
      category: "",
    },
  });

  const onSubmit: SubmitHandler<RawFormValues> = async (raw) => {
    // capacity'yi number'a çevir
    const capacity = Number(raw.capacity);
    if (!Number.isFinite(capacity) || capacity < 1) {
      alert("Kapasite sayısal ve en az 1 olmalı.");
      return;
    }

    const coverFile = raw.cover?.[0] ?? null;
    const starts_at =
      raw.date && raw.time ? new Date(`${raw.date}T${raw.time}:00`).toISOString() : null;

    const payload = {
      title: raw.title.trim(),
      description: raw.description.trim(),
      city: raw.city,
      place: raw.place?.trim() || null,
      capacity,
      category: raw.category,
      starts_at,
      cover_name: coverFile?.name ?? null, // API yok, sadece bilgi
    };

    console.log("CreateEvent payload (no-zod):", payload);
    alert("Etkinlik oluşturma (dummy) — payload konsolda.");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-6">Yeni Etkinlik Oluştur</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Text
          label="Başlık"
          placeholder="Ör. Kıyı Temizliği"
          error={errors.title?.message}
          {...register("title", {
            required: "Başlık gerekli",
            minLength: { value: 3, message: "En az 3 karakter olmalı" },
          })}
        />

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Açıklama</span>
          <textarea
            rows={4}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            placeholder="Etkinliğin amacı, toplanma noktası vb."
            {...register("description", {
              required: "Açıklama gerekli",
              minLength: { value: 10, message: "En az 10 karakter olmalı" },
            })}
          />
          {errors.description && (
            <span className="text-xs text-red-600">{errors.description.message}</span>
          )}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text
            label="Tarih"
            type="date"
            error={errors.date?.message}
            {...register("date", { required: "Tarih gerekli" })}
          />
          <Text
            label="Saat"
            type="time"
            error={errors.time?.message}
            {...register("time", { required: "Saat gerekli" })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Şehir</span>
            <select
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              defaultValue=""
              {...register("city", { required: "Şehir gerekli" })}
            >
              <option value="" disabled>Seçiniz</option>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
            </select>
            {errors.city && (
              <span className="text-xs text-red-600">{errors.city.message}</span>
            )}
          </label>

          <Text
            label="Yer (opsiyonel)"
            placeholder="Ör. Caddebostan Sahil"
            {...register("place")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Text
            label="Kapasite"
            type="number"
            min={1}
            error={errors.capacity?.message}
            {...register("capacity", {
              required: "Kapasite gerekli",
              validate: (v) =>
                Number(v) >= 1 || "Kapasite en az 1 olmalı",
            })}
          />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Kategori</span>
            <select
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              defaultValue=""
              {...register("category", { required: "Kategori gerekli" })}
            >
              <option value="" disabled>Seçiniz</option>
              <option value="Çevre">Çevre</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Eğitim">Eğitim</option>
              <option value="Sosyal">Sosyal</option>
            </select>
            {errors.category && (
              <span className="text-xs text-red-600">{errors.category.message}</span>
            )}
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Etkinlik Görseli (opsiyonel)</span>
          <input type="file" accept="image/*" {...register("cover")} />
        </label>

        <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
          <div><strong>Tarih:</strong> {watch("date") || "-"} / <strong>Saat:</strong> {watch("time") || "-"}</div>
          <div><strong>Şehir:</strong> {watch("city") || "-"}</div>
          <div><strong>Kategori:</strong> {watch("category") || "-"}</div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-indigo-600 text-white px-4 py-2 font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Kaydediliyor..." : "Etkinliği Kaydet"}
        </button>
      </form>
    </div>
  );
}