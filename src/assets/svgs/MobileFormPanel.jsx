import { useId } from "react"

// Inner panel of the mobile contact form (Figma "Vector 35", 343.5 x 469.4).
const PANEL_PATH =
    "M4.0411 32.5533H6.51065V78.8014H0V469.384H52.3097L61.5145 459.954H138.744L146.602 468.036H198.014L204.749 460.628L282.428 460.179L290.061 467.812H313.409L343.269 437.504V93.6187H339.452V66.9026H343.493V49.3912H336.533V0.449011H275.468L262.222 11.6743H14.3683L4.0411 0V32.5533Z"

const MobileFormPanel = () => {
    const gradientId = useId()
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="344" height="470" viewBox="0 0 344 470" fill="none">
            <path d={PANEL_PATH} fill="#0A0A0A" />
            <path d={PANEL_PATH} fill={`url(#${gradientId})`} fillOpacity="0.2" />
            <defs>
                <linearGradient id={gradientId} x1="171.747" y1="49.1667" x2="171.747" y2="217.321" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF0033" />
                    <stop offset="1" stopColor="#99001F" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default MobileFormPanel
