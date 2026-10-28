import { motion } from "framer-motion"
import AboutCard from "../ui/AboutCard"
import AboutTag from "../ui/AboutTag"
import Header from "../ui/Header"

const AboutSection = () => {
  return (
    <div className="relative" style={{ height: "calc(200vh + 300px)" }} id="about">
      <div className="sticky top-0 h-screen z-10 bg-[#0A0A0A] overflow-hidden">
        <motion.div className="relative w-full h-full flex items-center">
          <div className="w-175 h-100 bg-[#C100071A] rounded-full blur-[100px] absolute -top-15" />
          <div className="w-100 h-100 bg-[#82181A14] rounded-full blur-[120px] absolute bottom-0 right-0" />
          <div className="relative w-full flex container flex-col gap-7.5 py-46">
            <Header header="About me" />
            <div className="flex gap-35">
              <motion.div
                className="flex flex-col gap-17.5 flex-1 justify-between"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h1 className="text-[80px] font-extrabold text-white leading-[100%] tracking-[-1.6px]">
                  Crafting digital <br />
                  <span className="neon-text">Stories</span> That <br />
                  move people.
                </h1>
                <div className="flex gap-5">
                  <AboutCard title="8+" text="Experience" />
                  <AboutCard title="120+" text="Projects Done" />
                  <AboutCard title="40+" text="Happy Clients" />
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col gap-10 max-w-147"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex flex-col gap-7">
                  <h2 className="text-[32px] font-bold text-[#ffffffcc] leading-[150%]">
                    I'm <span className="text-[#F03]">Fawzi Sayed</span>
                  </h2>
                  <p className="text-[18px] font-normal text-[#ffffff59]">
                    A <span className="text-[#00E5E6]">Ui/Ux designer</span> and <span className="text-[#00E5E6]">product designer</span>. Passionate about <br />
                    crafting unforgettable experiences and providing <br />
                    companies with innovative, user-centric solutions for <br />
                    nearly a decade.
                  </p>
                  <p className="text-[18px] font-normal text-[#ffffff59]">
                    Collaborating with global brands and agencies, I specialize <br />
                    in designing and developing websites and applications that <br />
                    prioritize interaction, motion, and visual engagement.
                  </p>
                  <p className="text-[18px] font-normal text-[#ffffff59]">
                    My work has been on converting complex issues into <br />
                    straightforward, user-friendly solutions that were <br />
                    accessible to everyone.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.25">
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