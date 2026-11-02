const WhatsAppContainer = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="260"
            viewBox="0 0 120 260"
            fill="none"
        >
            <foreignObject x="-20" y="-20" width="160" height="300">
                <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                        backdropFilter: 'blur(10px)',
                        height: '100%',
                        width: '100%',
                    }}
                />
            </foreignObject>
            <mask id="stroke0_3293_4119" fill="white">
                <path d="M0 240.864V260H98.673L120 240.864V20.4706V0H100.982L83 20.4706H0V240.864Z" />
            </mask>
            <path
                data-figma-bg-blur-radius="20"
                d="M0 260V240.864V20.4706H83L100.982 0H120V20.4706V240.864L98.673 260H0Z"
                strokeWidth="2"
                stroke="url(#paint0_linear_3293_4119)"
                strokeOpacity="0.5"
                mask="url(#stroke0_3293_4119)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_3293_4119"
                    x1="-211.765"
                    y1="229.647"
                    x2="-35.2939"
                    y2="229.647"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF0033" />
                    <stop offset="1" stopColor="#99001F" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default WhatsAppContainer;