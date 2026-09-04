"use client"

import { useState } from "react"
import Header from "../ui/Header"
import CommentContainer from "../assets/svgs/CommentContainer"
import commentor1 from "../assets/images/commentor1.png"
import commentor2 from "../assets/images/commentor2.png"
import commentor3 from "../assets/images/commentor3.png"
import commentor4 from "../assets/images/commentor4.png"
import commentor5 from "../assets/images/commentor5.png"
import commentor6 from "../assets/images/commentor6.png"
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
    name: "Aziz Ben Naif",
    title: "CEO, AZ IT",
    image: commentor6,
    text: "Working with Fawzi was an exceptional experience! His understanding of project details was outstanding, and the results exceeded our expectations. I highly recommend him to anyone looking for engaging and effective design solutions",
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

const CommentsSection = () => {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const comment = comments[active]
  const filledDots = (active + 1) * 5

  const go = (step) => {
    setDir(step)
    setActive((current) => (current + step + comments.length) % comments.length)
  }

  return (
    <div className="bg-[#0A0A0A] relative min-h-screen overflow-hidden!">
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
      <div className="relative w-full flex container flex-col gap-6.25 pt-20 pb-30">
        <Header header="Testimonials" />

        <div className="relative flex items-end justify-between gap-6 pb-6 border-b border-white/3">
          <h1 className="text-[80px] font-extrabold text-white leading-[100%] tracking-[-1.6px]">
            What Clients
            <span className="neon-text"> Say ?</span>
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => go(-1)}
              className="w-10 h-10 grid place-items-center rounded-lg cursor-pointer text-[#FF0033] bg-[#FF0033]/10 hover:bg-[#FF0033]/70 hover:text-white duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="w-10 h-10 grid place-items-center rounded-lg cursor-pointer text-[#FF0033] bg-[#FF0033]/10 hover:bg-[#FF0033]/70 hover:text-white duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative h-93 my-30 -translate-y-12">
          <div className="absolute flex w-full h-full justify-center gap-6">
            <img
              key={comment.id}
              src={comment.image}
              alt={comment.name}
              className="comment-swap inset-0 max-h-93"
              style={{ "--comment-x": dir > 0 ? "18px" : "-18px" }}
            />
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
          <div className="flex items-center gap-1.5 mt-2 absolute bottom-[0%] left-[46.7%]">
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
        <div className="mt-16">
          <div className="flex items-center gap-4">
            <span className=" shrink-0 text-[12px] text-[#ff6467] uppercase leading-4 tracking-[3.60px] flex items-center gap-3">
              Trusted by
            </span>
            <span className="h-px flex-1 bg-white/3" />
          </div>
          <div className="relative mt-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#0A0A0A] to-transparent z-10" />
            <div className="trusted-ticker flex w-max items-center gap-16">
              {[...companies, ...companies].map((company, index) => (
                <span
                  key={`${company}-${index}`}
                  className="text-[28px] font-extrabold tracking-[0.12em] uppercase text-white/18 whitespace-nowrap"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsSection