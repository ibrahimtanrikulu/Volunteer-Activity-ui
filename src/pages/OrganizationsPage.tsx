import { useMemo, useState } from "react";
import { ORGANIZATIONS } from "../data/organizations";
import type { Organization, OrganizationMembershipStatus } from "../types/organization";

type MembershipState = Record<number, OrganizationMembershipStatus>;

const INITIAL_MEMBERSHIP: MembershipState = ORGANIZATIONS.reduce((acc, org) => {
  acc[org.id] = "None";
  return acc;
}, {} as MembershipState);

export default function OrganizationsPage() {
  const [membership, setMembership] = useState<MembershipState>(INITIAL_MEMBERSHIP);
  const [feedback, setFeedback] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalVolunteers = ORGANIZATIONS.reduce((total, org) => total + org.volunteerCount, 0);
    const totalPrograms = ORGANIZATIONS.reduce((total, org) => total + org.activePrograms, 0);
    return {
      totalOrganizations: ORGANIZATIONS.length,
      totalVolunteers,
      totalPrograms,
    };
  }, []);

  const handleJoin = (organization: Organization) => {
    setMembership((prev) => {
      const current = prev[organization.id];
      if (current === "None" || current === "Passive") {
        setFeedback(`${organization.name} için katılım talebin iletildi.`);
        return { ...prev, [organization.id]: "Pending" };
      }
      if (current === "Pending") {
        setFeedback(`${organization.name} için bekleyen talebin iptal edildi.`);
        return { ...prev, [organization.id]: "None" };
      }
      if (current === "Active") {
        setFeedback(`${organization.name} organizasyonundan ayrıldın.`);
        return { ...prev, [organization.id]: "None" };
      }
      return prev;
    });
  };

  const getActionLabel = (status: OrganizationMembershipStatus) => {
    switch (status) {
      case "None":
        return "Katıl";
      case "Pending":
        return "Talebi iptal et";
      case "Active":
        return "Organizasyondan ayrıl";
      case "Passive":
        return "Tekrar katıl";
      default:
        return "Katıl";
    }
  };

  const getStatusBadge = (status: OrganizationMembershipStatus) => {
    switch (status) {
      case "Active":
        return "border-emerald-200 bg-emerald-50 text-emerald-600";
      case "Pending":
        return "border-amber-200 bg-amber-50 text-amber-600";
      case "Passive":
        return "border-gray-200 bg-gray-50 text-gray-500";
      default:
        return "border-gray-200 bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="space-y-10">
      <header className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-10 text-white shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">Kolektifler</p>
          <h1 className="text-4xl font-semibold leading-tight">
            Etki yaratan organizasyonlara katıl, projeleri içeriden şekillendir.
          </h1>
          <p className="text-sm text-white/80">
            Gönüllü deneyimini derinleştirmek için aktif organizasyonlara katılabilir, yeni ekiplerle tanışabilir
            ve toplulukların ihtiyaçlarına hızlıca cevap verebilirsin.
          </p>
        </div>

        <dl className="mt-8 grid gap-5 text-sm text-white/80 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Organizasyon
            </dt>
            <dd className="mt-2 text-2xl font-semibold text-white">{stats.totalOrganizations}</dd>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Aktif Program
            </dt>
            <dd className="mt-2 text-2xl font-semibold text-white">{stats.totalPrograms}</dd>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Gönüllü
            </dt>
            <dd className="mt-2 text-2xl font-semibold text-white">{stats.totalVolunteers}</dd>
          </div>
        </dl>
      </header>

      {feedback && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {feedback}
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {ORGANIZATIONS.map((organization) => {
          const status = membership[organization.id];
          return (
            <article
              key={organization.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-emerald-50 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {organization.logo ? (
                    <img
                      src={organization.logo}
                      alt={organization.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      {organization.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{organization.name}</h2>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{organization.city}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{organization.mission}</p>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-500">
                  {organization.focusAreas.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-3 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{organization.activePrograms}</p>
                    <p>Program</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{organization.volunteerCount}</p>
                    <p>Gönüllü</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{organization.impactScore}</p>
                    <p>Etki Puanı</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(status)}`}>
                  {status === "None" && "Üyelik yok"}
                  {status === "Pending" && "Onay bekliyor"}
                  {status === "Active" && "Üyesin"}
                  {status === "Passive" && "Pasif"}
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => handleJoin(organization)}
                    className={`rounded-full px-5 py-2 font-semibold transition ${
                      status === "Active"
                        ? "border border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                        : status === "Pending"
                          ? "border border-amber-200 text-amber-600 hover:border-amber-300 hover:bg-amber-50"
                          : "border border-emerald-200 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {getActionLabel(status)}
                  </button>
                  {organization.website && (
                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 font-semibold text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600"
                    >
                      Siteyi ziyaret et
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

