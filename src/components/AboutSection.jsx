import { motion } from "framer-motion"
import AboutCard from "../ui/AboutCard"
import AboutTag from "../ui/AboutTag"
import Header from "../ui/Header"

const AboutSection = () => {
  return (
    <div className="relative lg:h-[calc(200vh+300px)]" id="about">
      <div className="relative lg:sticky top-0 lg:h-screen z-10 bg-[#0A0A0A] overflow-hidden">
        <motion.div className="relative w-full lg:h-full flex items-center">
          <div className="w-72 lg:w-175 h-60 lg:h-100 bg-[#C100071A] rounded-full blur-[80px] lg:blur-[100px] absolute -top-10 lg:-top-15" />
          <div className="w-60 lg:w-100 h-60 lg:h-100 bg-[#82181A14] rounded-full blur-[100px] lg:blur-[120px] absolute bottom-0 right-0" />
          <div className="relative w-full flex container flex-col gap-7.5 px-5 lg:px-0 py-16 lg:py-46">
            <Header header="About me" />
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-35">
              <motion.div
                className="flex flex-col gap-8 lg:gap-17.5 flex-1 justify-between"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <h1 className="text-[40px] sm:text-6xl lg:text-[80px] font-extrabold text-white leading-[125%] lg:leading-[100%] tracking-[-1.6px]">
                  Crafting digital <br />
                  <span className="neon-text">Stories</span> That <br />
                  move people.
                </h1>
                <div className="grid grid-cols-2 lg:flex gap-3 lg:gap-5">
                  <AboutCard title="8+" text="Experience" />
                  <AboutCard title="120+" text="Projects Done" />
                  <AboutCard
                    title="40+"
                    text="Happy Clients"
                    className="col-span-2 lg:col-span-1"
                  />
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col gap-8 lg:gap-10 w-full lg:max-w-147"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="flex flex-col gap-5 lg:gap-7">
                  <h2 className="text-[32px] font-bold text-[#ffffffcc] leading-[150%]">
                    I'm <span className="text-[#F03]">Fawzi Sayed</span>
                  </h2>
                  <p className="text-[18px] font-normal text-[#ffffff59]">
                    A <span className="text-[#00E5E6]">Ui/Ux designer</span> and <span className="text-[#00E5E6]">product designer</span>. Passionate about <br className="hidden lg:block" />
                    crafting unforgettable experiences and providing <br className="hidden lg:block" />
                    companies with innovative, user-centric solutions for <br className="hidden lg:block" />
                    nearly a decade.
                  </p>
                  <p className="text-[18px] font-normal text-[#ffffff59]">
                    Collaborating with global brands and agencies, I specialize <br className="hidden lg:block" />
                    in designing and developing websites and applications that <br className="hidden lg:block" />
                    prioritize interaction, motion, and visual engagement.
                  </p>
                  <p className="text-[18px] font-normal text-[#ffffff59]">
                    My work has been on converting complex issues into <br className="hidden lg:block" />
                    straightforward, user-friendly solutions that were <br className="hidden lg:block" />
                    accessible to everyone.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-2.25">
                  <AboutTag text="UI Design" />
                  <AboutTag text="UX Research" />
                  <AboutTag text="Brand Identity" />
                  <AboutTag text="Motion Design" />
                  <AboutTag text="Prototyping" />
                  <AboutTag text="Design Systems" />
                  <AboutTag text="Figma" />
                  <AboutTag text="Webflow" />
                  <AboutTag text="Interaction Design" />
                  <AboutTag text="Typography" />
                  <AboutTag text="Visual Strategy" />
                  <AboutTag text="Art Direction" />
                  <div className="hidden lg:block grow-[999] basis-0" aria-hidden="true" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default AboutSection