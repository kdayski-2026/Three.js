import { Html, useHelper } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

const YEARS = [
  {
    year: 2020,
    links: [
      { label: 'Demolit Logo', href: 'https://demolit-logo.vercel.app/', color: '#000000' },
      { label: 'Prengi', href: 'https://prengi.vercel.app/', color: '#ffffff' },
      { label: 'Uber', href: 'https://uber-nine-cyan.vercel.app/', color: '#1eacc7' },
      { label: 'Yoga', href: 'https://yoga-sigma-ashy.vercel.app/', color: '#c78030' },
      { label: 'Global Opt', href: 'https://global-opt-self.vercel.app/', color: '#ec644b' },
      { label: 'Pulse', href: 'https://pulse-three-ebon.vercel.app/', color: '#ffffff' },
    ],
  },
  {
    year: '2021 - 2022',
    links: [
      {
        label: 'Robotics',
        href: 'https://robotics-front.vercel.app/',
        color: '#ffffff',
      },
      {
        label: 'Kick Lottery',
        href: 'https://kick-lottery.vercel.app/',
        color: '#ffffff',
      },
      {
        label: 'Dao app',
        href: 'https://dao-app-src.vercel.app/',
        color: '#ffffff',
      },
      {
        label: 'Weezi web',
        href: 'https://weezi-web.vercel.app/',
        color: '#ffffff',
      },
      {
        label: 'Enoty',
        href: 'https://enoty.vercel.app/',
        color: '#533be2',
      },
      {
        label: 'Bialliance',
        href: 'https://bialliance.vercel.app/',
        color: '#6c757d',
      },
    ],
  },
  {
    year: '2023 - 2025',
    links: [
      {
        label: 'Tymio',
        href: 'https://tymio-landing.vercel.app/',
        color: '#1c102f',
      },
      {
        label: '0xCoin',
        href: 'https://0xcoin-front.vercel.app/',
        color: '#160042',
      },
    ],
  },
  {
    year: '2026',
    links: [
      {
        label: 'This portfolio =D',
        href: '#',
        color: '#000000',
      },
    ],
  },
];

export default function Frame() {
  const rectAreaRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [link, setLink] = useState(null);
  const [light, setLight] = useState('#000000');
  const [openYear, setOpenYear] = useState(2020);
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
    setPendingLight(color ?? '#000000');
    setLink(href);
  };

  const goBack = () => {
    setLink(null);
    setLoaded(false);
    setLight('#000000');
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
                  Практикующий Fullstack разработчик. Начинал с изучения широкого спектра технологий. Последние 3 года
                  профессионально развиваюсь в сфере JavaScript и Web3. Имею успешный опыт реализации проектов "под
                  ключ": от лендингов до сложных децентрализованных приложений. Всегда открыт к новому.
                  <br />
                  <br />
                  2019 год.
                  <br />
                  Обучался программированию, за год получив множество сертификатов. Изучал 1C, C#, Python, PHP, JS, CSS,
                  HTML, SQL.
                  <br />
                  <br />
                  2020 год.
                  <br />
                  Писал коммерческий код для компании ООО "Русский дистрибьютор". Победили в тюменском хакатоне
                  "НЕЙРОНЕФТЬ". Реализовали госзаказ для работы с криптографией на основе ГОСТ. Написал множество
                  лендингов и пет-проектов.
                  <br />
                  <br />
                  2021 - 2022 год.
                  <br />
                  Разработка Web3 приложений, среди которых Weezi. Weezi - веб-приложение для создания
                  децентрализованной организации, в сети блокчейн.
                  <br />
                  <br />
                  2022 - 2025 год.
                  <br />
                  Разработка Tymio - децентрализованный протокол, предназначенный для создания структурированных
                  финансовых продуктов в сфере криптовалют.
                  <br />
                  <br />
                  2026 год.
                  <br />
                  Изучение и практика Three.js. Создал свое уникальное портфолио.
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
