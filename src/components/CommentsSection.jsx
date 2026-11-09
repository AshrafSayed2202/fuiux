"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "../ui/Header"
import CommentContainer from "../assets/svgs/CommentContainer"
import commentor1 from "../assets/images/commentor1.png"
import commentor2 from "../assets/images/commentor2.png"
import commentor3 from "../assets/images/commentor3.png"
import commentor4 from "../assets/images/commentor4.png"
import commentor5 from "../assets/images/commentor5.png"
import commentor6 from "../assets/images/commentor6.png"
import secondaryHoverSound from "../assets/sounds/secondary-hover.wav"
import clickSound from "../assets/sounds/click.wav"

const comments = [
  {
    id: 1,
    name: "Daryna Solodukha",
    title: "Graphic Designer",
    image: commentor1,
    text: "I am impressed by Fawzi's passion and his attention to detail. Every project we collaborate on turns out better than I could have ever expected. I can't wait for our future projects.",
  },
  {
    id: 2,
    name: "Charlotte Kelly",
    title: "Manager, TechGropse",
    image: commentor2,
    text: "Fawzi is the best at what he does! His designs are clean, innovative, and user-friendly. He truly added value to our mobile app and received praise from all users.",
  },
  {
    id: 3,
    name: "Bader Alhammad",
    title: "Founder, Koora Break",
    image: commentor3,
    text: "Fawzi has an exceptional ability to transform complex ideas into simple, engaging, and user friendly experiences. His creativity, strategic thinking, and attention to detail have made a real impact on Koora Break.",
  },
  {
    id: 4,
    name: "Khalid Alkhudair",
    title: "CEO, SMC",
    image: commentor4,
    text: "Working with Fawzi has been a great experience. He combines creativity with a strong understanding of both user and business needs, consistently delivering thoughtful designs that add real value to our product.",
  },
  {
    id: 5,
    name: "Matt Bauman",
    title: "Manger, Numero",
    image: commentor5,
    text: "Finding a designer who genuinely listens and understands your vision is outstanding. The delivered designs were exceptional, and the willingness to adapt and tweak ensured our complete satisfaction. Highly recommended for anyone seeking a distinguished design experience.",
  },
  {
    id: 6,
    name: "Yousef Khaleel",
    title: "CTO, EXAB",
    image: commentor6,
    text: "As a CTO, I worked with Fawzi on several projects, and he stood out for his ability to turn ideas into tangible, innovative digital experiences. He combines visual craft with a deep understanding of users, creating designs that look compelling, make sense, and feel effortless to use.",
  },
]

const companies = [
  "KOORA BREAK",
  "UXBERT",
  "BFIRO",
  "VOENOX",
  "LEAN.SA",
  "GOOGLE",
  "SKRILL",
  "SLACK",
]
const CARD_W = 896
const CARD_H = 372

const ScaledComment = ({ children }) => {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(0.37)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(Math.min(1, el.clientWidth / CARD_W))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="w-full" style={{ height: CARD_H * scale }}>
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  )
}
const CommentsSection = () => {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const comment = comments[active]
  const filledDots = (active + 1) * 5

  const playSecondaryHover = () => {
    const audio = new Audio(secondaryHoverSound)
    audio.volume = 0.15
    audio.play().catch(() => { })
  }
  const playClickHover = () => {
    const audio = new Audio(clickSound)
    audio.volume = 0.45
    audio.play().catch(() => { })
  }

  const go = (step) => {
    setDir(step)
    setActive((current) => (current + step + comments.length) % comments.length)
  }

  return (
    <div className="bg-[#0A0A0A] relative min-h-screen overflow-hidden!" id="testimonials">
      <style>{`
        @keyframes comment-swap {
          from { opacity: 0; transform: translateX(var(--comment-x)); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes trusted-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .comment-swap {
          animation: comment-swap 0.45s ease;
        }
        .trusted-ticker {
          animation: trusted-ticker 28s linear infinite;
        }
      `}</style>
      <div className="relative w-full flex container flex-col gap-6.25 px-5 xl:px-0 pt-16 xl:pt-20 pb-20 xl:pb-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Header header="Testimonials" />
        </motion.div>

        <motion.div
          className="relative flex items-end justify-between gap-4 xl:gap-6 pb-4 xl:pb-6 border-b border-white/3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <h1 className="text-[38px] sm:text-6xl xl:text-[80px] font-extrabold text-white leading-[100%] tracking-[-0.8px] xl:tracking-[-1.6px]">
            What Clients
            <br className="xl:hidden" />
            <span className="neon-text"> Say ?</span>
          </h1>
          <div className="absolute right-0 bottom-4 xl:static flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => { go(-1); playClickHover() }}
              onMouseEnter={playSecondaryHover}
              className="w-9 h-9 xl:w-10 xl:h-10 grid place-items-center rounded-lg cursor-pointer text-[#FF0033] bg-[#FF0033]/10 hover:bg-[#FF0033]/70 hover:text-white duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => { go(1); playClickHover() }}
              onMouseEnter={playSecondaryHover}
              className="w-9 h-9 xl:w-10 xl:h-10 grid place-items-center rounded-lg cursor-pointer text-[#FF0033] bg-[#FF0033]/10 hover:bg-[#FF0033]/70 hover:text-white duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden xl:block h-93 mt-30 mb-10 -translate-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="absolute flex w-full h-full justify-center gap-6">
            <div className="relative h-93 w-72 shrink-0">
              <div className="absolute inset-0" />
              <img
                key={comment.id}
                src={comment.image}
                alt={comment.name}
                className="comment-swap absolute inset-0 h-full ml-auto"
                style={{ "--comment-x": dir > 0 ? "18px" : "-18px" }}
              />
            </div>
            <div className="relative">
              <div className="absolute left-[13%] top-[9%] text-white flex flex-col gap-1.5 font-semibold">
                <p className="text-2xl">{comment.name}</p>
                <p className="opacity-80 text-base">{comment.title}</p>
              </div>
              <div className="absolute left-[50%] translate-x-[-50%] top-[33%] text-white/80 w-[75%]">
                <p className="text-2xl">{comment.text}</p>
              </div>
              <CommentContainer />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 absolute bottom-[1%] left-[48.3%]">
            {Array.from({ length: 30 }).map((_, index) => {
              const filled = index < filledDots
              return (
                <span
                  key={index}
                  className={`block size-3.25 rounded-none skew-x-[-50deg] transition-all duration-200 ${filled ? "bg-[#FF2B2B] shadow-[0_0_6px_#FF2B2B]" : "bg-[#FF003333]"
                    }`}
                  style={{
                    transitionDelay: filled ? `${index * 18}ms` : `${(29 - index) * 10}ms`,
                  }}
                />
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="xl:hidden flex flex-col items-center gap-4 mt-2 mb-2 w-full max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <img
            key={comment.id}
            src={comment.image}
            alt={comment.name}
            className="comment-swap h-52 sm:h-64 w-auto"
            style={{ "--comment-x": dir > 0 ? "18px" : "-18px" }}
          />

          <ScaledComment>
            <div className="relative" style={{ width: CARD_W, height: CARD_H }}>
              <div className="absolute left-[13%] top-[9%] text-white flex flex-col gap-1.5 font-semibold">
                <p className="text-2xl">{comment.name}</p>
                <p className="opacity-80 text-base">{comment.title}</p>
              </div>
              <div className="absolute left-[50%] translate-x-[-50%] top-[33%] text-white/80 w-[75%]">
                <p key={comment.id} className="comment-swap text-2xl" style={{ "--comment-x": dir > 0 ? "18px" : "-18px" }}>
                  {comment.text}
                </p>
              </div>
              <CommentContainer />
              <div className="flex items-center gap-1.5 absolute bottom-1 left-67.75">
                {Array.from({ length: 30 }).map((_, index) => {
                  const filled = index < filledDots
                  return (
                    <span
                      key={index}
                      className={`block size-3.25 rounded-none skew-x-[-50deg] transition-all duration-200 ${filled ? "bg-[#FF2B2B] shadow-[0_0_6px_#FF2B2B]" : "bg-[#FF003333]"
                        }`}
                      style={{
                        transitionDelay: filled ? `${index * 18}ms` : `${(29 - index) * 10}ms`,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </ScaledComment>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <span className=" shrink-0 text-[11px] xl:text-[12px] text-[#ff6467] uppercase leading-4 tracking-[3px] xl:tracking-[3.60px] flex items-center gap-3">
              Trusted by
            </span>
            <span className="h-px flex-1 bg-white/3" />
          </div>
          <div className="relative mt-4 xl:mt-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 xl:w-16 bg-linear-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 xl:w-16 bg-linear-to-l from-[#0A0A0A] to-transparent z-10" />
            <div className="trusted-ticker flex w-max items-center gap-10 xl:gap-16">
              {[...companies, ...companies].map((company, index) => (
                <span
                  key={`${company}-${index}`}
                  className="text-[16px] sm:text-[22px] xl:text-[28px] font-extrabold tracking-[0.12em] uppercase text-white/18 whitespace-nowrap"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CommentsSection