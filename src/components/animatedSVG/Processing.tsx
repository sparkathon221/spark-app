
import React from 'react'

export default function Processing() {
	return (
		<span>
			<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stop-color="#4facfe" />
						<stop offset="100%" stop-color="#00f2fe" />
					</linearGradient>

					<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				<circle cx="50" cy="50" r="40" stroke="#e0e0e0" stroke-width="8" fill="none" opacity="0.2" />
				<path
					fill="none"
					stroke="url(#gradient)"
					stroke-width="8"
					stroke-linecap="round"
					stroke-dasharray="80 200"
					d="M50,10 a40,40 0 1,1 -0.01,0"
					filter="url(#glow)">
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 50 50"
						to="360 50 50"
						dur="1.2s"
						repeatCount="indefinite"
					/>
				</path>
			</svg>

		</span>
	)
}

