import  { useState, useEffect } from 'react';
import Main from '../assets/images/soundButton/main.png';
import Rythm1 from '../assets/images/soundButton/rythm1.png';
import Rythm2 from '../assets/images/soundButton/rythm2.png';
import Rythm3 from '../assets/images/soundButton/rythm3.png';
import Rythm4 from '../assets/images/soundButton/rythm4.png';
import Rythm5 from '../assets/images/soundButton/rythm5.png';
import Rythm6 from '../assets/images/soundButton/rythm6.png';
import Rythm7 from '../assets/images/soundButton/rythm7.png';

const SoundButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [rythmIndex, setRythmIndex] = useState(0);

  const rythmImages = [Rythm1, Rythm2, Rythm3, Rythm4, Rythm5, Rythm6, Rythm7];

  // Handle automatic rhythm cycling only when active
  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setRythmIndex((prev) => (prev + 1) % rythmImages.length);
      }, 180); // ~5.5 cycles per second - nice rhythmic feel
    } else {
      setRythmIndex(0); // reset to first frame when stopped
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className="group cursor-pointer relative inline-flex items-center justify-center rounded-full p-2 transition-all duration-200 active:scale-[0.94] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-sky-400"
      aria-pressed={isActive}
      aria-label={isActive ? 'Stop rhythm animation' : 'Start rhythm animation'}
    >
      <div className="relative w-12 h-12">
        {/* MAIN IMAGE - rotates 180° and changes opacity only when active */}
        <img
          src={Main}
          alt="Sound Button Main Image"
          className={`w-full h-full object-contain transition-all duration-[650ms] ease-out ${
            isActive
              ? 'opacity-100 rotate-0'
              : 'opacity-40 rotate-180'
          }`}
        />

        {/* RHYTHM CONTAINER - overlays inside the main image */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out pointer-events-none ${
            isActive ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <img
            src={rythmImages[rythmIndex]}
            alt={`Rhythm frame ${rythmIndex + 1}`}
            className="w-[40%] h-[40%] object-contain"
          />
        </div>
      </div>
    </button>
  );
};

export default SoundButton;