import { useState } from "react";

type OrganizationProfile = {
  name: string;
  mission: string;
  website: string;
  phone: string;
  email: string;
  headquarters: string;
  focusAreas: string[];
};

type NotificationPreferences = {
  newApplications: boolean;
  reminders: boolean;
  weeklyDigest: boolean;
  criticalAlerts: boolean;
};

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "Sahip" | "Yönetici" | "Koordinatör" | "Destek";
  joinedAt: string;
  status: "Aktif" | "Beklemede";
};

const ROLE_FLOW: TeamMember["role"][] = ["Sahip", "Yönetici", "Koordinatör", "Destek"];

export default function OrganizerSettingsPage() {
  const [profile, setProfile] = useState<OrganizationProfile>(
    () => ({
      name: "Impact Collective",
      mission:
        "Türkiye genelinde gönüllü katılımını artırmak, etkin operasyonları desteklemek ve topluluklar arasında dayanışma kültürü oluşturmak.",
      website: "https://impactcollective.org",
      phone: "+90 212 555 22 00",
      email: "iletisim@impactcollective.org",
      headquarters: "İstanbul, Türkiye",
      focusAreas: ["Çevre", "Eğitim", "Acil Durum"],
    }),
  );

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    newApplications: true,
    reminders: true,
    weeklyDigest: true,
    criticalAlerts: true,
  });

  const [team, setTeam] = useState<TeamMember[]>(() => [
    {
      id: 1,
      name: "Zeynep Aksoy",
      email: "zeynep.aksoy@impactcollective.org",
      role: "Sahip",
      joinedAt: "2022-04-12",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Mert Demir",
      email: "mert.demir@impactcollective.org",
      role: "Yönetici",
      joinedAt: "2023-01-05",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Ayşe Bilgin",
      email: "ayse.bilgin@impactcollective.org",
      role: "Koordinatör",
      joinedAt: "2023-08-17",
      status: "Aktif",
    },
    {
      id: 4,
      name: "Hande Gür",
      email: "hande.gur@impactcollective.org",
      role: "Destek",
      joinedAt: "2024-02-11",
      status: "Beklemede",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Koordinatör");
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");

  const toggleFocusArea = (area: string) => {
    setProfile((prev) => {
      const exists = prev.focusAreas.includes(area);
      return {
        ...prev,
        focusAreas: exists
          ? prev.focusAreas.filter((item) => item !== area)
          : [...prev.focusAreas, area],
      };
    });
    setSaveState("idle");
  };

  const handleProfileChange = <K extends keyof OrganizationProfile>(field: K, value: OrganizationProfile[K]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaveState("idle");
  };

  const handlePreferencesChange = <K extends keyof NotificationPreferences>(
    field: K,
    value: NotificationPreferences[K],
  ) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
    setSaveState("idle");
  };

  const handleCycleRole = (memberId: number) => {
    setTeam((prev) =>
      prev.map((member) => {
        if (member.id !== memberId) return member;
        const currentIndex = ROLE_FLOW.indexOf(member.role);
        const nextRole = ROLE_FLOW[(currentIndex + 1) % ROLE_FLOW.length];
        return { ...member, role: nextRole };
      }),
    );
    setSaveState("idle");
  };

  const handleToggleStatus = (memberId: number) => {
    setTeam((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, status: member.status === "Aktif" ? "Beklemede" : "Aktif" }
          : member,
      ),
    );
    setSaveState("idle");
  };

  const handleRemoveMember = (memberId: number) => {
    setTeam((prev) => prev.filter((member) => member.id !== memberId));
    setSaveState("idle");
  };

  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      return;
    }
    const newMember: TeamMember = {
      id: Date.now(),
      name: inviteEmail.split("@")[0] ?? "Yeni Üye",
      email: inviteEmail.trim(),
      role: inviteRole,
      joinedAt: new Date().toISOString().slice(0, 10),
      status: "Beklemede",
    };
    setTeam((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteRole("Koordinatör");
    setSaveState("idle");
  };

  const handleSaveChanges = () => {
    setSaveState("saved");
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Organizasyon Ayarları
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">
              Profilini, ekibini ve bildirimlerini yönet
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-500">
              Organizasyon bilgilerini güncel tutarak yeni etkinliklerde doğru görünürlüğü sağla, ekip üyelerine
              görevler ata ve iletişim tercihlerini özelleştir.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSaveChanges}
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
        {saveState === "saved" && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-600">
            Ayarlar kaydedildi. Güncellenen bilgiler tüm organizatörlerle paylaşıldı.
          </div>
        )}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                  Organizasyon Profili
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">Temel bilgiler</h2>
              </div>
              <span className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-500">
                Son güncelleme: 14 Haziran 2024
              </span>
            </div>

            <div className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">İsim</label>
                  <input
                    value={profile.name}
                    onChange={(event) => handleProfileChange("name", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Merkez</label>
                  <input
                    value={profile.headquarters}
                    onChange={(event) => handleProfileChange("headquarters", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Web Sitesi</label>
                  <input
                    value={profile.website}
                    onChange={(event) => handleProfileChange("website", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Telefon</label>
                  <input
                    value={profile.phone}
                    onChange={(event) => handleProfileChange("phone", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">E-posta</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(event) => handleProfileChange("email", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Odak Alanları</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Çevre", "Eğitim", "Sağlık", "Acil Durum", "Kültür", "Topluluk"].map((area) => {
                      const selected = profile.focusAreas.includes(area);
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleFocusArea(area)}
                          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                            selected
                              ? "border-transparent bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {area}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Misyon</label>
                <textarea
                  value={profile.mission}
                  onChange={(event) => handleProfileChange("mission", event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Bildirimler</p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">İletişim tercihleri</h2>
            <div className="mt-6 space-y-4 text-sm text-gray-600">
              <PreferenceToggle
                label="Yeni başvuru bildirimleri"
                description="Gönüllüler etkinliklerine başvurduğunda e-posta al"
                value={preferences.newApplications}
                onChange={(value) => handlePreferencesChange("newApplications", value)}
              />
              <PreferenceToggle
                label="Etkinlik hatırlatmaları"
                description="Etkinlikten 24 saat önce koordinatörlere özet gönder"
                value={preferences.reminders}
                onChange={(value) => handlePreferencesChange("reminders", value)}
              />
              <PreferenceToggle
                label="Haftalık etki özeti"
                description="Tüm etkinlikler için haftalık performans raporu al"
                value={preferences.weeklyDigest}
                onChange={(value) => handlePreferencesChange("weeklyDigest", value)}
              />
              <PreferenceToggle
                label="Kritik durum uyarıları"
                description="Kapsite aşımı veya düşük başvuru olduğunda SMS gönder"
                value={preferences.criticalAlerts}
                onChange={(value) => handlePreferencesChange("criticalAlerts", value)}
              />
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Ekip Yönetimi</p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">Üyeler</h2>
                <p className="mt-2 text-sm text-gray-500">Rolleri düzenle, davet gönder ve erişimleri güncelle.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                <p className="font-semibold text-gray-900">{team.length} kişi</p>
                <p className="text-xs text-gray-400">
                  Aktif {team.filter((member) => member.status === "Aktif").length}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          member.status === "Aktif"
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
                            : "border border-amber-200 bg-amber-50 text-amber-600"
                        }`}
                      >
                        {member.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCycleRole(member.id)}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600"
                      >
                        {member.role}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <span>Katılım: {new Date(member.joinedAt).toLocaleDateString("tr-TR")}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(member.id)}
                        className="rounded-full border border-gray-200 px-3 py-1 font-semibold text-gray-500 transition hover:border-emerald-300 hover:text-emerald-600"
                      >
                        Durum değiştir
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="rounded-full border border-red-200 px-3 py-1 font-semibold text-red-500 transition hover:border-red-300 hover:text-red-600"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Davet Gönder</p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">Yeni ekip üyesi ekle</h2>
            <div className="mt-6 space-y-4 text-sm text-gray-600">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">E-posta</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="isim@organizasyon.org"
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Rol</label>
                <select
                  value={inviteRole}
                  onChange={(event) => setInviteRole(event.target.value as TeamMember["role"])}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:bg-white focus:outline-none"
                >
                  {ROLE_FLOW.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleInvite}
                className="w-full rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
              >
                Davet gönder
              </button>
              <p className="text-xs text-gray-400">
                Davet edilen üyeler e-postalarına gelen bağlantı ile hesap oluşturur ve doğrulama sonrası rolüne göre erişim
                kazanır.
              </p>
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}

type PreferenceToggleProps = {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

function PreferenceToggle({ label, description, value, onChange }: PreferenceToggleProps) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
      <span>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </span>
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-9 cursor-pointer rounded-full border-gray-300 text-emerald-500 focus:ring-emerald-400"
      />
    </label>
  );
}
