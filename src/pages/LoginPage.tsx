import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type LoginFormState = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
    remember: true,
  });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleFieldChange = <K extends keyof LoginFormState>(
    field: K,
    value: LoginFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("success");
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-emerald-50">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
          Tekrar Hoş Geldin
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900">
          Gönüllü hesabınla giriş yap
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Kişiselleştirilmiş etkinlik önerilerini görmek ve katılımlarını
          yönetmek için hesabına giriş yap.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
              E-POSTA
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => handleFieldChange("email", event.target.value)}
              placeholder="ornek@eposta.com"
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
              ŞİFRE
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => handleFieldChange("password", event.target.value)}
              placeholder="••••••••"
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-gray-500">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(event) => handleFieldChange("remember", event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-400"
              />
              <span>Beni hatırla</span>
            </label>
            <button type="button" className="text-sm font-semibold text-emerald-500 transition hover:text-emerald-600">
              Şifremi unuttum
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
          >
            Giriş Yap
          </button>

          <p className="text-center text-sm text-gray-500">
            Hesabın yok mu?{" "}
            <Link to="/register" className="font-semibold text-emerald-500 transition hover:text-emerald-600">
              Şimdi kaydol
            </Link>
          </p>

          {status === "success" && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
              Giriş isteğin alındı. Lütfen yönlendirmeyi bekle.
            </div>
          )}
        </form>
      </div>

      <aside className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-emerald-50">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
            Neden Giriş Yapmalısın?
          </p>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-emerald-500">✦</span>
              <span>Katıldığın etkinlikleri ve görevleri tek panelden yönet.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-emerald-500">✦</span>
              <span>Öneri motoruyla sana özel programlar keşfet.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-emerald-500">✦</span>
              <span>Topladığın etki puanlarını takip et ve rozet kazan.</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 px-6 py-5 text-sm text-emerald-600">
          Giriş yaptıktan sonra profilini güncelleyebilir, topluluk üyeleriyle
          bağlantı kurabilir ve yeni görevler için bildirim alabilirsin.
        </div>
      </aside>
    </section>
  );
}
