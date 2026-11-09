import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

const DESIGN_WIDTH = 1440;

const useViewportFactor = () => {
    const getFactor = () =>
        typeof window === 'undefined'
            ? 1
            : Math.min(1, Math.max(0.2, window.innerWidth / DESIGN_WIDTH));

    const [factor, setFactor] = React.useState(getFactor);

    React.useEffect(() => {
        const onResize = () => setFactor(getFactor());
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return factor;
};

function AboutTitle(props) {
    const factor = useViewportFactor();
    const px = (n) => `${Math.round(n * factor)}px`;
    const tr = (x, y) => `${px(x)} ${px(y)}`;

    let singleData = {
        offset: [],
        scaleProgres: [],
        opacityProgres: [],
        blurProgres: [],
        translateProgres: [],
        rotateProgres: []
    }
    const renderUiName = () => {
        return <span>
            Ui
            <span className='text-[#FF0033]'>/</span>
            Ux
        </span>
    }
    const renderPlusName = () => {
        return <span className='text-[#FF0033]'>+</span>

    }
    switch (props.name) {
        case 'Ui/Ux':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = [tr(0, 350), tr(0, 0)];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case 'Designer':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = [tr(0, 150), tr(0, 0)];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case '+':
            singleData['offset'] = ["0 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(10px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = [tr(0, 150), tr(0, 0)];
            singleData['rotateProgres'] = ['180deg', '180deg', '0deg']
            break;
        case 'Creative':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = [tr(0, 150), tr(0, 0)];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case 'Product':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = [tr(150, 0), tr(-700, 0)];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case 'Lead':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = [tr(-450, 0), tr(700, 0)];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        default:
            break;
    }
    const ref = React.useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: singleData.offset
    })
    const scaleProgres = useTransform(scrollYProgress, [0, 1], singleData.scaleProgres)
    const blurProgres = useTransform(scrollYProgress, [0, 0.5, 1], singleData.blurProgres)
    const translateProgres = useTransform(scrollYProgress, [0, 1], singleData.translateProgres)
    const rotateProgres = useTransform(scrollYProgress, [0, 0.5, 1], singleData.rotateProgres)
    let animateStyle = {
        fontSize: 'clamp(44px, 13.9vw, 200px)',
        scale: scaleProgres,
        filter: blurProgres,
        translate: translateProgres,
        rotate: rotateProgres,
    }
    return (
        <motion.div
            className='mb-10 sm:mb-10 py-2 sm:py-0 text-white font-extrabold whitespace-nowrap leading-none sm:leading-normal'
            style={animateStyle}
            ref={ref}
        >{props.name == 'Ui/Ux' ? renderUiName() : props.name == '+' ? renderPlusName() : props.name}</motion.div>
    )
}

export default AboutTitle