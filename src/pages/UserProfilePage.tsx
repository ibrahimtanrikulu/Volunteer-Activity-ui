import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type ProfileState = {
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  bio: string;
  skills: string[];
  availability: string[];
  visibility: "public" | "private";
  emailNotifications: boolean;
  smsNotifications: boolean;
  newsletter: boolean;
};

const SKILL_OPTIONS = [
  "Etkinlik Organizasyonu",
  "Mentorluk",
  "İletişim",
  "Tasarım",
  "Teknik Destek",
  "Afet Yönetimi",
];

const AVAILABILITY_OPTIONS = [
  "Hafta içi akşam",
  "Hafta sonu",
  "Uzaktan",
  "Esnek",
];

const UPCOMING_MISSIONS = [
  {
    title: "Boğaz Çevresi Kıyı Temizliği",
    date: "22 Haziran 2024",
    role: "Koordinatör Yardımcısı",
    status: "Kayıt Onaylandı",
  },
  {
    title: "Online Türkçe Konuşma Kulübü",
    date: "28 Haziran 2024",
    role: "Oturum Kolaylaştırıcısı",
    status: "Takvimine Eklendi",
  },
];

export default function UserProfilePage() {
  const [profile, setProfile] = useState<ProfileState>({
    firstName: "Elif",
    lastName: "Kaya",
    role: "Deneyimli Gönüllü",
    location: "İstanbul",
    phone: "+90 555 410 20 20",
    email: "elif.kaya@impactcollective.org",
    bio: "Sürdürülebilirlik projelerinde aktif rol alan gönüllü mentor. Gençlerle ve topluluklarla çalışmaktan keyif alıyorum.",
    skills: ["Mentorluk", "İletişim", "Teknik Destek"],
    availability: ["Hafta içi akşam", "Uzaktan"],
    visibility: "public",
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true,
  });
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  const fullName = useMemo(
    () => `${profile.firstName} ${profile.lastName}`.trim(),
    [profile.firstName, profile.lastName],
  );

  const handleFieldChange = <K extends keyof ProfileState>(
    field: K,
    value: ProfileState[K],
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setStatus("idle");
  };

  const toggleArrayValue = (field: "skills" | "availability", value: string) => {
    setProfile((prev) => {
      const collection = prev[field];
      const exists = collection.includes(value);
      const updated = exists
        ? collection.filter((item) => item !== value)
        : [...collection, value];
      return { ...prev, [field]: updated };
    });
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saved");
  };

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-emerald-50">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-emerald-500/10 p-4 text-2xl text-emerald-600">
              {profile.firstName.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                Profil Yönetimi
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                {fullName}
              </h2>
              <p className="text-sm text-gray-500">{profile.role}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-600">
            Son güncelleme: 12 Haziran 2024
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                  Kişisel Bilgiler
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  Temel bilgileri düzenle
                </h3>
              </div>
              <Link
                to="/register"
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 transition hover:border-emerald-300 hover:text-emerald-500"
              >
                Yeni üyeyi davet et
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  Ad
                </label>
                <input
                  value={profile.firstName}
                  onChange={(event) => handleFieldChange("firstName", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  Soyad
                </label>
                <input
                  value={profile.lastName}
                  onChange={(event) => handleFieldChange("lastName", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  Rol
                </label>
                <input
                  value={profile.role}
                  onChange={(event) => handleFieldChange("role", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  Şehir
                </label>
                <input
                  value={profile.location}
                  onChange={(event) => handleFieldChange("location", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  Telefon
                </label>
                <input
                  value={profile.phone}
                  onChange={(event) => handleFieldChange("phone", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  E-Posta
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                Hakkında
              </label>
              <textarea
                value={profile.bio}
                onChange={(event) => handleFieldChange("bio", event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Yetkinlikler
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">
              Güçlü yönlerini öne çıkar
            </h3>

            <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
              {SKILL_OPTIONS.map((skill) => {
                const active = profile.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleArrayValue("skills", skill)}
                    className={`rounded-full border px-4 py-1.5 transition ${
                      active
                        ? "border-transparent bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                Uygunluk
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
                {AVAILABILITY_OPTIONS.map((option) => {
                  const active = profile.availability.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleArrayValue("availability", option)}
                      className={`rounded-full border px-4 py-1.5 transition ${
                        active
                          ? "border-transparent bg-emerald-100 text-emerald-600"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Görünürlük & Bildirimler
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">
              Tercihlerini yönet
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm text-gray-600">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Profil Görünürlüğü
                </p>
                <div className="mt-3 flex gap-2">
                  {[
                    { key: "public", label: "Topluluk ile paylaş" },
                    { key: "private", label: "Sadece ben görebilim" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleFieldChange("visibility", option.key as ProfileState["visibility"])}
                      className={`flex-1 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                        profile.visibility === option.key
                          ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <label className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <span>E-posta bildirimleri</span>
                  <input
                    type="checkbox"
                    checked={profile.emailNotifications}
                    onChange={(event) => handleFieldChange("emailNotifications", event.target.checked)}
                    className="h-5 w-9 cursor-pointer rounded-full border-gray-300 text-emerald-500 focus:ring-emerald-400"
                  />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <span>SMS bildirimleri</span>
                  <input
                    type="checkbox"
                    checked={profile.smsNotifications}
                    onChange={(event) => handleFieldChange("smsNotifications", event.target.checked)}
                    className="h-5 w-9 cursor-pointer rounded-full border-gray-300 text-emerald-500 focus:ring-emerald-400"
                  />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <span>Etki bülteni</span>
                  <input
                    type="checkbox"
                    checked={profile.newsletter}
                    onChange={(event) => handleFieldChange("newsletter", event.target.checked)}
                    className="h-5 w-9 cursor-pointer rounded-full border-gray-300 text-emerald-500 focus:ring-emerald-400"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Profili Güncelle
            </button>
            <span className="text-sm text-gray-400">
              Yapılan değişiklikler kaydedilmeden önce önizlenir.
            </span>
          </div>

          {status === "saved" && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
              Profil bilgileriniz güncellendi.
            </div>
          )}
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Gönüllü Özeti
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">
              Etki puanın yükseliyor
            </h3>

            <dl className="mt-6 grid gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                <dt>Toplam gönüllü saati</dt>
                <dd className="font-semibold text-gray-900">128 saat</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                <dt>Tamamlanan görevler</dt>
                <dd className="font-semibold text-gray-900">24 görev</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                <dt>Etkileşim puanı</dt>
                <dd className="font-semibold text-emerald-600">%86</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Yaklaşan Görevler
            </p>
            <ul className="mt-4 space-y-4 text-sm text-gray-600">
              {UPCOMING_MISSIONS.map((mission) => (
                <li
                  key={mission.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {mission.title}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    {mission.date}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">Rol: {mission.role}</p>
                  <span className="mt-3 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                    {mission.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50 p-8 text-sm text-emerald-700">
            <p className="font-semibold text-emerald-700">
              İpucu: Profilini güncel tut, yeni projeler için öneri motoru seni önceliklendirir.
            </p>
            <p className="mt-3">
              Güncel becerilerin ve uygunluk bilgilerin, koordinasyon ekibinin seni doğru görevlere yönlendirmesine yardımcı olur.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
