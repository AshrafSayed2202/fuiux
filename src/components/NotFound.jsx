import { Link } from "react-router-dom"
import NotFoundIcon from "../assets/svgs/NotFoundIcon"
import LetsBg1 from "../assets/images/LetsBg1.png"
import LetsBg2 from "../assets/images/LetsBg2.png"
const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center flex-col gap-12 text-white relative overflow-hidden">
      <img src={LetsBg1} alt="lets-bg-1" className="absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]" />
      <img src={LetsBg2} alt="lets-bg-2" className="absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]" />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ffffff05] rotate-12" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#ffffff05] -rotate-6" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-5">
        <NotFoundIcon />
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#FF6467]">System Error 404</p>
        <h1
          className="neon-text text-9xl font-extrabold leading-[100%]"
        >
          ERROR 404
        </h1>

        <h2 className="text-7xl font-extrabold text-white">
          Looks like you hit a dead end.
        </h2>
        <p className="text-lg text-white/40 text-nowrap">
          This page has gone off the map. Let's get you back to the good stuff.
        </p>

      </div>
        <Link
          to="/"
        className="relative bg-linear-to-r from-red-800 to-rose-600 px-15 py-5 text-sm font-bold uppercase tracking-widest text-white transition-colors overflow-hidden"
        >
        <span className="absolute -left-5 -bottom-5 h-10 w-10 rotate-45 bg-[#0A0A0A]" />
        <span className="absolute -right-5 -top-5 h-10 w-10 rotate-45 bg-[#0A0A0A]" />
          Back to Home
      </Link>
    </div>
  )
}

export default NotFound