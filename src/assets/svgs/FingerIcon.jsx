const FingerIcon = ({ locked = false }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {/* pointing hand */}
            <path d="M14 10V9a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1" />
            <path d="M10 9.5V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v10" />
            <path d="M18 11v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
            <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            {/* tap ripple, shown while scrolling is locked */}
            {locked && (
                <>
                    <path d="M3.5 5.5A6 6 0 0 1 8 2.1" opacity="0.55" />
                    <path d="M12.5 5.5A6 6 0 0 0 8 2.1" opacity="0.55" />
                </>
            )}
        </svg>
    )
}

export default FingerIcon
