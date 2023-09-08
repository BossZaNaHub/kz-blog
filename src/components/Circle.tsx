const Circle = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="246" height="246" viewBox="0 0 246 246" fill="none">
            <g filter="url(#filter0_d_122_3)">
                <circle cx="121" cy="121" r="119" fill="url(#paint0_linear_122_3)" shapeRendering="crispEdges"/>
            </g>
            <defs>
                <filter id="filter0_d_122_3" x="0" y="0" width="246" height="246" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="2" dy="2"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_122_3"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_122_3" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_122_3" x1="121" y1="2" x2="121" y2="240" gradientUnits="userSpaceOnUse">
                <stop stopColor="#78A5FC"/>
                <stop offset="1" stopColor="#5776B1" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    )
}

export default Circle