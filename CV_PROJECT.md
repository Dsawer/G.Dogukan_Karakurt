# Diyet Cebimde — Yapay Zeka Destekli Diyet & Beslenme Platformu

**Rol:** Full-Stack Geliştirici (Solo / Kurucu Geliştirici)
**Süre:** 2025 – Devam ediyor
**Tür:** Üç katmanlı SaaS ürünü (Mobil + Web Admin + API)
**Repo:** `diet_backend`, `diet_admin`, `diet_frontend` (üç ayrı repo)

---

## Özet

Kullanıcıların kişisel bilgilerini ve sağlık hedeflerini temel alan, yapay zeka destekli haftalık diyet planları üreten; fotoğraftan yemek tanıma, manuel besin takibi, kilo/ölçü takibi ve sohbet botu içeren tam yığın (full-stack) bir mobil uygulama. Uçtan uca tek başıma tasarlayıp geliştirdim: backend API, yönetim paneli ve mobil istemci.

---

## Teknoloji Yığını

**Backend**
- Python 3, Django 5.2, Django REST Framework
- PostgreSQL (ArrayField, JSONField kullanımı)
- SimpleJWT (JWT tabanlı kimlik doğrulama), Google OAuth 2.0
- Google Gemini API (4 farklı model stratejisi: Fast / Smart / Vision / Cheap fallback)
- PuLP (Linear Programming) — porsiyon optimizasyonu
- Gunicorn (3 worker × 8 thread)
- `django.core.cache` ile endpoint bazlı caching

**Yönetim Paneli (Web)**
- React 18 + TypeScript + Vite 5
- Tailwind CSS (özel `brand-*` palet)
- React Query (server state), Zustand (auth state, localStorage persist)
- Axios (global 401 interceptor), React Router v6
- Recharts (analitik grafikler), lazy route loading

**Mobil**
- Expo SDK 53, React Native 0.79, React 19
- TypeScript, NativeWind (Tailwind for RN)
- i18next + AsyncStorage (TR/EN, 13 namespace)
- 15+ React Context provider (modüler state)
- Google Mobile Ads (rewarded ad ile kredi sistemi)
- EAS Build (cloud build pipeline)

**DevOps & Altyapı**
- Railway (backend + admin paneli oto-deploy)
- Expo EAS (mobil build)
- Procfile tabanlı deploy (collectstatic → migrate → bootstrap_admin → gunicorn)
- GitHub (üç ayrı repo, manuel CI yok — basit ve hızlı iterasyon)

---

## Öne Çıkan Özellikler

### Yapay Zeka Entegrasyonu
- **Haftalık diyet planı üretimi:** Kullanıcının anket verisi + kalori hedefi + alerjenleri + tercih edilen mutfaklar → Gemini ile yemek seçimi → PuLP doğrusal programlama ile porsiyon optimizasyonu.
- **Fotoğraftan yemek tanıma:** Base64 görüntü doğrudan Gemini Vision'a; makro hesabı ve günlük tüketime otomatik ekleme.
- **Hafızalı sohbet botu:** `ConversationSummary` modeli ile kullanıcı profili ve geçmiş sohbet özeti — bot kullanıcıyı "hatırlar".
- **Rate limit ve retry stratejisi:** Gemini hata mesajından retry-delay çıkarımı + ucuz model fallback'i.

### Domain Modelleme
- 34 alanlı merkezi `FoodItem` modeli (6 kalori bandı için ayrı maksimum porsiyon, 5'li mutfak sınıflandırması, alerjen/etiket/tarif snapshot'ları).
- Türkçe karakter normalizasyonu ile bulanık duplikasyon engelleme.
- `MealPlan` oluşturulduğunda yemek bilgilerinin snapshot'lanması — kaynak `FoodItem` değişse bile geçmiş planlar bozulmuyor.
- Sinyaller ile (`pre_save`/`post_save`) `DailyIntake` ↔ `ManualTrackingEntry` arasında transactional senkronizasyon (çift sayma bug'ına karşı).

### Yönetim Paneli
- 7 sekmeli yemek düzenleme modalı (Temel / Makrolar / Porsiyon / İçerikler / Tarif / Alerjenler / Meta).
- 34 sütunluk CSV import/export (append / upsert / replace modları, savepoint başına satır — başarısız satırlar diğerlerini etkilemiyor).
- 6 adet analitik dashboard (kullanıcı büyümesi, BMI dağılımı, en çok tüketilen besinler, engagement, anket demografisi vs.) — paralel `useQueries` ile yükleniyor.

### Kullanıcı Deneyimi
- Çift dilli mobil arayüz (TR/EN), namespace'ler arası anahtar pariteliği denetlenmiş.
- Kredi sistemi: özellik başına maliyet (foto=5, plan=2, chat=1), rewarded ad ile yeniden yükleme, 402 yanıtında modal ile yeniden deneme.
- Mobilde 12+ ekran: Ana sayfa, sohbet, ilerleme grafikleri, manuel takip, su/kilo/ölçü takibi, alışveriş listesi, profil.

---

## Mühendislik Kararları

- **Email-as-username:** Standart Django `username` yerine email alanı üzerinden auth — Google OAuth ile dedup'u kolaylaştırmak için.
- **JWT-only API:** CSRF middleware kaldırıldı; tüm istekler Bearer token ile. Admin tokenları custom `email` ve `is_staff` claim'leri taşır.
- **Env-driven admin bootstrap:** Railway deploy'unda `ADMIN_*` env değişkenleriyle staff kullanıcı oto-oluşturma — manuel seed gerektirmiyor.
- **Linear programming ile porsiyon ayarı:** GPT'nin tahmin ettiği porsiyon yerine PuLP ile kalori/makro hedefine optimize edilmiş kesin porsiyon sayıları.
- **Snapshot mimarisi:** Plan oluşturulduktan sonra kaynak veriden bağımsız — geriye dönük veri tutarlılığı garantili.
- **60s server cache + 60s React Query staleTime:** Analitik endpoint'lerinde maliyet ve performans dengesi.

---

## Ölçek & Sayılar

- **3 ayrı repo**, tek geliştirici tarafından paralel sürdürülüyor.
- **~11.000 satırlık yemek kataloğu** (CSV import: 30-60 sn, gunicorn timeout 180 sn'ye çıkarıldı).
- **8 Django app**, 25+ migration, 6 model snapshot/sinyal akışı.
- **~2.100 satırlık tek React sayfası** (`Foods.tsx`) — 7 tab, modal, inline edit, CSV import — tek state object ile yönetiliyor.
- **15+ React Context** mobilde — anket akışı boyunca state bölünmesi.

---

## Çıkarılan Dersler

- Mobil + web + backend üçlüsünü tek başına ileri taşırken **shared domain language** (örn. `FoodItem` şeması) en kritik dokümantasyon parçası — workspace genelinde `design.md` ile çözüldü.
- AI çağrılarında rate limit ve retry **business logic'in parçası**, hata yakalama detayı değil — model stratejisi (4 model), retry-delay parse, ucuz fallback.
- Snapshot pattern (yemek planındaki donmuş kopyalar) **veri tutarlılığını** zaman içinde koruyor; sonradan eklemek zor, baştan tasarlamak şart.
- Linear programming (PuLP) ile **AI tahminlerinin matematiksel kısıtlara oturtulması** — sadece prompt'a güvenmektense hibrit yaklaşım çok daha güvenilir.

---

## Bağlantılar

- Backend (Railway): `web-production-c4fb1.up.railway.app`
- Admin Paneli (Railway): `dietadmin-production.up.railway.app`
- Mobil: Expo EAS build (App Store / Play Store hazırlığı)
