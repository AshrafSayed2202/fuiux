"use client"

import { useState } from "react"
import Header from "../ui/Header"
import PricingCardNumb from "../assets/svgs/PricingCardNumb"
import PricingCardNumb2 from "../assets/svgs/PricingCardNumb2"
import PricingBtn from "../assets/svgs/pricingBtn"
import PricingConnector from "../assets/svgs/PricingConnector"
import PricingBorder from "../assets/svgs/PricingBorder"

const plans = [
  {
    id: "part-time",
    title: "PART TIME",
    featured: false,
    progress: 6,
    prices: {
      hourly: 50,
      monthly: 1000,
    },
    features: [
      { label: "Up to 5 screen designs", included: true },
      { label: "1 revision round", included: true },
      { label: "Figma source files", included: true },
      { label: "7-day delivery", included: true },
      { label: "Basic style guide", included: true },
      { label: "Design system", included: false },
      { label: "Motion design", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    id: "full-time",
    title: "FULL TIME",
    featured: true,
    progress: 12,
    prices: {
      hourly: 100,
      monthly: 2000,
    },
    features: [
      { label: "Up to 20 screen designs", included: true },
      { label: "3 revision rounds", included: true },
      { label: "Figma source files", included: true },
      { label: "14-day delivery", included: true },
      { label: "Full design system", included: true },
      { label: "Basic motion design", included: true },
      { label: "Priority support", included: true },
      { label: "Dedicated designer", included: false },
      { label: "White-glove onboarding", included: false },
    ],
  },
  {
    id: "team-leader",
    title: "TEAM LEADER",
    featured: false,
    progress: 9,
    prices: {
      hourly: 170,
      monthly: 3400,
    },
    features: [
      { label: "Unlimited screens", included: true },
      { label: "Unlimited revisions", included: true },
      { label: "Figma + all source files", included: true },
      { label: "Dedicated designer", included: true },
      { label: "Full design system", included: true },
      { label: "Advanced motion & 3D", included: true },
      { label: "White-glove onboarding", included: true },
      { label: "24/7 priority support", included: true },
    ],
  },
]

const CheckIcon = ({ active }) => (
  <span className="rounded-full bg-[#EF444426]">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3.2 7.2L5.8 9.8L10.8 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-[#FF2B2B]" : "text-white/25"}
      />
    </svg>
  </span>
)

const CrossIcon = () => (
  <span className="rounded-full bg-[#FFFFFF0A]">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M4 4L10 10M10 4L4 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="text-white/25"
      />
    </svg>
  </span>
)

const PricingSection = () => {
  const [billing, setBilling] = useState("monthly")
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="bg-[#0A0A0A] relative min-h-screen overflow-hidden!">
      <div className="relative w-full flex container flex-col gap-6.25 pt-20 pb-30">
        <Header header="Pricing" centered={true} />
        <h1 className="text-[80px] font-extrabold text-white text-center leading-[100%] tracking-[-1.6px]">
          Simple,
          <span className="neon-text"> transparent </span> pricing.
        </h1>
        <p className="text-white/40 text-base font-normal leading-6 text-center">
          No hidden fees. No vague scope. Pick the plan that fits your project and <br /> let&apos;s build something remarkable.
        </p>

        <div className="flex justify-center mt-2 ">
          <div className="flex items-center gap-1.25 rounded-lg p-1.25 border border-white/10">
            <button
              type="button"
              onClick={() => setBilling("hourly")}
              className={`px-8 py-3.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${billing === "hourly"
                ? "text-[#FF2B2B] border border-[#FF2B2B] bg-[#FF2B2B]/10"
                : "text-white/70 border border-transparent"
                }`}
            >
              Hourly
            </button>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-8 py-3.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${billing === "monthly"
                ? "text-[#FF2B2B] border border-[#FF2B2B] bg-[#FF2B2B]/10"
                : "text-white/70 border border-transparent"
                }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 items-end">
          {plans.map((plan) => {
            const isHovered = hoveredId === plan.id
            const isMid = plan.featured
            const price = plan.prices[billing]
            const intervalLabel = billing === "monthly" ? "Month" : "Hour"
            const filledCount = isHovered ? plan.progress : 0

            return (
              <article
                key={plan.id}
                onMouseEnter={() => setHoveredId(plan.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative flex flex-col ${isMid ? "h-164.5" : "h-154.5"}`}
              >
                <div className="absolute z-3 left-0 top-0 scale-[0.95]">
                  <span className={`duration-300 absolute z-3 ${(isMid) ? 'opacity-100' : 'opacity-0'}`}>
                    <PricingCardNumb2 isHovered={isHovered} />
                  </span>
                  <span className={`duration-300 absolute z-3 ${(isMid) ? 'opacity-0' : 'opacity-100'}`}>
                    <PricingCardNumb isHovered={isHovered} />
                  </span>
                </div>
                <div className={`absolute z-5 right-12 ${isMid ? "top-16.5" : "top-10"} flex flex-col-reverse gap-1.25`}>
                  {Array.from({ length: 12 }).map((_, index) => {
                    const filled = index < filledCount
                    return (
                      <span
                        key={index}
                        className={`block h-6.5 skew-y-[-45deg] w-6.5 rounded-none transition-all duration-300 ${filled
                          ? "bg-[#FF2B2B] shadow-[0_0_6px_#FF2B2B]"
                          : isMid ? "bg-[#FF003333]" : "bg-[#FFFFFF0F]"
                          }`}
                        style={{
                          transitionDelay: filled
                            ? `${index * 40}ms`
                            : `${(11 - index) * 20}ms`,
                        }}
                      />
                    )
                  })}
                </div>
                <div className={`absolute z-3 left-[21.5%] top-[6.5%] scale-[0.95]`}>
                  <PricingBorder isHovered={isHovered} isMid={isMid} />
                  <div className="flex flex-col z-5 items-center mb-8 absolute top-0">
                    <div
                      className={`relative w-52.5 h-52.5 flex flex-col items-center justify-center`}>
                      <span className={`text-[11px] tracking-[0.18em] uppercase mb-3 duration-300 ${(isHovered || isMid) ? "text-[#FF0033]" : "text-white/36"}`}>
                        {plan.title}
                      </span>
                      <span className={`text-white/80 text-5xl font-extrabold leading-14 duration-300 ${isHovered ? "scale-125" : ""}`}>
                        ${price.toLocaleString()}
                      </span>
                      <span
                        className={`mt-3 duration-300 text-sm ${(isHovered || isMid) ? "text-[#FF0033]" : "text-white/36"}`}
                      >
                        {intervalLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="flex flex-col relative z-5 gap-3 flex-1 justify-end mb-[25%] ml-[5%]">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-center gap-2.5">
                      {feature.included ? <CheckIcon active={true} /> : <CrossIcon />}
                      <span
                        className={`text-sm leading-5 tracking-wide duration-300 line-clamp-1 truncate ${feature.included ?
                          isHovered? "text-white/90":"text-white/65"
                          :
                          isHovered ? "text-white/50 line-through" : "text-white/25 line-through"
                          }`}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="absolute z-3 left-2.25 bottom-12.75 scale-[0.95] cursor-pointer">
                  <PricingBtn isHovered={isHovered} isMid={isMid} />
                  <button
                    type="button"
                    className={`absolute duration-300 font-bold text-nowrap ${isHovered ? "text-white" : "text-[#ffffff99]"} top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}
                  >
                    Get Started
                  </button>
                </div>
                <div className={`absolute z-3 left-45 bottom-15 scale-[0.95] duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                  <PricingConnector isMid={isMid} />
                </div>

              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PricingSection