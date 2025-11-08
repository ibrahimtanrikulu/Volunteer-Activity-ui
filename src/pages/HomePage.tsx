import { useMemo, useState } from "react";
import { EventsSection } from "../components/home/EventsSection";
import { FiltersPanel } from "../components/home/FiltersPanel";
import { HeroSection } from "../components/home/HeroSection";
import { VOLUNTEER_EVENTS } from "../data/publicEvents";
import type {
  DateFilter,
  EventCard,
  FilterChangeHandler,
  Filters,
  SortOption,
} from "../types/home";

const EVENTS: EventCard[] = VOLUNTEER_EVENTS.map(
  ({
    id,
    title,
    date,
    location,
    category,
    image,
    volunteersNeeded,
    organization,
    description,
    tags,
    mode,
  }) => ({
    id,
    title,
    date,
    location,
    category,
    image,
    volunteersNeeded,
    organization,
    description,
    tags,
    mode,
  }),
);

const DEFAULT_LOCATION = "Tüm Şehirler";
const DEFAULT_ORGANIZATION = "Tüm Kuruluşlar";
const DEFAULT_MIN_VOLUNTEERS = 20;
const DEFAULT_SORT: SortOption = "date";

const CATEGORY_OPTIONS = [
  "Çevre",
  "Eğitim",
  "Sağlık",
  "Sosyal Sorumluluk",
  "Acil Durum",
  "Kültür",
];

const LOCATION_OPTIONS = [
  DEFAULT_LOCATION,
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Eskişehir",
  "Antalya",
  "Online",
];

const ORGANIZATION_OPTIONS = [
  DEFAULT_ORGANIZATION,
  ...Array.from(new Set(VOLUNTEER_EVENTS.map((event) => event.organization))).sort((a, b) =>
    a.localeCompare(b, "tr", { sensitivity: "base" }),
  ),
];

const TAG_OPTIONS = Array.from(
  new Set(VOLUNTEER_EVENTS.flatMap((event) => event.tags)),
).sort((a, b) => a.localeCompare(b, "tr", { sensitivity: "base" }));

const PAGE_SIZE = 4;

const isWithinRange = (date: string, range: DateFilter) => {
  if (range === "any") return true;
  const target = new Date(date).getTime();
  const now = Date.now();
  const week = 7 * 24 * 60 * 60 * 1000;
  const month = 30 * 24 * 60 * 60 * 1000;
  const quarter = 90 * 24 * 60 * 60 * 1000;

  switch (range) {
    case "week":
      return target - now <= week && target >= now;
    case "month":
      return target - now <= month && target >= now;
    case "quarter":
      return target - now <= quarter && target >= now;
    default:
      return true;
  }
};

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    location: DEFAULT_LOCATION,
    categories: [],
    dateRange: "any",
    minVolunteers: DEFAULT_MIN_VOLUNTEERS,
    mode: "all",
    organization: DEFAULT_ORGANIZATION,
    tags: [],
    sortBy: DEFAULT_SORT,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    const filtered = EVENTS.filter((event) => {
      const matchesSearch =
        filters.search.trim().length === 0 ||
        [event.title, event.organization, event.description, ...event.tags]
          .join(" ")
          .toLowerCase()
          .includes(filters.search.trim().toLowerCase());

      const matchesLocation =
        filters.location === DEFAULT_LOCATION || event.location === filters.location;

      const matchesOrganization =
        filters.organization === DEFAULT_ORGANIZATION || event.organization === filters.organization;

      const matchesCategories =
        filters.categories.length === 0 || filters.categories.includes(event.category);

      const matchesTags =
        filters.tags.length === 0 || filters.tags.every((tag) => event.tags.includes(tag));

      const matchesDates = isWithinRange(event.date, filters.dateRange);

      const matchesVolunteers = event.volunteersNeeded >= filters.minVolunteers;

      const matchesMode = filters.mode === "all" || event.mode === filters.mode;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesOrganization &&
        matchesCategories &&
        matchesTags &&
        matchesDates &&
        matchesVolunteers &&
        matchesMode
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "volunteers":
          return b.volunteersNeeded - a.volunteersNeeded;
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date":
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return sorted;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const pageSlice = filteredEvents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const resetFilters = () => {
    setFilters({
      search: "",
      location: DEFAULT_LOCATION,
      categories: [],
      dateRange: "any",
      minVolunteers: DEFAULT_MIN_VOLUNTEERS,
      mode: "all",
      organization: DEFAULT_ORGANIZATION,
      tags: [],
      sortBy: DEFAULT_SORT,
    });
    setCurrentPage(1);
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const isActive = prev.categories.includes(category);
      const categories = isActive
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setFilters((prev) => {
      const isActive = prev.tags.includes(tag);
      const tags = isActive
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
    setCurrentPage(1);
  };

  const handleFilterChange: FilterChangeHandler = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="space-y-12">
      <HeroSection />
      <FiltersPanel
        filters={filters}
        locations={LOCATION_OPTIONS}
        organizations={ORGANIZATION_OPTIONS}
        categories={CATEGORY_OPTIONS}
        tags={TAG_OPTIONS}
        defaultLocation={DEFAULT_LOCATION}
        defaultOrganization={DEFAULT_ORGANIZATION}
        defaultMinVolunteers={DEFAULT_MIN_VOLUNTEERS}
        defaultSort={DEFAULT_SORT}
        onFilterChange={handleFilterChange}
        onToggleCategory={toggleCategory}
        onToggleTag={toggleTag}
        onResetFilters={resetFilters}
      />
      <EventsSection
        events={pageSlice}
        totalResults={filteredEvents.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
}
