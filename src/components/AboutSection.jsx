import AboutCard from "../ui/AboutCard"
import AboutTag from "../ui/AboutTag"
import Header from "../ui/Header"

const AboutSection = () => {
  return (
    <div className="bg-[#0A0A0A] py-46">

      <div className="relative w-full flex container flex-col gap-7.5">
        <Header header="About me" />
        <div className="flex gap-35">
          <div className="flex flex-col gap-17.5 flex-1">
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
          </div>
          <div div className="flex flex-col gap-10 max-w-147">
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
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutSection