import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
function AboutTitle(props) {
    let singleData = {
        offset: [],
        scaleProgres: [],
        opacityProgres: [],
        blurProgres: [],
        translateProgres: [],
        rotateProgres: []
    }
    const renderUiName = ()=>{
        return <span>
            Ui
            <span className='text-[#FF0033]'>/</span>
            Ux
        </span>
    }
    const renderPlusName = ()=>{
        return <span className='text-[#FF0033]'>+</span>
        
    }
    switch (props.name) {
        case 'Ui/Ux':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = ['0px 350px', '0px 0px'];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case 'Designer':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = ['0px 150px', '0px 0px'];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case '+':
            singleData['offset'] = ["0 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(10px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = ['0px 150px', '0px 0px'];
            singleData['rotateProgres'] = ['180deg', '180deg', '0deg']
            break;
        case 'Creative':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = ['0px 150px', '0px 0px'];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case 'Product':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = ['150px 0px', '-700px 0px'];
            singleData['rotateProgres'] = ['0deg', '0deg', '0deg']
            break;
        case 'Lead':
            singleData['offset'] = ["0.7 0", "1 1"];
            singleData['scaleProgres'] = [0.8, 1];
            singleData['blurProgres'] = ['blur(15px)', 'blur(0px)', 'blur(0px)'];
            singleData['translateProgres'] = ['-450px 0px', '700px 0px'];
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
    React.useEffect(() => {
    }, [])
    const scaleProgres = useTransform(scrollYProgress, [0, 1], singleData.scaleProgres)
    // const opacityProgres = useTransform(scrollYProgress, [0, 1], singleData.opacityProgres)
    const blurProgres = useTransform(scrollYProgress, [0, 0.5, 1], singleData.blurProgres)
    const translateProgres = useTransform(scrollYProgress, [0, 1], singleData.translateProgres)
    const rotateProgres = useTransform(scrollYProgress, [0, 0.5, 1], singleData.rotateProgres)
    let animateStyle = {
        scale: scaleProgres,
        filter: blurProgres,
        // opacity: opacityProgres,
        translate: translateProgres,
        rotate: rotateProgres,
    }
    return (
        <motion.div
            className='text-[200px] mb-10 text-white font-extrabold'
            style={animateStyle}
            ref={ref}
        >{props.name == 'Ui/Ux'? renderUiName() : props.name == '+'?renderPlusName() :  props.name}</motion.div>
    )
}

export default AboutTitle