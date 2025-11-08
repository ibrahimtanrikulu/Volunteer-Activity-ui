## Volunteer Activity UI - Tasarım Kalıbı

Bu doküman, ana sayfada kullandığımız görsel kalıbı tekrar kullanmak istediğimizde hızlıca başvurabileceğimiz bir rehberdir.

### Bileşenler

`src/components/home/`

- `HomeNavBar` – Üst navigasyon ve CTA.
- `HeroSection` – Başlık, açıklama ve badge/pill alanı.
- `FiltersPanel` – Arama, şehir, tarih, gönüllü sayısı, katılım şekli ve kategori filtreleri.
- `EventsSection` – Kart listesi ve pagination.
- `HomeFooter` – Alt bilgi bloğu.

Tüm bileşenler `src/components/home/index.ts` dosyasında yeniden dışa aktarılır. Başka sayfalarda kullanmak için:

```tsx
import { HeroSection, FiltersPanel } from "../components/home";
```

### Türler ve Yardımcılar

`src/types/home.ts` dosyası; etkinlik verisi, filtreler ve filtre güncelleme fonksiyonları için tipleri içerir. Değer kümeleri (`EVENTS`, `CATEGORY_OPTIONS`, `LOCATION_OPTIONS`) ilgili sayfada tutulur.

### Tekrar Kullanım İçin Öneriler

1. `EventsSection` yerine başka veri göstermek istersen, `EventCard` tipini genişlet veya bileşeni prop bazlı genişlet.
2. Renk ve gölge konseptini korumak için Tailwind sınıflarını değiştirmeden varyasyon ekle.
3. Yeni sayfalarda ortak tasarım için sayfa bileşenini şu yapıyla kurgula:

   ```tsx
   <div className="space-y-12 pb-12">
     <HomeNavBar />
     <HeroSection />
     <FiltersPanel ... />
     <EventsSection ... />
     <HomeFooter />
   </div>
   ```

4. Eğer global bir şablon lazımsa `src/layouts/AppShell.tsx` gibi bir bileşen oluşturup bu blokları oraya taşıyabilirsin.

Güncel prototip, `src/pages/HomePage.tsx` altında bulunur. Yeni sayfa oluştururken bu dosyayı kopyalayarak başlayabilir, bileşenleri ihtiyaca göre yeniden düzenleyebilirsin.
