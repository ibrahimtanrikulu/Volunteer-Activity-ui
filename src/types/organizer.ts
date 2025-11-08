import type { EventMode } from "./home";

export type OrganizerParticipantStatus = "Onaylandı" | "Beklemede" | "Reddedildi";

export type OrganizerParticipant = {
  id: number;
  name: string;
  email: string;
  phone: string;
  appliedAt: string;
  status: OrganizerParticipantStatus;
  note?: string;
};

export type OrganizerEventStatus = "Taslak" | "Yayında" | "Tamamlandı";

export type OrganizerScheduleItem = {
  id: number;
  time: string;
  activity: string;
};

export type OrganizerEvent = {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  mode: EventMode;
  status: OrganizerEventStatus;
  volunteersNeeded: number;
  volunteersConfirmed: number;
  volunteersWaitlist: number;
  description: string;
  teamLead: string;
  updatedAt: string;
  schedule: OrganizerScheduleItem[];
  participants: OrganizerParticipant[];
};
