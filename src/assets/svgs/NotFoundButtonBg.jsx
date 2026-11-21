import { useId } from "react"

// Gradient plate behind the mobile 404 "GET IN TOUCH" button (Figma "Rectangle 10", 250 x 58).
const BUTTON_PATH = "M250 58H25.4739L0 30.8913V0H219.787L250 29V58Z"

const NotFoundButtonBg = () => {
    const id = useId()
    const fillId = `${id}-fill`
    const strokeId = `${id}-stroke`
    const maskId = `${id}-mask`

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="58" viewBox="0 0 250 58" fill="none">
            <path d={BUTTON_PATH} fill={`url(#${fillId})`} />
            <mask id={maskId} fill="white">
                <path d={BUTTON_PATH} />
            </mask>
            <path
                d="M0 0V30.8913L25.4739 58H250V29L219.787 0H0Z"
                strokeWidth="2"
                stroke={`url(#${strokeId})`}
                mask={`url(#${maskId})`}
            />
            <defs>
                <linearGradient id={fillId} x1="0" y1="29" x2="250" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#99001F" />
                    <stop offset="1" stopColor="#FF0033" />
                </linearGradient>
                <linearGradient id={strokeId} x1="0" y1="29" x2="250" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF0033" />
                    <stop offset="1" stopColor="#99001F" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default NotFoundButtonBg
