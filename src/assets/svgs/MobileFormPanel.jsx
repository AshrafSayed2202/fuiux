import { useId } from "react"

// Inner panel of the mobile contact form (Figma "Vector 35", 329.2 x 465.8).
const PANEL_PATH =
    "M7.5 60.4167H12.0833V146.25H0V465.833H47.0833L64.1667 448.333H149.167L163.75 463.333L267.917 462.917L328.75 406.667V173.75H321.667V124.167H329.167V91.6667H316.25V0.833333H244.583L220 21.6667H26.6667L7.5 0V60.4167Z"

const MobileFormPanel = () => {
    const gradientId = useId()
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="329.167" height="465.833" viewBox="0 0 329.167 465.833" fill="none">
            <path d={PANEL_PATH} fill="#0A0A0A" />
            <path d={PANEL_PATH} fill={`url(#${gradientId})`} fillOpacity="0.2" />
            <defs>
                <linearGradient id={gradientId} x1="318.75" y1="91.25" x2="318.75" y2="403.333" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF0033" />
                    <stop offset="1" stopColor="#99001F" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default MobileFormPanel
