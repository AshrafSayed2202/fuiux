import {useNavigate} from "react-router-dom";
const TextLogo = ({ active }) => {
  const navigate = useNavigate();
  const onLogoClick = ()  => {
    if (active) {
      window.location.href = "mailto:info@fuiux.com";
    } else {
      document.getElementById("home")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      navigate("/#home")
    }
  };

  return (
    <div
      onClick={onLogoClick}
      className={`text-4xl font-bold text-white flex items-center relative group cursor-pointer duration-200 z-60 whitespace-nowrap ${active ? "hover:underline max-sm:text-2xl max-sm:translate-x-24" : "hover:scale-[1.1]"
        }`}
    >
      <span
        className={`absolute right-full group-hover:underline top-0 ${active ? "opacity-100" : "opacity-0"
          } duration-300`}
      >
        INFO
        <span className="text-[#FF0033]">@</span>
      </span>
      <span
        className={`${active ? "text-white" : "text-[#FF0033]"
          } duration-300`}
      >
        F
      </span>
      UIUX
      <span
        className={`absolute left-full group-hover:underline top-0 ${active ? "opacity-100" : "opacity-0"
          } duration-300`}
      >
        .COM
      </span>
    </div>
  );
};

export default TextLogo;