import { useMemo, useState } from "react";
import { ORGANIZATIONS } from "../data/organizations";
import type { Organization, OrganizationMember } from "../types/organization";

type ManagedOrganization = Organization & { members: OrganizationMember[] };

const cloneOrganizations = (): ManagedOrganization[] =>
  ORGANIZATIONS.map((org) => ({
    ...org,
    members: org.members.map((member) => ({ ...member })),
  }));

export default function OrganizerMembershipsPage() {
  const [organizations, setOrganizations] = useState<ManagedOrganization[]>(() => cloneOrganizations());
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<number>(organizations[0]?.id ?? 0);
  const [toast, setToast] = useState<string | null>(null);

  const selectedOrganization = useMemo(
    () => organizations.find((org) => org.id === selectedOrganizationId),
    [organizations, selectedOrganizationId],
  );

  const pendingMembers = selectedOrganization?.members.filter((member) => member.status === "Pending") ?? [];
  const activeMembers = selectedOrganization?.members.filter((member) => member.status !== "Pending") ?? [];

  const updateToast = (message: string) => {
    setToast(message);
    window.clearTimeout((updateToast as unknown as { timeout?: number }).timeout);
    (updateToast as unknown as { timeout?: number }).timeout = window.setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const updateMember = (
    organizationId: number,
    memberId: number,
    updater: (member: OrganizationMember) => OrganizationMember | null,
  ) => {
    setOrganizations((prev) =>
      prev.map((organization) => {
        if (organization.id !== organizationId) return organization;
        const members = organization.members
          .map((member) => {
            if (member.id !== memberId) return member;
            return updater(member);
          })
          .filter((member): member is OrganizationMember => member !== null);
        return { ...organization, members };
      }),
    );
  };

  const handleApprove = (member: OrganizationMember) => {
    updateMember(selectedOrganizationId, member.id, (current) => ({ ...current, status: "Active" }));
    updateToast(`${member.name} kabul edildi.`);
  };

  const handleReject = (member: OrganizationMember) => {
    updateMember(selectedOrganizationId, member.id, () => null);
    updateToast(`${member.name} talebi reddedildi.`);
  };

  const handleMarkPassive = (member: OrganizationMember) => {
    const nextStatus = member.status === "Passive" ? "Active" : "Passive";
    updateMember(selectedOrganizationId, member.id, (current) => ({ ...current, status: nextStatus }));
    updateToast(
      nextStatus === "Passive"
        ? `${member.name} pasif duruma alındı.`
        : `${member.name} tekrar aktifleştirildi.`,
    );
  };

  const handleRemove = (member: OrganizationMember) => {
    updateMember(selectedOrganizationId, member.id, () => null);
    updateToast(`${member.name} ekipten çıkarıldı.`);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-emerald-50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Organizasyon Üyelikleri
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">
              Başvuruları yönet, ekip rollerini güncelle
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-gray-500">
              Onay bekleyen başvuruları değerlendir, aktif gönüllüleri pasif duruma al ya da ekipten çıkar. Tüm
              değişiklikler üyelerle otomatik olarak paylaşılır.
            </p>
          </div>
          <select
            value={selectedOrganizationId}
            onChange={(event) => setSelectedOrganizationId(Number(event.target.value))}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 focus:border-emerald-400 focus:outline-none"
          >
            {organizations.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {toast && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {toast}
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-emerald-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                Bekleyen Başvurular
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">Onay sırası sende</h2>
            </div>
            <span className="rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold text-amber-600">
              {pendingMembers.length} başvuru
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {pendingMembers.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-6 text-sm text-gray-500">
                Şu anda bekleyen başvuru yok. Organizasyon sayfandan davet linki paylaşarak gönüllüleri davet
                edebilirsin.
              </div>
            )}

            {pendingMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                  <p className="text-xs text-gray-400">Talep edilen rol: {member.role}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleApprove(member)}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-emerald-600 transition hover:border-emerald-300 hover:bg-emerald-100"
                  >
                    Onayla
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(member)}
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-1 text-red-600 transition hover:border-red-300 hover:bg-red-100"
                  >
                    Reddet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-emerald-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                Ekip Üyeleri
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">Rol ve durumları yönet</h2>
            </div>
            <span className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-500">
              {activeMembers.length} kişi
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {activeMembers.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-6 text-sm text-gray-500">
                Henüz aktif bir üyen yok. Onayladığın üyeler burada listelenir.
              </div>
            )}

            {activeMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                  <p className="text-xs text-gray-400">Rol: {member.role}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleMarkPassive(member)}
                    className={`rounded-full border px-4 py-1 transition ${
                      member.status === "Passive"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-100"
                        : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                  >
                    {member.status === "Passive" ? "Aktife al" : "Pasif yap"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(member)}
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-1 text-red-600 transition hover:border-red-300 hover:bg-red-100"
                  >
                    Ekipten çıkar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

