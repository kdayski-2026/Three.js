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
    year: 2021,
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
        href: 'dao-app-src.vercel.app/',
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
