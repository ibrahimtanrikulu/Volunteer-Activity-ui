import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type RegisterFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  interests: string[];
  communication: boolean;
  createOrganization: boolean;
  organizationName: string;
  organizationEmail: string;
  organizationWebsite: string;
  organizationMission: string;
};

const INTEREST_OPTIONS = [
  "Çevre",
  "Eğitim",
  "Sağlık",
  "Acil Durum",
  "Teknoloji",
  "Topluluk",
];

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    interests: ["Çevre"],
    communication: true,
    createOrganization: false,
    organizationName: "",
    organizationEmail: "",
    organizationWebsite: "",
    organizationMission: "",
  });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleFieldChange = <K extends keyof RegisterFormState>(
    field: K,
    value: RegisterFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setStatus("idle");
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interest);
      const interests = exists
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
    setStatus("idle");
  };

  const handleToggleOrganization = (value: boolean) => {
    setForm((prev) => ({
      ...prev,
      createOrganization: value,
      organizationName: value ? prev.organizationName : "",
      organizationEmail: value ? prev.organizationEmail : "",
      organizationWebsite: value ? prev.organizationWebsite : "",
      organizationMission: value ? prev.organizationMission : "",
    }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("success");
  };

  const successMessage = form.createOrganization
    ? "Kaydın ve organizasyon taslağın alındı. Seni ekibini davet edebileceğin panele yönlendiriyoruz."
    : "Kaydın oluşturuldu, seni giriş sayfasına yönlendiriyoruz.";

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <aside className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-emerald-50">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
          Aramıza Katıl
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900">
          Etki odaklı topluluğa kayıt ol
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Kişisel profilini oluştur, ilgi alanlarını seç ve sana uygun
          gönüllülük deneyimlerini keşfet. Kayıt ücretsizdir ve birkaç dakikanı
          alır.
        </p>

        <div className="mt-8 space-y-5 text-sm text-gray-600">
          {["Profilini tamamla", "Tercihlerini belirle", "İlk etkinliğine başvur"].map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-500">
                {index + 1}
              </span>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{step}</p>
                <p className="text-xs text-gray-500">
                  {index === 0 && "Temel bilgilerini paylaşarak seni tanıyalım."}
                  {index === 1 && "Fark yaratmak istediğin alanları seç."}
                  {index === 2 && "Programlara başvur, katılım durumunu takip et."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-emerald-50">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Kayıt Formu
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">
              Kişisel Bilgiler
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                Ad
              </label>
              <input
                value={form.firstName}
                onChange={(event) => handleFieldChange("firstName", event.target.value)}
                required
                placeholder="Adın"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                Soyad
              </label>
              <input
                value={form.lastName}
                onChange={(event) => handleFieldChange("lastName", event.target.value)}
                required
                placeholder="Soyadın"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                E-POSTA
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleFieldChange("email", event.target.value)}
                required
                placeholder="ornek@eposta.com"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                Telefon (Opsiyonel)
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => handleFieldChange("phone", event.target.value)}
                placeholder="05xx xxx xx xx"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                ŞİFRE
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(event) => handleFieldChange("password", event.target.value)}
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                ŞİFRE TEKRARI
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) => handleFieldChange("confirmPassword", event.target.value)}
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Organizasyon Bilgisi
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Kendi ekibini de hızlıca içeri almak istersen, kayıt sırasında yeni bir organizasyon aç.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                <input
                  type="checkbox"
                  checked={form.createOrganization}
                  onChange={(event) => handleToggleOrganization(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400"
                />
                <span>Organizasyon oluştur</span>
              </label>
            </div>

            {form.createOrganization && (
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                      Organizasyon Adı
                    </label>
                    <input
                      value={form.organizationName}
                      onChange={(event) => handleFieldChange("organizationName", event.target.value)}
                      required
                      placeholder="Örn. Yeni Etki Derneği"
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                      İletişim E-postası
                    </label>
                    <input
                      type="email"
                      value={form.organizationEmail}
                      onChange={(event) => handleFieldChange("organizationEmail", event.target.value)}
                      placeholder="iletisim@organizasyon.org"
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                      Web Sitesi (Opsiyonel)
                    </label>
                    <input
                      value={form.organizationWebsite}
                      onChange={(event) => handleFieldChange("organizationWebsite", event.target.value)}
                      placeholder="https://"
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                      Kısa Tanım
                    </label>
                    <textarea
                      value={form.organizationMission}
                      onChange={(event) => handleFieldChange("organizationMission", event.target.value)}
                      rows={3}
                      placeholder="Organizasyonunun amacı ve odaklandığı alanlar"
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
              İlgi Alanların
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
              {INTEREST_OPTIONS.map((interest) => {
                const active = form.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full border px-4 py-1.5 transition ${
                      active
                        ? "border-transparent bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.communication}
              onChange={(event) => handleFieldChange("communication", event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400"
            />
            <span>
              Impact Collective tarafından e-posta ile bilgilendirme almak
              istiyorum. Dilediğin zaman tercihlerini güncelleyebilirsin.
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
          >
            Kaydımı Oluştur
          </button>

          <p className="text-center text-sm text-gray-500">
            Zaten hesabın var mı?{" "}
            <Link to="/login" className="font-semibold text-emerald-500 transition hover:text-emerald-600">
              Giriş yap
            </Link>
          </p>

          {status === "success" && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
