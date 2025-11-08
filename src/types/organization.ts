export type OrganizationTag =
  | "Çevre"
  | "Eğitim"
  | "Sağlık"
  | "Teknoloji"
  | "Topluluk"
  | "Acil Durum"
  | "Kültür"
  | "Sosyal Girişim";

export type OrganizationMembershipStatus = "None" | "Pending" | "Active" | "Passive";

export type OrganizationMember = {
  id: number;
  name: string;
  email: string;
  role: "Kurucu" | "Yönetici" | "Koordinatör" | "Gönüllü";
  status: Exclude<OrganizationMembershipStatus, "None">;
  joinedAt: string;
};

export type Organization = {
  id: number;
  name: string;
  mission: string;
  focusAreas: OrganizationTag[];
  city: string;
  logo?: string;
  website?: string;
  email: string;
  impactScore: number;
  activePrograms: number;
  volunteerCount: number;
  members: OrganizationMember[];
};

