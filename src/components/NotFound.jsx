import { Link } from "react-router-dom"
import NotFoundIcon from "../assets/svgs/NotFoundIcon"
import NotFoundButtonBg from "../assets/svgs/NotFoundButtonBg"
import LetsBg1 from "../assets/images/LetsBg1.png"
import LetsBg2 from "../assets/images/LetsBg2.png"

// Mobile background tiles (Figma "404", 390x844 frame). Each tile's top-left corner is
// given as an offset from the frame center so the pattern stays centered on any phone.
const TILE = 128.6
const MOBILE_TILES = [
  { x: 63.8, y: -321, from: "#130F0E", to: "#0A0A0A" },
  { x: 192.4, y: -192.4, from: "#0F0F0F", to: "#090305" },
  { x: -64.8, y: -192.4, from: "#141011", to: "#080808" },
  { x: -193.4, y: -192.4, from: "#0A0A0A", to: "#0A0A0A" },
  { x: -322, y: -192.4, from: "#130F0E", to: "#0A0A0A" },
  { x: -193.4, y: -63.8, from: "#130F0E", to: "#030303" },
  { x: -64.8, y: 64.8, from: "#130F0E", to: "#030303" },
  { x: 63.8, y: 193.4, from: "#130F0E", to: "#030303" },
  { x: 63.8, y: -63.8, from: "#130F0E", to: "#030303" },
]

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center flex-col gap-12 max-lg:gap-[31px] max-lg:py-10 text-white relative overflow-hidden">
      {/* Desktop background */}
      <img src={LetsBg1} alt="" className="max-lg:hidden absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]" />
      <img src={LetsBg2} alt="" className="max-lg:hidden absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]" />
      <div className="max-lg:hidden absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ffffff05] rotate-12" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#ffffff05] -rotate-6" />
      </div>

      {/* Mobile background: gradient tiles and a soft red glow */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" aria-hidden="true">
        {MOBILE_TILES.map((t, i) => (
          <div
            key={i}
            className="absolute border border-[#0B0B0B]"
            style={{
              width: TILE,
              height: TILE,
              left: `calc(50% + ${t.x}px)`,
              top: `calc(50% + ${t.y}px)`,
              backgroundImage: `linear-gradient(-49.67deg, ${t.from} 0%, ${t.to} 100%)`,
            }}
          />
        ))}
        <div className="absolute left-1/2 top-[calc(50%+41px)] size-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF0033]/5 blur-[250px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-lg:px-5 max-lg:w-full max-lg:max-w-97.5 gap-5">
        <NotFoundIcon />
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#FF6467] max-lg:font-[Inter,sans-serif] max-lg:text-[12px] max-lg:leading-4 max-lg:tracking-[3.6px]">
          System Error 404
        </p>
        <h1 className="neon-text text-9xl font-extrabold leading-[100%] max-lg:mt-[11px] max-lg:text-[40px] max-lg:leading-normal">
          ERROR 404
        </h1>

        <h2 className="text-7xl font-extrabold text-white max-lg:-mt-5 max-lg:w-77 max-lg:text-[40px] max-lg:leading-normal max-lg:tracking-[-1.6px]">
          Looks like you hit a dead end.
        </h2>
        <p className="text-lg text-white/40 text-nowrap max-lg:mt-[11px] max-lg:text-wrap max-lg:text-[12px] max-lg:leading-[26px]">
          This page has gone off the map. Let's get you back to the good stuff.
        </p>
      </div>

      {/* Desktop action */}
      <Link
        to="/"
        className="max-lg:hidden relative bg-linear-to-r from-red-800 to-rose-600 px-15 py-5 text-sm font-bold uppercase tracking-widest text-white transition-colors overflow-hidden"
      >
        <span className="absolute -left-5 -bottom-5 h-10 w-10 rotate-45 bg-[#0A0A0A]" />
        <span className="absolute -right-5 -top-5 h-10 w-10 rotate-45 bg-[#0A0A0A]" />
        Back to Home
      </Link>

      {/* Mobile action (Figma 250x58 cut-corner plate) */}
      <Link
        to="/"
        className="lg:hidden relative z-10 w-62.5 h-14.5 cursor-pointer group"
      >
        <span className="absolute inset-0 transition-[filter] duration-300 group-hover:brightness-110 group-active:brightness-90">
          <NotFoundButtonBg />
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[14px] font-bold leading-5 tracking-[0.35px] text-white">
          BACK TO HOME
        </span>
      </Link>
    </div>
  )
}

export default NotFound
