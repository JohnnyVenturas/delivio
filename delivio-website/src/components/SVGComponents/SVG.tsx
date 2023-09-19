import { useLocation, useNavigate } from "react-router-dom";

export function LocationPinPoint({ width }: { width?: string }) {
	const widthStyle = {
		width: width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="46"
			fill="none"
			viewBox="0 0 46 46"
			style={widthStyle}
		>
			<g clip-path="url(#a)" style={widthStyle}>
				<path
					fill="#4D94FE"
					d="M23 .644C14.455.647 7.538 7.568 7.535 16.109c.006 1.256.267 2.517.665 3.849.7 2.324 1.854 4.863 3.189 7.43 4.004 7.679 9.696 15.592 9.728 15.636L23 45.644l1.88-2.62c.022-.028 3.337-4.645 6.68-10.219 1.672-2.792 3.353-5.823 4.644-8.689.645-1.433 1.193-2.827 1.596-4.158.398-1.332.656-2.593.662-3.85C38.459 7.569 31.542.648 23 .645Zm10.364 17.982c-.558 1.86-1.604 4.21-2.865 6.623-1.888 3.627-4.243 7.416-6.12 10.28-.502.766-.963 1.46-1.38 2.073a156.666 156.666 0 0 1-4.907-7.712c-1.558-2.629-3.082-5.428-4.189-7.933-.553-1.247-1.001-2.42-1.299-3.436-.3-1.01-.44-1.87-.435-2.412a10.802 10.802 0 0 1 3.17-7.66A10.799 10.799 0 0 1 23 5.275a10.796 10.796 0 0 1 7.658 3.172 10.792 10.792 0 0 1 3.173 7.66c.004.562-.145 1.46-.466 2.518Z"
				/>
				<path
					fill="#4D94FE"
					d="M23.002 11.078a5.029 5.029 0 1 0 0 10.06 5.029 5.029 0 0 0 0-10.06Z"
				/>
			</g>
			<defs>
				<clipPath id="a" style={widthStyle}>
					<path fill="#fff" d="M.5.644h45v45H.5z" />
				</clipPath>
			</defs>
		</svg>
	);
}

export function ArrowDown({ width }: { width?: string }) {
	const widthStyle = {
		width: width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="31"
			fill="none"
			viewBox="0 0 31 31"
			style={widthStyle}
		>
			<g clip-path="url(#a)" style={widthStyle}>
				<path
					fill="#4D94FE"
					fill-rule="evenodd"
					d="m30.5 8.98-2.109-2.086-12.91 12.392-1.377-1.322.007.007-11.47-11.01L.5 9.015l14.98 14.379c2.2-2.109.056-.052 15.02-14.415Z"
					clip-rule="evenodd"
				/>
			</g>
			<defs>
				<clipPath id="a" style={widthStyle}>
					<path fill="#fff" d="M.5.144h30v30H.5z" />
				</clipPath>
			</defs>
		</svg>
	);
}

export function Account({ width }: { width?: string }) {
	const widthStyle = {
		width: width,
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="64"
			fill="none"
			viewBox="0 0 64 65"
			style={widthStyle}
		>
			<path
				stroke="var(--clr-primary-500)"
				stroke-miterlimit="10"
				stroke-width="3.736"
				d="M31.999 34.757c8.439 0 15.28-6.84 15.28-15.28 0-8.439-6.841-15.28-15.28-15.28-8.44 0-15.28 6.841-15.28 15.28 0 8.44 6.84 15.28 15.28 15.28Z"
			/>
			<path
				stroke="var(--clr-primary-500)"
				stroke-miterlimit="10"
				stroke-width="3.736"
				d="m4 62.757.987-5.466a27.467 27.467 0 0 1 44.6-16.106 27.467 27.467 0 0 1 9.426 16.159L60 62.81"
			/>
		</svg>
	);
}

export function Basket({ width }: { width?: string }) {
	const widthStyle = {
		width: width,
	};
	const navigation = useNavigate();
	const location = useLocation();
	let color = "var(--clr-primary-500)";
	if(location.pathname === "/Magazin/Cos") {
		color = "var(--clr-secondary-400)";
	}


	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="33"
			fill="none"
			viewBox="0 0 33 33"
			style={widthStyle}
			onClick={() => navigation({ pathname: "/Magazin/Cos" })}
		>
			<path
				stroke={color}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.977"
				d="m31.906 12.907-10-11.25m10 11.25h-30m30 0-2.261 12.72c-.623 3.506-3.36 6.03-6.537 6.03H10.705c-3.178 0-5.914-2.524-6.537-6.03l-2.262-12.72m0 0 10-11.25"
			/>
		</svg>
	);
}

export function Whatsapp({ width }: { width?: string }) {
	const widthStyle = {
		width: width,
	};
	const navigation = useNavigate();
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="31"
			fill="none"
			viewBox="0 0 31 31"
			style={widthStyle}
			onClick={() => navigation({ pathname: "/Magazin/" })}
		>
			<path
				fill="var(--clr-primary-500)"
				d="M15.906.657c-8.276 0-15 6.723-15 15 0 2.66.73 5.143 1.947 7.31L.93 29.829a.652.652 0 0 0 .785.809l7.155-1.774c2.102 1.123 4.488 1.793 7.036 1.793 8.277 0 15-6.724 15-15 0-8.277-6.723-15-15-15Zm0 1.304c7.572 0 13.696 6.124 13.696 13.696 0 7.571-6.124 13.695-13.696 13.695-2.427 0-4.7-.633-6.677-1.738a.652.652 0 0 0-.475-.064l-6.266 1.553 1.68-5.995a.652.652 0 0 0-.065-.508 13.617 13.617 0 0 1-1.892-6.943C2.21 8.085 8.335 1.96 15.906 1.96Zm-5.45 5.87c-.418 0-1.015.155-1.506.684-.294.317-1.522 1.513-1.522 3.616 0 2.192 1.52 4.084 1.704 4.327h.002v.001a20.66 20.66 0 0 0 1.959 2.402c1.176 1.239 2.83 2.67 4.882 3.546.945.402 1.69.645 2.256.822 1.047.33 2 .28 2.717.174.536-.08 1.126-.337 1.71-.706.583-.37 1.155-.828 1.407-1.526.18-.5.272-.962.305-1.343.017-.19.02-.358.007-.513-.012-.155 0-.274-.144-.512-.304-.499-.648-.512-1.006-.69-.2-.098-.767-.375-1.337-.646-.568-.271-1.06-.511-1.364-.62-.191-.068-.425-.167-.763-.13-.337.039-.67.283-.865.57-.184.273-.924 1.147-1.15 1.404-.003-.002.017.007-.073-.037-.279-.138-.62-.256-1.126-.522a9.316 9.316 0 0 1-1.829-1.27v-.002c-1.03-.906-1.75-2.044-1.978-2.426.015-.018-.002.004.03-.028l.002-.001c.233-.23.439-.503.613-.704.247-.284.355-.535.474-.769.235-.467.104-.98-.032-1.25v-.002c.01.019-.074-.165-.163-.376-.09-.212-.204-.486-.326-.78-.245-.585-.517-1.242-.68-1.627v-.001c-.19-.454-.449-.78-.787-.938-.337-.158-.636-.113-.648-.113h-.001a17.084 17.084 0 0 0-.768-.014Zm0 1.304c.251 0 .5.003.707.013.213.01.2.011.159-.008-.042-.02.015-.026.136.262.159.377.433 1.037.678 1.625.122.293.237.57.329.786.091.216.14.336.198.452l.002.002c.056.112.05.04.031.08-.137.272-.156.34-.295.5-.212.244-.428.516-.543.629-.1.098-.28.252-.393.552-.113.3-.06.712.12 1.02.242.41 1.037 1.704 2.273 2.792a10.66 10.66 0 0 0 2.083 1.446c.579.305 1.05.484 1.156.536.25.124.525.22.843.182.32-.038.594-.231.769-.43.233-.264.925-1.054 1.257-1.54.014.005.01 0 .12.04v.002c.051.018.682.3 1.244.568.562.268 1.133.546 1.318.638.268.132.394.219.427.219.002.057.005.12-.004.214a4.143 4.143 0 0 1-.233 1.013c-.069.19-.426.582-.878.867-.45.286-1 .487-1.203.517-.612.09-1.338.123-2.135-.127a21.82 21.82 0 0 1-2.135-.778c-1.81-.773-3.349-2.086-4.448-3.244-.55-.578-.99-1.117-1.303-1.524-.313-.407-.45-.619-.563-.768l-.001-.002c-.202-.267-1.44-1.988-1.44-3.538 0-1.64.762-2.284 1.175-2.729a.773.773 0 0 1 .549-.267Z"
			/>
		</svg>
	);
}

export function Exit({ width }: { width?: string }) {
	const widthStyle = {
		width: width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="51"
			fill="none"
			viewBox="0 0 51 51"
			style={widthStyle}
		>
			<path fill="#FE5C01" d="M4.273 40.06 40.506 4.55l4.932 5.032-36.232 35.51-4.933-5.032Z" />
			<path fill="#FE5C01" d="m9.395 4.05 35.51 36.233-5.032 4.932L4.363 8.982 9.394 4.05Z" />
		</svg>
	);
}

export function Enter({ width }: { width?: string }) {
	const widthStyle = {
		width: width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="47"
			fill="none"
			viewBox="0 0 47 47"
			style={widthStyle}
		>
			<path
				fill="#000"
				d="M7.227 6.48h33.12v4.6H7.227v-4.6Zm0 14.72h33.12v4.6H7.227v-4.6Zm0 14.72h33.12v4.6H7.227v-4.6Z"
			/>
		</svg>
	);
}

export function SearchButtonSVG({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="50"
			fill="none"
			viewBox="0 0 50 51"
			style={widthStyle}
		>
			<path
				fill="#0166FE"
				fill-rule="evenodd"
				d="M36.387 33.469a20.123 20.123 0 0 0 4.42-12.614c0-11.16-9.048-20.208-20.209-20.208C9.438.647.391 9.695.391 20.855c0 11.16 9.047 20.208 20.207 20.208 4.772 0 9.157-1.654 12.614-4.419l12.72 12.72a2.245 2.245 0 1 0 3.175-3.175l-12.72-12.72Zm-15.789 3.126c-8.692 0-15.74-7.047-15.74-15.74 0-8.693 7.048-15.74 15.74-15.74 8.693 0 15.74 7.047 15.74 15.74 0 8.693-7.047 15.74-15.74 15.74Z"
				clip-rule="evenodd"
			/>
		</svg>
	);
}

export function NiceArrowDown({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="23"
			height="27"
			fill="none"
			viewBox="0 0 23 23"
			style={widthStyle}
		>
			<path
				fill="#000"
				d="M12.039 1.168a1.5 1.5 0 0 0-2.121.043L.568 10.95a1.5 1.5 0 0 0 2.165 2.078l8.31-8.657 8.657 8.31a1.5 1.5 0 0 0 2.078-2.164l-9.74-9.35Zm.96 25.551-.5-24.5-2.999.062.5 24.5 3-.062Z"
			/>
		</svg>
	);
}

export function BlackExit({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="60"
			fill="none"
			viewBox="0 0 60 60"
			style={widthStyle}
		>
			<path fill="#000" d="M16.063 41.023 52.486 5.326l2.8 2.856L18.862 43.88l-2.8-2.857Z" />
			<path fill="#000" d="m19.93 5.572 35.698 36.424-2.857 2.8L17.073 8.371l2.857-2.8Z" />
		</svg>
	);
}

export function ArrowDownDarkerColor({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="31"
			height="31"
			fill="none"
			viewBox="0 0 31 31"
			style={widthStyle}
		>
			<g clip-path="url(#a)">
				<path
					fill="#0F2C57"
					fill-rule="evenodd"
					d="m.025 21.5 2.086 2.107 13.045-12.25 1.362 1.337-.007-.007L27.86 23.82l2.162-2.03L15.201 7.25c-2.222 2.085-.056.052-15.176 14.25Z"
					clip-rule="evenodd"
				/>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 .086h30.179v30.827H0z" />
				</clipPath>
			</defs>
		</svg>
	);
}

export function RedSearch({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="38"
			fill="none"
			viewBox="0 0 38 38"
			style={widthStyle}
		>
			<path
				fill="#FE5C01"
				fill-rule="evenodd"
				d="M27.05 25.115a15.054 15.054 0 0 0 3.305-9.436c0-8.35-6.768-15.117-15.117-15.117S.121 7.33.121 15.679 6.89 30.796 15.238 30.796c3.57 0 6.85-1.237 9.436-3.306l9.516 9.516a1.68 1.68 0 0 0 2.375-2.376l-9.515-9.515Zm-11.812 2.338c-6.503 0-11.774-5.271-11.774-11.774 0-6.503 5.271-11.775 11.774-11.775 6.503 0 11.775 5.272 11.775 11.775S21.74 27.453 15.238 27.453Z"
				clip-rule="evenodd"
			/>
		</svg>
	);
}

export function OrangeBasket({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="59"
			fill="none"
			viewBox="0 0 59 60"
			style={widthStyle}
		>
			<path
				stroke="#FE5C01"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="3.329"
				d="M51.351 25.231 36.786 10.666m14.565 14.565H7.656m43.695 0-3.294 16.47a9.71 9.71 0 0 1-9.521 7.805H20.47a9.71 9.71 0 0 1-9.52-7.806L7.655 25.231m0 0L22.22 10.666"
			/>
		</svg>
	);
}

export function BoldBasket({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="115"
			fill="none"
			viewBox="0 0 115 104"
			style={widthStyle}
		>
			<path
				stroke="#FE7D34"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="13.623"
				d="M107.75 40.996 74.372 7.62m33.378 33.377H7.617m100.133 0-7.548 37.742c-2.08 10.4-11.213 17.888-21.82 17.888H36.985c-10.607 0-19.74-7.487-21.82-17.888L7.618 40.996m0 0L40.995 7.62"
			/>
		</svg>
	);
}

export function OrangeArrow({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="46"
			fill="none"
			viewBox="0 0 46 24"
			style={widthStyle}
		>
			<path
				fill="#FE5C01"
				fill-rule="evenodd"
				d="M45.888 3.873 42.696.717 23.153 19.475l-2.084-2.002.01.012L3.718.819.477 3.928c4.797 4.607 18.196 17.467 22.676 21.765 3.329-3.192.084-.079 22.735-21.82Z"
				clip-rule="evenodd"
			/>
		</svg>
	);
}

export function BlueExit({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="17"
			fill="none"
			viewBox="0 0 17 17"
			style={widthStyle}
		>
			<path fill="#488BEE" d="M.148 14.896 15.192.15l.872.89L1.02 15.785l-.872-.89Z" />
			<path fill="#488BEE" d="m1.04.151 14.743 15.044-.89.872L.15 1.023l.89-.872Z" />
		</svg>
	);
}

export function EntryCategory({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="31"
			fill="none"
			viewBox="0 0 31 31"
			style={widthStyle}
		>
			<path
				fill="#0166FE"
				d="M28.791 8.883H9.774a.942.942 0 0 1-.954-.954V6.02c0-.536.418-.954.954-.954h19.017c.537 0 .954.418.954.954v1.91a.942.942 0 0 1-.954.954Zm0 8.524H9.774a.942.942 0 0 1-.954-.954v-1.907c0-.537.418-.954.954-.954h19.017c.537 0 .954.417.954.954v1.907a.942.942 0 0 1-.954.954Zm-24.679 0H2.204a.942.942 0 0 1-.954-.954v-1.907c0-.537.417-.954.954-.954h1.908c.536 0 .953.417.953.954v1.907a.942.942 0 0 1-.953.954Zm0-8.524H2.204a.942.942 0 0 1-.954-.954V6.02c0-.536.417-.954.954-.954h1.908c.536 0 .953.418.953.954v1.91a.942.942 0 0 1-.953.954Zm0 17.05H2.204a.942.942 0 0 1-.954-.954V23.07c0-.537.417-.954.954-.954h1.908c.536 0 .953.418.953.954v1.908a.942.942 0 0 1-.953.954Zm24.679 0H9.774a.942.942 0 0 1-.954-.954V23.07c0-.537.418-.954.954-.954h19.017c.537 0 .954.418.954.954v1.908a.942.942 0 0 1-.954.954Z"
			/>
		</svg>
	);
}

export function BlackArrowDown({ width }: { width?: string }) {
	const widthStyle = {
		width: width == null ? "var(--sz-60)" : width,
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="8"
			fill="none"
			viewBox="0 0 12 8"
			style={widthStyle}
		>
			<path
				fill="#000"
				fill-rule="evenodd"
				d="M12 1.534 11.156.7 5.992 5.657l-.55-.529.002.003L.856.727 0 1.55 5.992 7.3c.88-.843.022-.02 6.008-5.766Z"
				clip-rule="evenodd"
			/>
		</svg>
	);
}
