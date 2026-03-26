import { Html, useHelper } from '@react-three/drei';
import { useRef, useState } from 'react';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

const YEARS = [
  {
    year: 2020,
    links: [
      { label: 'Мок: отчёт за Q1', href: 'https://example.com/2020/q1', color: '#5900ff' },
      { label: 'Мок: отчёт за Q2', href: 'https://example.com/2020/q2', color: '#5900ff' },
      { label: 'Мок: презентация', href: 'https://example.com/2020/deck', color: '#5900ff' },
    ],
  },
  {
    year: 2021,
    links: [
      { label: 'Мок: релиз-ноты', href: 'https://example.com/2021/release-notes', color: '#5900ff' },
      { label: 'Мок: дашборд', href: 'https://example.com/2021/dashboard', color: '#5900ff' },
      { label: 'Мок: роадмап', href: 'https://example.com/2021/roadmap', color: '#5900ff' },
    ],
  },
  {
    year: 2022,
    links: [
      { label: 'Мок: кейс клиента', href: 'https://example.com/2022/case-study', color: '#5900ff' },
      { label: 'Мок: метрики', href: 'https://example.com/2022/metrics', color: '#5900ff' },
      { label: 'Мок: документация', href: 'https://example.com/2022/docs', color: '#5900ff' },
    ],
  },
  {
    year: 2023,
    links: [
      { label: 'Мок: блог-пост', href: 'https://example.com/2023/blog', color: '#5900ff' },
      { label: 'Мок: витрина', href: 'https://example.com/2023/showcase', color: '#5900ff' },
      { label: 'Мок: заметки', href: 'https://example.com/2023/notes', color: '#5900ff' },
    ],
  },
  {
    year: 2024,
    links: [
      { label: 'Мок: план работ', href: 'https://example.com/2024/plan', color: '#5900ff' },
      { label: 'Мок: дизайн-спека', href: 'https://example.com/2024/spec', color: '#5900ff' },
      { label: 'Мок: прототип', href: 'https://example.com/2024/prototype', color: '#5900ff' },
    ],
  },
  {
    year: 2025,
    links: [
      { label: 'Мок: каталог', href: 'https://example.com/2025/catalog', color: '#5900ff' },
      { label: 'Мок: аналитика', href: 'https://example.com/2025/analytics', color: '#5900ff' },
      { label: 'Мок: changelog', href: 'https://example.com/2025/changelog', color: '#5900ff' },
    ],
  },
  {
    year: 2026,
    links: [
      { label: 'Мок: стратегия', href: 'https://example.com/2026/strategy', color: '#5900ff' },
      { label: 'Мок: OKR', href: 'https://example.com/2026/okr', color: '#5900ff' },
      { label: 'Мок: презентация', href: 'https://example.com/2026/deck', color: '#5900ff' },
    ],
  },
];

export default function Frame() {
  const rectAreaRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [link, setLink] = useState(null);
  const [light, setLight] = useState('#5900ff');
  const [openYear, setOpenYear] = useState(2026);
  const [pendingLight, setPendingLight] = useState(null);

  const handleIframeLoaded = () => {
    setLoaded(true);
    if (pendingLight) setLight(pendingLight);
  };

  const disableTopClick = (e) => {
    e.stopPropagation();
  };

  const openLink = (href, color) => {
    setLoaded(false);
    setPendingLight(color ?? null);
    setLink(href);
  };

  const goBack = () => {
    setLink(null);
    setLoaded(false);
    setPendingLight(null);
  };

  //   useHelper(rectAreaRef, RectAreaLightHelper, 1);

  return (
    <>
      <rectAreaLight
        ref={rectAreaRef}
        castShadow={false}
        width={2.3}
        height={1.3}
        intensity={30}
        color={light}
        rotation={[0, Math.PI, 0]}
        position={[0, 0.1, 0]}
      />
      <Html transform scale={0.05} wrapperClass="htmlScreen" distanceFactor={1.96} position={[0, 0.1, -0.004]}>
        {!link && (
          <div className="overlay" onClick={disableTopClick}>
            <div className="overlayContent">
              <div className="owner">
                <div className="ownerName">Кальховен Игорь</div>
                <div className="ownerDescription">
                  Привет всем. Я разработчик игр. Хочу сделать сетевую игруху про поезда по типу DerailValey но с
                  экономикой и поддержкой модов. Пишите свои предложения и пожелания буду очень признателен
                </div>
              </div>
              <div className="overlayMain">
                <div className="accordion">
                  {YEARS.map(({ year, links }) => {
                    const isOpen = openYear === year;
                    return (
                      <div key={year} className={`accordionItem ${isOpen ? 'isOpen' : ''}`}>
                        <button
                          type="button"
                          className="accordionTrigger"
                          onClick={(e) => {
                            disableTopClick(e);
                            setOpenYear((prev) => (prev === year ? null : year));
                          }}
                        >
                          <span className="accordionYear">{year}</span>
                          <span className="accordionChevron" aria-hidden="true" />
                        </button>

                        {isOpen && (
                          <div className="accordionPanel" onClick={disableTopClick}>
                            {links.map((l) => (
                              <button
                                key={l.href}
                                type="button"
                                className="mockLink"
                                onClick={(e) => {
                                  disableTopClick(e);
                                  openLink(l.href, l.color);
                                }}
                              >
                                {l.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {link && (
          <div className="iframeWrap" onClick={disableTopClick}>
            <div className="iframeTopBar">
              <button type="button" className="iframeBackBtn" onClick={goBack}>
                Назад
              </button>
              <div className="iframeUrl" title={link}>
                {link}
              </div>
            </div>
            {!loaded && <div className="iframeLoader">Загрузка…</div>}
            <iframe src={link} onLoad={handleIframeLoaded} />
          </div>
        )}
      </Html>
    </>
  );
}
