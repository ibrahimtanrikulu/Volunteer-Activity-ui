import type { VolunteerEventDetail } from "../types/home";

export const VOLUNTEER_EVENTS: VolunteerEventDetail[] = [
  {
    id: 1,
    title: "Boğaz Çevresi Kıyı Temizliği",
    date: "2024-06-22",
    location: "İstanbul",
    category: "Çevre",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1526481280695-3c46973d1345?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 80,
    organization: "Mavi Dünya Derneği",
    description:
      "Hafta sonu boyunca kıyı şeridinde detaylı temizlik, atık ayrıştırma ve farkındalık çalışmaları.",
    tags: ["Plastik Aksiyonu", "Aile Dostu", "Sahil"],
    mode: "Yerinde",
    summary:
      "İstanbul Boğaz hattında iki günlük yoğun bir kıyı temizliği operasyonu. Gönüllüler sahada temizlik, ayrıştırma ve veri raporlama görevlerini üstlenir.",
    objectives: [
      "Kıyı şeridinden 2 ton atık toplamak",
      "Toplanan verileri belediye ile paylaşmak",
      "Bölge halkına yönelik çevre farkındalığı artırmak",
    ],
    schedule: [
      { time: "09:30", activity: "Karşılama ve güvenlik brifingi" },
      { time: "10:00", activity: "Kıyı şeridinde temizlik istasyonlarının kurulumu" },
      { time: "12:30", activity: "Öğle arası ve saha gözlemi" },
      { time: "13:30", activity: "Atık ayrıştırma ve tartım" },
      { time: "15:30", activity: "Veri raporlama ve kapanış" },
    ],
    requirements: [
      "18 yaş ve üzeri olmak",
      "Saha çalışmasına uygun kıyafet ve ayakkabı",
      "En az 4 saatlik katılım",
    ],
    benefits: [
      "Impact Collective saha katılım sertifikası",
      "Profesyonel çevre mühendislerinden eğitim",
      "Yeni dönem projelerinde öncelikli seçim",
    ],
    applicationEndDate: "2024-06-19",
    contact: {
      name: "Zeynep Aksoy",
      email: "saha@mavidunya.org",
      phone: "+90 212 320 11 33",
    },
    locationDetails: "Kadıköy sahil şeridi boyunca Moda İskelesi ile Kurbağalıdere arası.",
    mapUrl: "https://maps.google.com/?q=Kad%C4%B1k%C3%B6y+Sahil",
  },
  {
    id: 2,
    title: "Gençler İçin Kodlama Mentörlüğü",
    date: "2024-07-05",
    location: "Ankara",
    category: "Eğitim",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 25,
    organization: "FutureLab",
    description:
      "Lise öğrencileriyle bire bir çalışarak temel web geliştirme becerilerini kazandırma programı.",
    tags: ["STEM", "Gençlik", "Mentorluk"],
    mode: "Hibrit",
    summary:
      "FutureLab mentörlük programı, lise öğrencilerine web geliştirme temellerini öğretmek için gönüllü mentorları bir araya getirir.",
    objectives: [
      "HTML/CSS temel modülünü tamamlamak",
      "Her öğrenci için mini proje demosu hazırlamak",
      "Mentör-menti eşleşmelerini sürdürülebilir hale getirmek",
    ],
    schedule: [
      { time: "18:00", activity: "Çevrim içi açılış ve modül tanıtımı" },
      { time: "18:30", activity: "Mentör-menti eşleşmeleri ve hedef belirleme" },
      { time: "19:00", activity: "Canlı kodlama atölyesi" },
      { time: "20:30", activity: "Ödev ve takip planı" },
    ],
    requirements: [
      "Temel web geliştirme bilgisi",
      "Haftalık 3 saat ayırabilmek",
      "Mentörlük deneyimi tercih sebebidir",
    ],
    benefits: [
      "Mentörlük eğitimi sertifikası",
      "FutureLab topluluğuna erişim",
      "Program sonunda referans mektubu",
    ],
    applicationEndDate: "2024-06-28",
    contact: {
      name: "Mert Demir",
      email: "program@futurelab.org",
      phone: "+90 312 450 20 10",
    },
    locationDetails: "FutureLab Ankara Kampüsü ve Zoom platformu üzerinden hibrit yürütülür.",
    mapUrl: "https://maps.google.com/?q=FutureLab+Ankara",
  },
  {
    id: 3,
    title: "Şehir İçi Gıda Paylaşım Ağı",
    date: "2024-06-18",
    location: "İzmir",
    category: "Sosyal Sorumluluk",
    image:
      "https://images.unsplash.com/photo-1509805225007-73e8ba4b5be8?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 50,
    organization: "Paylaş İzmir",
    description:
      "Restoranlardan kalan ürünlerin ihtiyaç sahiplerine ulaştırılması için mikro lojistik operasyonu.",
    tags: ["Gıda Kurtarma", "Lojistik", "Topluluk"],
    mode: "Yerinde",
    summary:
      "İzmir genelindeki restaurantlardan artan gıdaların hızlıca toplanıp ihtiyaç sahiplerine ulaştırıldığı paylaşım ağına destek ol.",
    objectives: [
      "Günlük 400 porsiyon sıcak yemek dağıtımı",
      "Yeni lojistik rotasını test etmek",
      "Mahalle gönüllülerini sürece dahil etmek",
    ],
    schedule: [
      { time: "16:00", activity: "Lojistik ekip buluşması ve rota planı" },
      { time: "16:30", activity: "Restoranlardan teslimatların alınması" },
      { time: "18:00", activity: "Toplama merkezine dönüş ve paketleme" },
      { time: "19:00", activity: "Mahalle bazlı dağıtım" },
    ],
    requirements: [
      "Araç kullanabilen veya taşıma yapabilecek fiziksel yeterlilik",
      "Hijyen eğitimi kısa modülünü tamamlamak",
      "Ekip çalışmasına uyum",
    ],
    benefits: [
      "Gıda kurtarma zincirine dair uygulamalı eğitim",
      "Haftalık etki raporlarına erişim",
      "Topluluk içinde koordinatörlük fırsatı",
    ],
    applicationEndDate: "2024-06-16",
    contact: {
      name: "Ayşe Bilgin",
      email: "iletisim@paylasizmir.org",
      phone: "+90 232 320 12 45",
    },
    locationDetails: "Karşıyaka ve Bornova ilçeleri arasında belirlenen paylaşım noktaları.",
    mapUrl: "https://maps.google.com/?q=Payla%C5%9F+%C4%B0zmir",
  },
  {
    id: 4,
    title: "Online Türkçe Konuşma Kulübü",
    date: "2024-06-28",
    location: "Online",
    category: "Kültür",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 40,
    organization: "Dil Köprüsü",
    description:
      "Yabancılara Türkçe pratiği yaptırmak için tematik sohbet odaları ve içerik hazırlıkları.",
    tags: ["Dil", "Kültürel Değişim", "Uzaktan"],
    mode: "Online",
    summary:
      "Türkçe öğrenenler için küçük gruplar halinde konuşma pratiği, kültürel paylaşım ve içerik destekli oturumlar.",
    objectives: [
      "Haftalık 6 tematik konuşma odası yönetmek",
      "Katılımcıların seviyesine uygun materyal üretmek",
      "Yeni moderatörleri eğitmek",
    ],
    schedule: [
      { time: "19:30", activity: "Açılış ve ısınma oyunu" },
      { time: "19:45", activity: "Seviye bazlı breakout odaları" },
      { time: "20:30", activity: "Kültürel paylaşım etkinliği" },
      { time: "20:50", activity: "Geri bildirim ve kapanış" },
    ],
    requirements: [
      "Türkçe ana dili veya ileri seviye konuşabilmek",
      "Video konferans araçlarına hakimiyet",
      "Haftada en az 2 oturuma katılım",
    ],
    benefits: [
      "Dil Köprüsü moderatörlük eğitimi",
      "Uluslararası toplulukla network",
      "Program sonunda teşekkür belgesi",
    ],
    applicationEndDate: "2024-06-24",
    contact: {
      name: "Elif Narin",
      email: "moderator@dilkoprusu.org",
      phone: "+90 506 555 20 20",
    },
    locationDetails: "Zoom üzerinden canlı oturumlar, destek dökümanları Notion üzerinden paylaşılır.",
  },
  {
    id: 5,
    title: "Şehir Ormanı Rehabilitasyonu",
    date: "2024-07-12",
    location: "Bursa",
    category: "Çevre",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 120,
    organization: "Yeşil Adımlar",
    description:
      "Fidelerin dikimi, sulama sistemi kurulumu ve ziyaretçi rotalarının düzenlenmesi.",
    tags: ["Ağaçlandırma", "Outdoor", "Uzun Dönem"],
    mode: "Yerinde",
    summary:
      "Bursa şehir ormanında yeni gölgelik alanlar yaratmak ve sulama altyapısını güçlendirmek için saha çalışması.",
    objectives: [
      "800 yeni fidan dikimi",
      "Sulama hattının devreye alınması",
      "Ziyaretçi bilgilendirme rotalarının hazırlanması",
    ],
    schedule: [
      { time: "09:00", activity: "Alan tanıtımı ve ekipman dağıtımı" },
      { time: "10:00", activity: "Fidan dikim atölyesi" },
      { time: "12:30", activity: "Öğle arası" },
      { time: "13:30", activity: "Sulama sistem kurulumu" },
      { time: "15:00", activity: "Ziyaretçi rotası işaretleme" },
    ],
    requirements: [
      "Arazi koşullarında çalışmaya uygun olmak",
      "Gerekli güvenlik ekipmanını kullanmak",
      "Gün boyu saha çalışmasına uyum",
    ],
    benefits: [
      "Yeşil Adımlar gönüllü rozetleri",
      "Ekolojik restorasyon eğitimi",
      "Ulaşım desteği",
    ],
    applicationEndDate: "2024-07-05",
    contact: {
      name: "Selim Uğur",
      email: "info@yesiladimlar.org",
      phone: "+90 224 310 44 22",
    },
    locationDetails: "Bursa şehir ormanı kuzey giriş alanı, servis araçları Nilüfer’den kalkar.",
    mapUrl: "https://maps.google.com/?q=Bursa+%C5%9Fehir+Orman%C4%B1",
  },
  {
    id: 6,
    title: "STEM Kız Öğrenci Kampı",
    date: "2024-08-02",
    location: "Eskişehir",
    category: "Eğitim",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 35,
    organization: "Bilim Vadisi",
    description:
      "Ortaokul kız öğrencilerine yönelik üç günlük STEM kampında atölye ve laboratuvar destekleri.",
    tags: ["Kız Çocukları", "Kamp", "STEM"],
    mode: "Yerinde",
    summary:
      "Eskişehir’de üç günlük kamp boyunca STEM alanlarında rol model olacak gönüllüler arıyoruz.",
    objectives: [
      "Laboratuvar güvenliği eğitimini uygulamak",
      "Maker atölyeleri için mentorluk sağlamak",
      "Kapanış sunumlarını değerlendirmek",
    ],
    schedule: [
      { time: "1. Gün", activity: "Tanışma, güvenlik, fen deneyleri" },
      { time: "2. Gün", activity: "Kodlama atölyeleri ve saha gezisi" },
      { time: "3. Gün", activity: "Proje sunumları ve mentorluk" },
    ],
    requirements: [
      "STEM alanlarında ilgi ve temel bilgi",
      "3 gün boyunca kamp alanında konaklama",
      "Öğrencilerle iletişim becerisi",
    ],
    benefits: [
      "Bilim Vadisi mentorluk sertifikası",
      "Konaklama ve yemek desteği",
      "Program sonrası mentorluk topluluğu",
    ],
    applicationEndDate: "2024-07-20",
    contact: {
      name: "Nilay Sönmez",
      email: "kamp@bilimvadisi.org",
      phone: "+90 222 350 14 36",
    },
    locationDetails: "Bademlik Kamp Alanı, ulaşım Eskişehir merkezinden servis ile sağlanır.",
  },
  {
    id: 7,
    title: "Afet Dayanıklılık Simülasyonu",
    date: "2024-06-30",
    location: "İstanbul",
    category: "Acil Durum",
    image:
      "https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1508711043262-0bd5a3e44b42?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 60,
    organization: "Kriz360",
    description:
      "Erken müdahale ekiplerine destek olmak için saha simülasyonları ve veri toplama görevleri.",
    tags: ["Afet", "Ekip Çalışması", "Teknik"],
    mode: "Hibrit",
    summary:
      "Kriz360 afet hazırlık senaryosunda saha simülasyonlarına veri desteği sağlayacak gönüllüler aranıyor.",
    objectives: [
      "İki ayrı afet senaryosunu test etmek",
      "Veri toplama protokollerini güncellemek",
      "Afet gönüllü ağını genişletmek",
    ],
    schedule: [
      { time: "10:00", activity: "Senaryo brifingi ve ekip dağılımı" },
      { time: "11:00", activity: "Saha simülasyonu 1" },
      { time: "13:00", activity: "Veri toplama ve değerlendirme" },
      { time: "14:30", activity: "Saha simülasyonu 2" },
      { time: "16:00", activity: "Çıktıların paylaşımı ve kapanış" },
    ],
    requirements: [
      "Afet veya ilk yardım eğitimi almış olmak tercih edilir",
      "Fiziksel dayanıklılık",
      "Ekip içi iletişim becerisi",
    ],
    benefits: [
      "Kriz360 afet hazırlık sertifikası",
      "Profesyonel ekiplerle çalışma deneyimi",
      "Afet dayanıklılık ağına erişim",
    ],
    applicationEndDate: "2024-06-25",
    contact: {
      name: "Hande Gür",
      email: "afet@kriz360.org",
      phone: "+90 216 410 30 60",
    },
    locationDetails: "Ataşehir afet eğitim kampüsü ve çevrimiçi koordinasyon odaları.",
  },
  {
    id: 8,
    title: "Sanatla Terapi Atölyeleri",
    date: "2024-07-18",
    location: "Antalya",
    category: "Sağlık",
    image:
      "https://images.unsplash.com/photo-1470115636492-6d2b56f9146e?auto=format&fit=crop&w=1200&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1600&q=60",
    volunteersNeeded: 20,
    organization: "Renkli Adımlar",
    description:
      "Çocuk hastalara yönelik resim ve seramik temelli terapi oturumlarını eşlik eden gönüllüler.",
    tags: ["Sanat", "Çocuk", "Hastane"],
    mode: "Yerinde",
    summary:
      "Akdeniz Üniversitesi Hastanesi pediatri servisinde çocuklarla sanat temelli terapi seanslarına destek ol.",
    objectives: [
      "Haftalık 3 sanat atölyesi düzenlemek",
      "Hastane personeli ile koordinasyonu güçlendirmek",
      "Ailelere psikososyal destek sağlamak",
    ],
    schedule: [
      { time: "14:00", activity: "Hazırlık ve malzeme kontrolü" },
      { time: "14:30", activity: "Sanat terapisi oturumu" },
      { time: "15:30", activity: "Ailelerle paylaşım ve not tutma" },
    ],
    requirements: [
      "Çocuklarla iletişimde deneyim",
      "Sanat terapisi veya benzer alanlarda ilgi",
      "Hastane hijyen protokollerine uyum",
    ],
    benefits: [
      "Renkli Adımlar gönüllü eğitim programı",
      "Psikolog gözetiminde süpervizyon",
      "Ulaşım desteği",
    ],
    applicationEndDate: "2024-07-10",
    contact: {
      name: "Derya Yavaş",
      email: "atolye@renkliadimlar.org",
      phone: "+90 242 310 77 66",
    },
    locationDetails: "Akdeniz Üniversitesi Hastanesi Pediatri Servisi sanat etkinlik odası.",
  },
];

