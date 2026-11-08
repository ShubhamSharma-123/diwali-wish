import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const wishes = [
  {
    tag: "01 / FOR THE DREAMERS",
    title: "May your dreams glow brighter",
    text: "May every little hope in your heart find its own beautiful light. May the coming year surprise you with joy you never saw coming.",
    icon: "✦",
  },
  {
    tag: "02 / FOR THE FAMILY",
    title: "A home full of warmth",
    text: "May your home echo with laughter, your table gather loved ones, and every diya remind you of the people who make life golden.",
    icon: "❀",
  },
  {
    tag: "03 / FOR NEW BEGINNINGS",
    title: "Here’s to all that awaits",
    text: "May you leave behind what weighs you down and step into a year of courage, abundance, and a thousand wonderful beginnings.",
    icon: "✧",
  },
  {
    tag: "04 / FROM MY HEART",
    title: "A little light, just for you",
    text: "Some people make the world brighter simply by being in it. This Diwali, I hope the universe gives that brightness back to you.",
    icon: "♡",
  },
];
const sparks = Array.from({ length: 32 }, (_, i) => ({
  left: `${(i * 37.7) % 100}%`,
  delay: (i * 0.73) % 9,
  duration: 7 + (i % 7),
  size: 1 + (i % 3),
}));
function Diya({ large = false, delay = 0 }) {
  return (
    <div
      className={`diya ${large ? "diya-large" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flame-halo" />
      <div className="flame" />
      <div className="wick" />
      <div className="bowl">
        <div className="bowl-line" />
      </div>
      <div className="diya-foot" />
    </div>
  );
}
function Fireworks({ burst }) {
  return (
    <AnimatePresence>
      {burst && (
        <div className="fireworks" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="firework"
              style={{
                left: `${12 + ((i * 13) % 78)}%`,
                top: `${12 + ((i * 17) % 55)}%`,
                animationDelay: `${i * 0.19}s`,
              }}
            >
              {Array.from({ length: 12 }, (_, j) => (
                <i key={j} style={{ "--angle": `${j * 30}deg` }} />
              ))}
            </div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
export default function App() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(0);
  const [lit, setLit] = useState(false);
  const [burst, setBurst] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sound, setSound] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("to");
    if (q) setName(q.slice(0, 35));
  }, []);
  const recipient = name.trim() || "you";
  const message = `🪔 Shubh Deepawali, ${recipient}! ✨\n\n${wishes[selected].text}\n\nWith love & light, Shubham ❤️`;
  const celebrate = () => {
    setLit(true);
    setBurst(false);
    setTimeout(() => setBurst(true), 50);
    setTimeout(() => setBurst(false), 3600);
  };
  const share = async () => {
    const url = new URL(window.location.href);
    if (name.trim()) url.searchParams.set("to", name.trim());
    const data = {
      title: "A Diwali wish from Shubham",
      text: message,
      url: url.toString(),
    };
    try {
      if (navigator.share) await navigator.share(data);
      else
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message + "\n" + url.toString())}`,
          "_blank",
          "noopener,noreferrer",
        );
    } catch (e) {
      if (e.name !== "AbortError") copy();
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy your wish:", message);
    }
  };
  return (
    <div className="site">
      <div className="noise" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="sparks" aria-hidden="true">
        {sparks.map((s, i) => (
          <span
            key={i}
            style={{
              left: s.left,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </div>
      <Fireworks burst={burst} />
      <header className="nav shell">
        <a className="brand" href="#home">
          <span className="brand-mark">✺</span>
          <span>
            SHUBHAM <small>presents</small>
          </span>
        </a>
        <div className="nav-center">A CELEBRATION OF LIGHT</div>
        <a href="#wishes" className="nav-link">
          Explore wishes <ArrowUpRight size={15} />
        </a>
      </header>
      <main>
        <section id="home" className="hero shell">
          <div className="hero-side left-side">
            <span>✧</span>
            <span>LIGHT OVER DARKNESS</span>
            <span>✧</span>
          </div>
          <div className="hero-side right-side">
            <span>✧</span>
            <span>JOY · LOVE · PROSPERITY</span>
            <span>✧</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-inner"
          >
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE FESTIVAL OF A THOUSAND LIGHTS
              <span className="eyebrow-line" />
            </div>
            <div className="ornament-top">
              ❈ <span>✦</span> ❈
            </div>
            <h1>
              <span className="happy">Wishing you a</span>
              <span className="diwali-title">
                Happy <em>Diwali</em>
              </span>
            </h1>
            <p className="hindi">शुभ दीपावली</p>
            <p className="hero-copy">
              May your days be painted in gold, your nights sparkle with wonder,
              <br className="desktop" /> and your heart always find a reason to
              shine.
            </p>
            <div className="diya-stage">
              <div className="stage-glow" />
              <div className="stage-ring ring-one" />
              <div className="stage-ring ring-two" />
              <div className="side-diya side-diya-left">
                <Diya delay={0.4} />
              </div>
              <Diya large />
              <div className="side-diya side-diya-right">
                <Diya delay={0.8} />
              </div>
              <span className="stage-star star-one">✧</span>
              <span className="stage-star star-two">✦</span>
              <span className="stage-star star-three">✧</span>
            </div>
            <div className="hero-actions">
              <button className="primary-btn" onClick={celebrate}>
                <Sparkles size={17} />
                {lit ? "Celebrate Again" : "Light Up the Night"}
                <ArrowUpRight size={17} />
              </button>
              <a className="secondary-btn" href="#wishes">
                Discover the wishes <span>↓</span>
              </a>
            </div>
            <p className="signature-intro">
              A LITTLE MAGIC, SENT WITH LOVE BY <strong>SHUBHAM</strong>
            </p>
          </motion.div>
          <div className="hero-bottom">
            <span>✧ HANDCRAFTED WITH LOVE</span>
            <span>SCROLL TO EXPLORE ↓</span>
            <span>DIWALI 2026 ✧</span>
          </div>
        </section>
        <section id="wishes" className="wishes-section">
          <div className="shell">
            <div className="section-top">
              <span className="kicker">
                ✦ &nbsp; WORDS FROM THE HEART &nbsp; ✦
              </span>
              <h2>
                Little wishes.
                <br />
                <em>Endless light.</em>
              </h2>
              <p>
                Because the most beautiful part of Diwali is sharing a little
                happiness with the people who matter.
              </p>
            </div>
            <div className="wish-grid">
              {wishes.map((w, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  onClick={() => setSelected(i)}
                  key={w.tag}
                  className={`wish-card ${selected === i ? "selected" : ""}`}
                >
                  <span className="wish-card-top">
                    <span>{w.tag}</span>
                    <span className="wish-symbol">{w.icon}</span>
                  </span>
                  <span className="wish-card-title">{w.title}</span>
                  <span className="wish-card-copy">{w.text}</span>
                  <span className="wish-card-bottom">
                    {selected === i ? "SELECTED WISH" : "CHOOSE THIS WISH"}{" "}
                    <ArrowUpRight size={16} />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
        <section className="personalize-section shell">
          <div className="personalize-card">
            <div className="personalize-decoration deco-a">✺</div>
            <div className="personalize-decoration deco-b">✺</div>
            <div className="personalize-copy">
              <span className="kicker">✦ &nbsp; MAKE IT PERSONAL</span>
              <h2>
                A wish, <em>just for you.</em>
              </h2>
              <p>
                Put a name on the magic. Create a heartfelt greeting and send a
                little light to someone special.
              </p>
              <label htmlFor="recipient">WHO ARE WE CELEBRATING?</label>
              <div className="name-input-wrap">
                <input
                  id="recipient"
                  maxLength={35}
                  placeholder="Enter their beautiful name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span>✧</span>
              </div>
              <div className="share-actions">
                <button className="primary-btn" onClick={share}>
                  <Share2 size={16} />
                  Share the magic
                  <ArrowUpRight size={16} />
                </button>
                <button className="copy-btn" onClick={copy}>
                  {copied ? <Check size={17} /> : <Copy size={17} />}{" "}
                  {copied ? "Copied!" : "Copy wish"}
                </button>
              </div>
            </div>
            <div className="greeting-preview">
              <div className="preview-inner">
                <span className="preview-top">A LITTLE LIGHT FOR YOU</span>
                <span className="preview-ornament">✦ ❈ ✦</span>
                <div className="preview-diya">
                  <Diya />
                </div>
                <span className="preview-happy">Happy Diwali</span>
                <h3>
                  {name.trim() ? `Dear ${name.trim()},` : "To someone special,"}
                </h3>
                <p>{wishes[selected].text}</p>
                <div className="preview-divider">✧ &nbsp; ✧ &nbsp; ✧</div>
                <span className="preview-sign">
                  With love & light,
                  <br />
                  <strong>Shubham</strong>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="closing">
          <div className="closing-ornament">✧ &nbsp; ❈ &nbsp; ✧</div>
          <p>
            May the light within you always shine brighter
            <br className="desktop" /> than the lights around you.
          </p>
          <h2>Shubh Deepawali</h2>
          <div className="closing-diyas">
            <Diya />
            <Diya />
            <Diya />
          </div>
          <span>WITH ALL MY LOVE, SHUBHAM ♡</span>
        </section>
      </main>
      <footer className="footer shell">
        <span>✺ SHUBHAM</span>
        <span>MADE OF LIGHT, LOVE & A LITTLE MAGIC</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
