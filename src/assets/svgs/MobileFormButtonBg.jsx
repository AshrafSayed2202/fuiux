import { useId } from "react"

// Gradient submit plate of the mobile contact form (Figma "Rectangle 10", 286.7 x 48.3).
const BUTTON_PATH = "M286.667 48.3333H17.4921L0 29.6377L0 0L265.92 0L286.667 28.3333V48.3333Z"

const MobileFormButtonBg = () => {
    const id = useId()
    const fillId = `${id}-fill`
    const strokeId = `${id}-stroke`
    const maskId = `${id}-mask`

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="286.667" height="48.3333" viewBox="0 0 286.667 48.3333" fill="none">
            <path d={BUTTON_PATH} fill={`url(#${fillId})`} />
            <mask id={maskId} fill="white">
                <path d={BUTTON_PATH} />
            </mask>
            <path
                d="M0 0L0 29.6377L17.4921 48.3333H286.667V28.3333L265.92 0L0 0Z"
                strokeWidth="1.66667"
                stroke={`url(#${strokeId})`}
                mask={`url(#${maskId})`}
            />
            <defs>
                <linearGradient id={fillId} x1="0" y1="24.1667" x2="556.667" y2="24.1667" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#99001F" />
                    <stop offset="1" stopColor="#FF0033" />
                </linearGradient>
                <linearGradient id={strokeId} x1="0" y1="24.1667" x2="556.667" y2="24.1667" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF0033" />
                    <stop offset="1" stopColor="#99001F" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default MobileFormButtonBg
