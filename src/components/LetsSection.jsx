import LetsButton from "../assets/svgs/LetsButton"
import LetsLight from "../assets/svgs/LetsLight"
import Header from "../ui/Header"
import LetsChar1 from "../assets/images/letsChar1.png"
import LetsChar2 from "../assets/images/letsChar2.png"
import LetsBg1 from "../assets/images/LetsBg1.png"
import LetsBg2 from "../assets/images/LetsBg2.png"
const LetsSection = () => {
  return (
    <div className="bg-[#0A0A0A] relative min-h-screen flex items-center justify-center overflow-hidden!" id="contact">
      <img src={LetsBg1} alt="lets-bg-1" className="absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]" />
      <img src={LetsBg2} alt="lets-bg-2" className="absolute top-1/2 left-1/2 object-cover translate-x-[-50%] translate-y-[-50%]" />
      <img src={LetsChar1} alt="lets-char-1" className="absolute bottom-0 right-0 h-full object-cover object-center" />
      <img src={LetsChar2} alt="lets-char-2" className="absolute bottom-0 left-0 h-full object-cover object-center" />
      <div className="relative w-full flex container flex-col gap-14 pt-20 pb-30">
        <Header header="Let's collaborate" centered={true} Line={false} />
        <h1 className="text-[80px] font-extrabold text-white text-center leading-[100%] tracking-[-1.6px]">
          Have a project in
          <span className="neon-text"> mind? </span>
        </h1>
        <p className="text-white/40 text-base font-normal leading-6 text-center">
          I'm open to freelance projects, full-time roles, and long-term <br /> partnerships. Let's make something great together.
        </p>
        <div className="flex justify-center items-center">
          <div className="absolute flex items-center justify-center gap-2 leading-6">
            <span className="relative size-4">
              <span className="absolute bg-[#ff0033] w-1 h-full block top-1/2 rounded-md left-1/2 translate-x-[-50%] translate-y-[-50%]"></span>
              <span className="absolute bg-[#ff0033] w-full h-1 block top-1/2 rounded-md left-1/2 translate-x-[-50%] translate-y-[-50%]"></span>
            </span>
            <span className="text-sm text-white font-bold tracking-tight">Create</span>
            <span className="bg-[#ff0033] w-1 h-11 block rounded-md"></span>
            <span className="text-sm text-white font-bold tracking-tight relative">
              <p className="relative z-2">Web Product</p>
              <span className="block absolute left-[-55%] top-1/2 translate-y-[-50%]"><LetsLight /></span>
            </span>
          </div>
          <LetsButton />
        </div>
      </div>
    </div>
  )
}
export default LetsSection