import React from 'react'

export const AnimatedRecord = () => {
	return (
		<span>
			<svg width="100" height="60" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
				<rect x="10" y="20" width="10" height="20" fill="#3498db">
					<animate attributeName="height" values="20;40;20" dur="0.6s" repeatCount="indefinite" />
					<animate attributeName="y" values="20;10;20" dur="0.6s" repeatCount="indefinite" />
				</rect>
				<rect x="25" y="15" width="10" height="30" fill="#3498db">
					<animate attributeName="height" values="30;45;30" dur="0.6s" begin="0.1s" repeatCount="indefinite" />
					<animate attributeName="y" values="15;7.5;15" dur="0.6s" begin="0.1s" repeatCount="indefinite" />
				</rect>
				<rect x="40" y="25" width="10" height="10" fill="#3498db">
					<animate attributeName="height" values="10;30;10" dur="0.6s" begin="0.2s" repeatCount="indefinite" />
					<animate attributeName="y" values="25;15;25" dur="0.6s" begin="0.2s" repeatCount="indefinite" />
				</rect>
				<rect x="55" y="15" width="10" height="30" fill="#3498db">
					<animate attributeName="height" values="30;50;30" dur="0.6s" begin="0.3s" repeatCount="indefinite" />
					<animate attributeName="y" values="15;5;15" dur="0.6s" begin="0.3s" repeatCount="indefinite" />
				</rect>
				<rect x="70" y="20" width="10" height="20" fill="#3498db">
					<animate attributeName="height" values="20;35;20" dur="0.6s" begin="0.4s" repeatCount="indefinite" />
					<animate attributeName="y" values="20;12.5;20" dur="0.6s" begin="0.4s" repeatCount="indefinite" />
				</rect>
			</svg>
		</span>
	)
}
