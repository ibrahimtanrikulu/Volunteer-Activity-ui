import { useEffect, useMemo, useState } from "react";
import type {
  DateFilter,
  EventMode,
  FilterChangeHandler,
  Filters,
  SortOption,
} from "../../types/home";

type FiltersPanelProps = {
  filters: Filters;
  locations: string[];
  organizations: string[];
  categories: string[];
  tags: string[];
  defaultLocation: string;
  defaultOrganization: string;
  defaultMinVolunteers: number;
  defaultSort: SortOption;
  onFilterChange: FilterChangeHandler;
  onToggleCategory: (category: string) => void;
  onToggleTag: (tag: string) => void;
  onResetFilters: () => void;
};

type ActiveFilterChip = {
  key:
    | "search"
    | "location"
    | "organization"
    | "dateRange"
    | "mode"
    | "minVolunteers"
    | "category"
    | "tag"
    | "sortBy";
  label: string;
  value?: string;
};

const DATE_OPTIONS: Array<{ key: DateFilter; label: string }> = [
  { key: "any", label: "Tüm Tarihler" },
  { key: "week", label: "Bu Hafta" },
  { key: "month", label: "Bu Ay" },
  { key: "quarter", label: "3 Ay" },
];

const SORT_OPTIONS: Array<{ key: SortOption; label: string; hint: string }> = [
  { key: "date", label: "En Yakın Tarih", hint: "Yaklaşanları öne al" },
  { key: "volunteers", label: "Gönüllü İhtiyacı", hint: "En yüksek ihtiyaç" },
  { key: "recent", label: "Yeni Eklenen", hint: "En son eklenen" },
];

const VOLUNTEER_RANGE = {
  min: 10,
  max: 150,
  step: 5,
};

export function FiltersPanel({
  filters,
  locations,
  organizations,
  categories,
  tags,
  defaultLocation,
  defaultOrganization,
  defaultMinVolunteers,
  defaultSort,
  onFilterChange,
  onToggleCategory,
  onToggleTag,
  onResetFilters,
}: FiltersPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  }, []);

  const activeFilters = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];

    if (filters.search.trim().length > 0) {
      chips.push({ key: "search", label: `Arama: “${filters.search.trim()}”` });
    }

    if (filters.location !== defaultLocation) {
      chips.push({ key: "location", label: filters.location });
    }

    if (filters.organization !== defaultOrganization) {
      chips.push({ key: "organization", label: filters.organization });
    }

    if (filters.dateRange !== "any") {
      const dateLabel = DATE_OPTIONS.find((option) => option.key === filters.dateRange)?.label;
      chips.push({ key: "dateRange", label: dateLabel ?? "Tarih" });
    }

    if (filters.mode !== "all") {
      chips.push({ key: "mode", label: `Katılım: ${filters.mode}` });
    }

    if (filters.minVolunteers > defaultMinVolunteers) {
      chips.push({ key: "minVolunteers", label: `+${filters.minVolunteers} gönüllü` });
    }

    filters.categories.forEach((category) => {
      chips.push({ key: "category", label: category, value: category });
    });

    filters.tags.forEach((tag) => {
      chips.push({ key: "tag", label: `Etiket: ${tag}`, value: tag });
    });

    if (filters.sortBy !== defaultSort) {
      const sortLabel = SORT_OPTIONS.find((option) => option.key === filters.sortBy)?.label;
      chips.push({ key: "sortBy", label: `Sıralama: ${sortLabel ?? "Özel"}` });
    }

    return chips;
  }, [
    defaultLocation,
    defaultMinVolunteers,
    defaultOrganization,
    defaultSort,
    filters.categories,
    filters.dateRange,
    filters.location,
    filters.minVolunteers,
    filters.mode,
    filters.organization,
    filters.search,
    filters.sortBy,
    filters.tags,
  ]);

  const hasActiveFilters = activeFilters.length > 0;

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRemoveFilter = (chip: ActiveFilterChip) => {
    switch (chip.key) {
      case "search":
        onFilterChange("search", "");
        break;
      case "location":
        onFilterChange("location", defaultLocation);
        break;
      case "organization":
        onFilterChange("organization", defaultOrganization);
        break;
      case "dateRange":
        onFilterChange("dateRange", "any");
        break;
      case "mode":
        onFilterChange("mode", "all");
        break;
      case "minVolunteers":
        onFilterChange("minVolunteers", defaultMinVolunteers);
        break;
      case "category":
        if (chip.value) onToggleCategory(chip.value);
        break;
      case "tag":
        if (chip.value) onToggleTag(chip.value);
        break;
      case "sortBy":
        onFilterChange("sortBy", defaultSort);
        break;
      default:
        break;
    }
  };

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-emerald-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
            Akıllı Filtreler
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">Senin için doğru etkinliği bul</h3>
          <p className="text-sm text-gray-500">
            Şehir, kategori, ihtiyaç seviyesi ve etiketlerle filtreleyerek sana en uygun gönüllü programlarını
            keşfet.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button
            onClick={onResetFilters}
            disabled={!hasActiveFilters}
            className={`rounded-full border px-4 py-2 font-semibold transition ${
              hasActiveFilters
                ? "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
                : "border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            Filtreleri sıfırla
          </button>
          <button
            type="button"
            onClick={togglePanel}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600 transition hover:border-emerald-300 hover:text-emerald-600"
          >
            {isOpen ? "Paneli gizle" : "Filtreleri aç"}
            <span className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>⌄</span>
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
          <span className="font-semibold uppercase tracking-[0.3em] text-emerald-600">Aktif</span>
          {activeFilters.map((chip) => (
            <button
              key={`${chip.key}-${chip.value ?? chip.label}`}
              onClick={() => handleRemoveFilter(chip)}
              className="group inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 font-semibold text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-900"
            >
              {chip.label}
              <span className="text-emerald-400 transition group-hover:text-emerald-700">✕</span>
            </button>
          ))}
        </div>
      )}

      {!isOpen && (
        <p className="mt-4 text-sm text-gray-500">
          {hasActiveFilters
            ? `${activeFilters.length} aktif filtre uygulandı.`
            : "Filtreleri açarak aradığın etkinliği daha kolay bulabilirsin."}
        </p>
      )}

      <div
        className={`grid gap-6 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:grid-cols-2 xl:grid-cols-4 ${
          isOpen
            ? "pointer-events-auto mt-4 max-h-[200vh] opacity-100"
            : "pointer-events-none mt-0 max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-gray-100 p-5 xl:col-span-2">
          <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Arama</label>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">
            <span className="text-gray-400">⌕</span>
            <input
              value={filters.search}
              onChange={(event) => onFilterChange("search", event.target.value)}
              placeholder="Etkinlik, kurum veya tema ara"
              className="w-full border-none bg-transparent py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5">
          <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Şehir</label>
          <select
            value={filters.location}
            onChange={(event) => onFilterChange("location", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
          >
            {locations.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5">
          <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Kuruluş</label>
          <select
            value={filters.organization}
            onChange={(event) => onFilterChange("organization", event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
          >
            {organizations.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5">
          <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Tarih Aralığı</label>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-medium">
            {DATE_OPTIONS.map((option) => (
              <button
                key={option.key}
                onClick={() => onFilterChange("dateRange", option.key)}
                className={`rounded-xl border px-3 py-2 transition ${
                  filters.dateRange === option.key
                    ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5">
          <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Katılım Şekli</label>
          <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
            {["all", "Yerinde", "Online", "Hibrit"].map((option) => (
              <button
                key={option}
                onClick={() =>
                  onFilterChange("mode", option === "all" ? "all" : (option as EventMode))
                }
                className={`rounded-full border px-4 py-1.5 transition ${
                  filters.mode === option
                    ? "border-emerald-400 bg-emerald-50 text-emerald-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {option === "all" ? "Hepsi" : option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5">
          <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Sıralama</label>
          <div className="mt-3 grid gap-2 text-sm font-semibold">
            {SORT_OPTIONS.map((option) => {
              const isActive = filters.sortBy === option.key;
              return (
                <button
                  key={option.key}
                  onClick={() => onFilterChange("sortBy", option.key)}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2 transition ${
                    isActive
                      ? "border-gray-900 bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                      : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-xs font-normal opacity-70">{option.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            <span>Gönüllü İhtiyacı</span>
            <span className="text-gray-500">+{filters.minVolunteers} kişi</span>
          </div>
          <input
            type="range"
            min={VOLUNTEER_RANGE.min}
            max={VOLUNTEER_RANGE.max}
            step={VOLUNTEER_RANGE.step}
            value={filters.minVolunteers}
            onChange={(event) => onFilterChange("minVolunteers", Number(event.target.value))}
            className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-emerald-200 accent-emerald-500"
          />
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span>{VOLUNTEER_RANGE.min}</span>
            <span>{VOLUNTEER_RANGE.max}+</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Kategori</label>
            <span className="text-xs text-gray-400">Çoklu seçim</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = filters.categories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => onToggleCategory(category)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "border-transparent bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Etiketler</label>
            <span className="text-xs text-gray-400">Uzmanlık ve tema filtreleri</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isActive = filters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "border-indigo-200 bg-indigo-50 text-indigo-600 shadow-lg"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
