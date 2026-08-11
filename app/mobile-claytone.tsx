"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { openYclientsWidget } from "./yclients-widget";

type Service = { name: string; price: string; time: string; url: string };

const bookingUrl = "https://n962951.yclients.com/company/894717/personal/select-time";
const routeUrl = "https://yandex.ru/maps/?mode=routes&rtext=~%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9A%D0%BE%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%204%2C%20%D0%BA%D0%BE%D1%80%D0%BF.%209&rtt=auto";
const yclients = (service: string) =>
  `https://n962951.yclients.com/company/894717/personal/select-services?o=${service}`;

const manicure: Service[] = [
  { name: "Комбо — маникюр + педикюр", price: "6 800 ₽", time: "3 ч", url: yclients("m5439528s26277760") },
  { name: "Наращивание ногтей", price: "5 500 ₽", time: "2 ч", url: yclients("m5439528s19345530") },
  { name: "Коррекция наращённых ногтей", price: "4 700 ₽", time: "2 ч", url: yclients("m5439528s19345536") },
  { name: "Комплекс S", price: "3 000 ₽", time: "1 ч 15 мин", url: yclients("m5439528s17329246") },
  { name: "Комплекс M", price: "3 500 ₽", time: "1 ч 30 мин", url: yclients("m5439528s17329251") },
  { name: "Комплекс L", price: "4 500 ₽", time: "2 ч", url: yclients("m5439528s17329255") },
  { name: "Покрытие гель-лаком", price: "1 800 ₽", time: "45 мин", url: yclients("m5439528s13231053") },
  { name: "Маникюр комбинированный / аппаратный", price: "1 800 ₽", time: "1 ч", url: yclients("m5439528s13230981") },
  { name: "Лак лечебный / цветной", price: "500 ₽", time: "15 мин", url: yclients("m5439528s20620785") },
  { name: "Японский маникюр", price: "2 300 ₽", time: "1 ч", url: yclients("m5439528s16414211") },
  { name: "Дизайны", price: "100–500 ₽", time: "от 5 мин", url: yclients("m5439528s17350442") },
  { name: "Наращивание одного ногтя", price: "350 ₽", time: "20 мин", url: yclients("m5439528s13231069") },
  { name: "Ремонт ногтя", price: "200–350 ₽", time: "20 мин", url: yclients("m5439528s17627677") },
  { name: "Холодный парафин для рук", price: "500 ₽", time: "15 мин", url: yclients("m5439528s29517270") },
];

const pedicure: Service[] = [
  { name: "Комплекс педикюр", price: "4 050 ₽", time: "1 ч 30 мин", url: yclients("m5439528s13231092") },
  { name: "Пальцы ног + гель-лак", price: "3 500 ₽", time: "1 ч", url: yclients("m5439528s13231104") },
  { name: "Стопы и ногти без покрытия", price: "3 000 ₽", time: "1 ч", url: yclients("m5439528s13231102") },
  { name: "Обработка пальцев ног", price: "1 800 ₽", time: "1 ч", url: yclients("m5439528s13231109") },
  { name: "Полное снятие гель-лака", price: "700 ₽", time: "30 мин", url: yclients("m5439528s17350429") },
  { name: "Холодный парафин для ног", price: "700 ₽", time: "15 мин", url: yclients("m5439528s29517282") },
];

const beforeAfter = [
  { src: "/assets/before-after-recovery.webp", alt: "До и после — восстановление ногтей и аккуратный нюдовый маникюр" },
  { src: "/assets/before-after-natural.webp", alt: "До и после — натуральный маникюр и выравнивание формы" },
];

const galleryWorks = [
  { src: "/assets/work-01.webp", alt: "Работа Нонны — нежный маникюр с тонким френчем" },
  { src: "/assets/work-02.webp", alt: "Работа Нонны — аккуратный нюдовый маникюр" },
  { src: "/assets/work-03.webp", alt: "Работа Нонны — розовый маникюр мягкой формы" },
  { src: "/assets/work-04.webp", alt: "Работа Нонны — молочный френч" },
  { src: "/assets/work-05.webp", alt: "Работа Нонны — натуральный розовый маникюр" },
  { src: "/assets/work-06.webp", alt: "Работа Нонны — маникюр винного оттенка" },
  { src: "/assets/work-07.webp", alt: "Работа Нонны — графичный тёмный дизайн" },
];

const featuredWorks = galleryWorks.slice(0, 3);
const lightboxItems = [...beforeAfter, ...galleryWorks];

const reviews = [
  { text: "Очень внимательный мастер. Ногти выглядят эстетично и аккуратно, а в кабинете чисто и уютно.", author: "in-melik · Яндекс Карты" },
  { text: "Как мастер, особенно оценила стерильность и уверенную работу Нонны — без суеты и лишних движений.", author: "Вероника Оганезова · Яндекс Карты" },
  { text: "Покрытие носилось больше трёх недель без единой отслойки. Нонна — настоящий профессионал.", author: "Anush Ануш · Яндекс Карты" },
  { text: "Мужской маникюр прошёл без порезов и дискомфорта. Профессиональный подход и стерильность — на высшем уровне.", author: "Johnny Cage · Яндекс Карты" },
  { text: "Чистый маникюр, приятное общение и уютная атмосфера. Ногти держатся долго.", author: "Zhanna A. · Яндекс Карты" },
  { text: "Маникюр и педикюр выполнены очень аккуратно и чисто. Чувствуется работа профессионального мастера.", author: "Наталья Е. · Яндекс Карты" },
  { text: "Нонна сделала маникюр и педикюр на высоком уровне. Буду рекомендовать мастера знакомым.", author: "Наталья Пашина · Яндекс Карты" },
  { text: "Аккуратно, мягко и с учётом всех пожеланий. Очень приятный и доброжелательный мастер.", author: "Валерия · Яндекс Карты" },
  { text: "Прекрасный педикюр с идеальным френчем. Спасибо мастеру Нонне!", author: "flosaigul · Яндекс Карты" },
];

const polishBottles = [100, 340, 578, 813].flatMap((top, row) =>
  Array.from({ length: 18 }, (_, col) => {
    const sequence = row * 18 + col;

    return {
      key: `${row}-${col}`,
      style: {
        left: `${((96 + col * 72) / 1484) * 100}%`,
        top: `${(top / 1060) * 100}%`,
        width: `${(72 / 1484) * 100}%`,
        height: `${(176 / 1060) * 100}%`,
        "--mct-bottle-x": `${(col / 17) * 100}%`,
        "--mct-bottle-y": `${(row / 3) * 100}%`,
        "--mct-bottle-delay": `${1.95 + sequence * 0.055}s`,
      } as CSSProperties,
    };
  }),
);

export default function MobileClayTone() {
  const [category, setCategory] = useState<"manicure" | "pedicure">("manicure");
  const [expanded, setExpanded] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const finalBookRef = useRef<HTMLElement>(null);
  const beforeAfterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lightboxTouchStart = useRef<number | null>(null);

  const services = category === "manicure" ? manicure : pedicure;
  const visibleServices = useMemo(
    () => category === "manicure" && !expanded ? services.slice(0, 5) : services,
    [category, expanded, services],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    let restored = false;

    document.body.style.overflow = "hidden";
    const restoreScroll = () => {
      if (restored) return;
      restored = true;
      document.body.style.overflow = previousOverflow;
    };
    const timer = window.setTimeout(() => {
      restoreScroll();
      setIntroVisible(false);
    }, reduceMotion ? 180 : 1750);

    return () => {
      window.clearTimeout(timer);
      restoreScroll();
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const finalBook = finalBookRef.current;
    if (!hero || !finalBook) return;

    let frame = 0;
    const updateSticky = () => {
      frame = 0;
      const heroPassed = hero.getBoundingClientRect().bottom <= 0;
      const bookingTop = finalBook.getBoundingClientRect().top;
      const bookingIsApproaching = bookingTop <= window.innerHeight + 96;
      setStickyVisible(heroPassed && !bookingIsApproaching);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSticky);
    };

    updateSticky();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!galleryOpen && lightboxIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous };
  }, [galleryOpen, lightboxIndex]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".mct-reveal"));
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!galleryOpen && lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else setGalleryOpen(false);
      }
      if (lightboxIndex !== null && event.key === "ArrowLeft") {
        setLightboxIndex((current) => current === null ? null : (current - 1 + lightboxItems.length) % lightboxItems.length);
      }
      if (lightboxIndex !== null && event.key === "ArrowRight") {
        setLightboxIndex((current) => current === null ? null : (current + 1) % lightboxItems.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryOpen, lightboxIndex]);

  const switchCategory = (next: "manicure" | "pedicure") => {
    setCategory(next);
    setExpanded(false);
  };

  const updateBeforeAfterIndex = () => {
    const swiper = beforeAfterRef.current;
    if (!swiper) return;

    const swiperRect = swiper.getBoundingClientRect();
    const swiperCenter = swiperRect.left + swiperRect.width / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(swiper.children).forEach((child, index) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - swiperCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveBeforeAfter((current) => current === nearestIndex ? current : nearestIndex);
  };

  const goToBeforeAfter = (index: number) => {
    const swiper = beforeAfterRef.current;
    const card = swiper?.children[index] as HTMLElement | undefined;
    if (!swiper || !card) return;

    const swiperRect = swiper.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const left = swiper.scrollLeft + (cardRect.left - swiperRect.left) - (swiper.clientWidth - card.clientWidth) / 2;
    swiper.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  const openLightbox = (src: string) => {
    const index = lightboxItems.findIndex((item) => item.src === src);
    if (index >= 0) setLightboxIndex(index);
  };

  const stepLightbox = (direction: -1 | 1) => {
    setLightboxIndex((current) => current === null ? null : (current + direction + lightboxItems.length) % lightboxItems.length);
  };

  const finishLightboxSwipe = (clientX: number) => {
    if (lightboxTouchStart.current === null) return;
    const distance = clientX - lightboxTouchStart.current;
    lightboxTouchStart.current = null;
    if (Math.abs(distance) < 42) return;
    stepLightbox(distance > 0 ? -1 : 1);
  };

  return (
    <div className="mct-mobile">
      {introVisible && (
        <div className="mct-intro" aria-hidden="true">
          <div className="mct-intro-mark">
            <span>ClayTone</span>
            <i />
            <small>Nail studio</small>
          </div>
        </div>
      )}

      <header className="mct-hero" id="mobile-top" ref={heroRef}>
        <div className="mct-shell">
          <div className="mct-topbar">
            <a className="mct-brand" href="#mobile-top" aria-label="ClayTone, наверх">ClayTone</a>
            <div className="mct-menu-wrap" ref={menuRef}>
              <button
                className={`mct-menu-button${menuOpen ? " is-open" : ""}`}
                type="button"
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span /><span /><span />
              </button>
              {menuOpen && (
                <nav className="mct-menu-panel" id="mobile-navigation" aria-label="Разделы сайта">
                  <a href="#mobile-portfolio" onClick={() => setMenuOpen(false)}><span>01</span>Портфолио</a>
                  <a href="#mobile-prices" onClick={() => setMenuOpen(false)}><span>02</span>Услуги и цены</a>
                  <a href="#mobile-about" onClick={() => setMenuOpen(false)}><span>03</span>О мастере</a>
                  <a href="#mobile-reviews" onClick={() => setMenuOpen(false)}><span>04</span>Отзывы</a>
                  <a href="#mobile-booking" onClick={() => setMenuOpen(false)}><span>05</span>Запись</a>
                </nav>
              )}
            </div>
          </div>
          <div className="mct-hero-content">
            <div className="mct-hero-ticker" aria-label="Мастер Нонна · 8 лет опыта · Москва · метро Спортивная">
              <div className="mct-hero-ticker-track" aria-hidden="true">
                <span>Мастер Нонна · 8 лет опыта · Москва · м. Спортивная</span>
                <span>Мастер Нонна · 8 лет опыта · Москва · м. Спортивная</span>
              </div>
            </div>
            <h1>Маникюр и педикюр <em>Нонны</em></h1>
            <p className="mct-hero-copy">Аккуратная техника, стерильные инструменты и внимание к деталям — в кабинете рядом с м. Спортивная.</p>
          </div>
          <figure
            className="mct-polish-display"
            role="img"
            aria-label="Иллюстрация коллекции профессиональных лаков ClayTone на четырёх полках"
          >
            <img
              className="mct-polish-shelves"
              src="/assets/polish-shelves-transparent.webp"
              alt=""
              aria-hidden="true"
              draggable="false"
            />
            <span className="mct-polish-bottles" aria-hidden="true">
              {polishBottles.map((bottle) => (
                <i className="mct-polish-bottle" key={bottle.key} style={bottle.style} />
              ))}
            </span>
          </figure>
          <div className="mct-hero-bottom">
            <div className="mct-hero-actions">
              <a className="mct-main-cta" href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, bookingUrl)}>Записаться онлайн&nbsp; →</a>
              <a className="mct-quiet-link" href="#mobile-portfolio">Смотреть работы ↓</a>
            </div>
            <div className="mct-stats" aria-label="Опыт и рейтинг мастера">
              <div className="mct-stat"><strong>8</strong><span>лет опыта</span></div>
              <div className="mct-stat"><strong>5,0 <i className="mct-stat-star">★</i></strong><span>рейтинг</span></div>
              <div className="mct-stat"><strong>95</strong><span>оценок</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="mct-section" id="mobile-portfolio">
        <div className="mct-shell mct-reveal">
          <div className="mct-section-head">
            <div><p className="mct-section-kicker">Портфолио</p><h2>До / после</h2></div>
            <p className="mct-section-note">Реальные примеры обработки, формы и покрытия</p>
          </div>
        </div>
        <div className="mct-ba-stage mct-reveal">
          <div className="mct-ba-swiper" ref={beforeAfterRef} onScroll={updateBeforeAfterIndex} aria-label={`${beforeAfter.length} примера до и после`}>
            {beforeAfter.map((item) => (
              <figure className="mct-ba-card" key={item.src}>
                <button className="mct-ba-open" type="button" onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}>
                  <img src={item.src} alt={item.alt} draggable="false" />
                </button>
                <figcaption className="mct-ba-labels"><span>До</span><span>После</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="mct-ba-pagination" aria-label={`Пример ${activeBeforeAfter + 1} из ${beforeAfter.length}`}>
            {beforeAfter.map((item, index) => (
              <button
                className={activeBeforeAfter === index ? "is-active" : ""}
                type="button"
                key={item.src}
                aria-label={`Показать пример ${index + 1}`}
                aria-current={activeBeforeAfter === index ? "true" : undefined}
                onClick={() => goToBeforeAfter(index)}
              />
            ))}
          </div>
        </div>
        <div className="mct-shell mct-reveal">
          <div className="mct-work-grid" aria-label="Подборка работ">
            {featuredWorks.map((item) => (
              <button className="mct-work-tile" type="button" key={item.src} onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </button>
            ))}
          </div>
          <button className="mct-gallery-button" type="button" onClick={() => setGalleryOpen(true)}><span>Открыть галерею</span><span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="mct-prices mct-reveal" id="mobile-prices">
        <div className="mct-shell">
          <div className="mct-price-head">
            <p className="mct-section-kicker">Услуги и цены</p>
            <h2>Выберите<br />услугу</h2>
            <span>Стоимость и продолжительность указаны заранее. Запись открывается сразу на выбранную процедуру.</span>
          </div>
          <div className="mct-tabs" role="tablist" aria-label="Категории услуг">
            <button className={`mct-tab${category === "manicure" ? " is-active" : ""}`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
            <button className={`mct-tab${category === "pedicure" ? " is-active" : ""}`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
          </div>
          <div className="mct-service-list">
            {visibleServices.map((service) => (
              <article className="mct-service-row" key={service.name}>
                <div className="mct-service-name"><strong>{service.name}</strong><small>{service.time}</small></div>
                <div className="mct-service-action"><b>{service.price}</b><a href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, service.url)}>Записаться →</a></div>
              </article>
            ))}
          </div>
          {category === "manicure" && (
            <button className={`mct-more-services${expanded ? " is-open" : ""}`} type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Свернуть услуги" : `Показать ещё ${manicure.length - 5} услуг`}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>
      </section>

      <section className="mct-about mct-reveal" id="mobile-about">
        <div className="mct-shell">
          <div className="mct-about-head">
            <div><p className="mct-section-kicker">О мастере</p><h2>Нонна — мастер<br />ClayTone</h2></div>
            <span className="mct-about-monogram" aria-hidden="true">N</span>
          </div>
          <div className="mct-about-portrait-wrap">
            <figure className="mct-about-portrait">
              <img src="/assets/nonna-about.webp" alt="Нонна, мастер маникюра и педикюра ClayTone" loading="lazy" />
            </figure>
          </div>
          <div className="mct-about-copy">
            <p className="mct-about-lead">Я Нонна — дипломированный мастер маникюра и педикюра с опытом более 8 лет.</p>
            <p>В работе для меня важны стерильность, аккуратная техника и комфорт клиента. Моя задача — создать результат, который подходит именно вам.</p>
            <ul className="mct-about-list"><li>8 лет практики</li><li>Дипломированный мастер</li><li>Индивидуальная работа</li></ul>
          </div>
        </div>
      </section>

      <section className="mct-reviews mct-reveal" id="mobile-reviews">
        <div className="mct-shell">
          <p className="mct-section-kicker">Отзывы</p><h2>Что говорят<br />клиенты</h2>
          <a className="mct-review-summary" href="https://claytone-kooperativnaja-ulitsa.clients.site/" target="_blank" rel="noreferrer"><strong>5,0</strong><span>★★★★★<br />Яндекс Карты →</span></a>
        </div>
        <div className="mct-review-viewport" aria-label="Отзывы клиентов ClayTone">
          <div className="mct-review-track">
            {[0, 1].map((setIndex) => (
              <div className="mct-review-set" key={setIndex} aria-hidden={setIndex === 1}>
                {reviews.map((review) => <article className="mct-review-card" key={`${setIndex}-${review.author}`}><span>★★★★★</span><blockquote>«{review.text}»</blockquote><small>{review.author}</small></article>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mct-final-book mct-reveal" id="mobile-booking" ref={finalBookRef}>
        <div className="mct-shell">
          <div className="mct-final-topline"><p className="mct-section-kicker">Онлайн-запись</p><span>ClayTone · Спортивная</span></div>
          <h2>Выберите удобное<br /><em>время для визита</em></h2>
          <p className="mct-final-copy">В календаре показаны актуальные свободные окна. Запись занимает около двух минут — без звонка и ожидания ответа.</p>
          <div className="mct-final-actions">
            <a className="mct-final-cta" href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, bookingUrl)}><span>Выбрать время</span><i className="mct-link-arrow" aria-hidden="true" /></a>
            <div className="mct-final-contact-row" aria-label="Другие способы связи">
              <a className="mct-final-secondary" href="tel:+79054141088"><span>Позвонить</span><i className="mct-link-arrow" aria-hidden="true" /></a>
              <a className="mct-final-secondary" href="https://t.me/nonnails" target="_blank" rel="noreferrer"><span>Telegram</span><i className="mct-link-arrow" aria-hidden="true" /></a>
            </div>
          </div>
          <div className="mct-final-facts" aria-label="Преимущества онлайн-записи">
            <span><strong>2 мин</strong><small>на запись</small></span>
            <span><strong>YCLIENTS</strong><small>актуальные окна</small></span>
            <span><strong>24 / 7</strong><small>календарь открыт</small></span>
          </div>
        </div>
      </section>

      <footer className="mct-footer">
        <div className="mct-shell mct-footer-inner">
          <div className="mct-footer-brand">ClayTone</div>
          <a className="mct-footer-address" href={routeUrl} target="_blank" rel="noreferrer" aria-label="Построить маршрут до ClayTone в Яндекс Картах">Москва, Кооперативная улица, 4, корп. 9<span>м. Спортивная · 10:00–22:00</span></a>
        </div>
      </footer>

      <div className={`mct-sticky-wrap${stickyVisible && !galleryOpen ? " is-visible" : ""}`} aria-hidden={!stickyVisible || galleryOpen}>
        <a className="mct-sticky" href="#" aria-haspopup="dialog" onClick={(event) => openYclientsWidget(event, bookingUrl)} tabIndex={stickyVisible && !galleryOpen ? 0 : -1}>
          <span className="mct-sticky-icon">C</span><span className="mct-sticky-copy"><strong>Записаться онлайн</strong><small>Календарь YCLIENTS</small></span><span className="mct-sticky-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      {galleryOpen && (
        <div className="mct-gallery-overlay" role="dialog" aria-modal="true" aria-label="Галерея ClayTone">
          <div className="mct-gallery-top"><strong>Галерея</strong><button className="mct-gallery-close" type="button" onClick={() => setGalleryOpen(false)} aria-label="Закрыть галерею">×</button></div>
          <div className="mct-gallery-content">
            <h3>До / после</h3>
            <div className="mct-gallery-ba" aria-label="До и после — горизонтальная галерея">
              {beforeAfter.map((item) => (
                <figure className="mct-gallery-ba-card" key={item.src}>
                  <button className="mct-gallery-image" type="button" onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}><img src={item.src} alt={item.alt} draggable="false" /></button>
                  <figcaption className="mct-ba-labels"><span>До</span><span>После</span></figcaption>
                </figure>
              ))}
            </div>
            <h3>Работы</h3>
            <div className="mct-gallery-works">
              {galleryWorks.map((item) => (
                <button className="mct-gallery-image" type="button" key={item.src} onClick={() => openLightbox(item.src)} aria-label={`Открыть фотографию: ${item.alt}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <div className="mct-lightbox" role="dialog" aria-modal="true" aria-label="Полноэкранный просмотр фотографии" onClick={() => setLightboxIndex(null)}>
          <button className="mct-lightbox-close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Закрыть фотографию">×</button>
          <button className="mct-lightbox-nav mct-lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); stepLightbox(-1); }} aria-label="Предыдущая фотография">‹</button>
          <figure
            className="mct-lightbox-figure"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => { lightboxTouchStart.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => finishLightboxSwipe(event.changedTouches[0]?.clientX ?? 0)}
          >
            <img src={lightboxItems[lightboxIndex].src} alt={lightboxItems[lightboxIndex].alt} draggable="false" />
            <figcaption><span>{lightboxItems[lightboxIndex].alt}</span><small>{String(lightboxIndex + 1).padStart(2, "0")} / {String(lightboxItems.length).padStart(2, "0")}</small></figcaption>
          </figure>
          <button className="mct-lightbox-nav mct-lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); stepLightbox(1); }} aria-label="Следующая фотография">›</button>
        </div>
      )}
    </div>
  );
}
