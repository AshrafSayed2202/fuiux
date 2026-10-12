import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#FF0033_0%,_transparent_50%)]" />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ffffff05] rotate-12" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#ffffff05] -rotate-6" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="mb-4 text-[#FF0033]">
          <svg width="36" height="32" viewBox="0 0 36 32" fill="none">
            <path d="M18 2L34 30H2L18 2Z" stroke="#FF0033" strokeWidth="2" fill="none" />
            <path d="M18 12V20" stroke="#FF0033" strokeWidth="2" />
            <circle cx="18" cy="24" r="1.2" fill="#FF0033" />
          </svg>
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-6">System Error 404</p>

        <h1
          className="text-6xl md:text-8xl font-black tracking-tight mb-6"
          style={{
            WebkitTextStroke: "1px #FF0033",
            color: "transparent",
          }}
        >
          ERROR 404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Looks like you hit a dead end.
        </h2>
        <p className="text-sm text-white/50 mb-10 max-w-md">
          This page has gone off the map. Let’s get you back to the good stuff.
        </p>

        <Link
          to="/"
          className="relative bg-[#FF0033] px-10 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#ff1a4a] transition-colors overflow-hidden"
        >
          <span className="absolute -left-3 -bottom-3 h-6 w-6 rotate-45 bg-[#0A0A0A]" />
          <span className="absolute -right-3 -top-3 h-6 w-6 rotate-45 bg-[#0A0A0A]" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound