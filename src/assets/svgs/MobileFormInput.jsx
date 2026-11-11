import { useId } from "react"

// Cut-corner plate behind the mobile form fields (Figma "Rectangle 10" variants).
// `textarea` picks the 90px tall variant; `error` / `active` recolor the outline.
const SHAPES = {
    input: {
        height: 40,
        fill: "M286.667 40H17.4921L0 21.3043V0H265.92L286.667 20V40Z",
        stroke: "M0 0V21.3043L17.4921 40H286.667V20L265.92 0H0Z",
    },
    textarea: {
        height: 90,
        fill: "M286.667 90H17.4921L0 73.75V0H265.92L286.667 20V90Z",
        stroke: "M0 0V73.75L17.4921 90H286.667V20L265.92 0H0Z",
    },
}

const MobileFormInput = ({ textarea = false, error = false, active = false }) => {
    const maskId = useId()
    const shape = textarea ? SHAPES.textarea : SHAPES.input
    const stroke = error ? "#FF0033" : active ? "#FF0033" : "white"
    const strokeOpacity = error ? 1 : active ? 0.6 : 0.1

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="286.667" height={shape.height} viewBox={`0 0 286.667 ${shape.height}`} fill="none">
            <path d={shape.fill} fill="white" fillOpacity="0.02" />
            <mask id={maskId} fill="white">
                <path d={shape.fill} />
            </mask>
            <path
                d={shape.stroke}
                strokeWidth="1.66667"
                stroke={stroke}
                strokeOpacity={strokeOpacity}
                mask={`url(#${maskId})`}
                className="transition-[stroke,stroke-opacity] duration-300"
            />
        </svg>
    )
}

export default MobileFormInput
