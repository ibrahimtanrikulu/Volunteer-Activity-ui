export type EventMode = "Yerinde" | "Online" | "Hibrit";

export type EventCard = {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  volunteersNeeded: number;
  organization: string;
  description: string;
  tags: string[];
  mode: EventMode;
};

export type EventScheduleItem = {
  time: string;
  activity: string;
};

export type EventContact = {
  name: string;
  email: string;
  phone: string;
};

export type VolunteerEventDetail = EventCard & {
  summary: string;
  objectives: string[];
  schedule: EventScheduleItem[];
  requirements: string[];
  benefits: string[];
  applicationEndDate: string;
  contact: EventContact;
  locationDetails: string;
  mapUrl?: string;
  heroImage?: string;
};

export type DateFilter = "any" | "week" | "month" | "quarter";

export type ModeFilter = "all" | EventMode;

export type SortOption = "date" | "volunteers" | "recent";

export type Filters = {
  search: string;
  location: string;
  categories: string[];
  dateRange: DateFilter;
  minVolunteers: number;
  mode: ModeFilter;
  organization: string;
  tags: string[];
  sortBy: SortOption;
};

export type FilterChangeHandler = <K extends keyof Filters>(
  key: K,
  value: Filters[K],
) => void;
