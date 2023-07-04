// Component based off https://github.com/tipsy/bubbly-bg, Thank you!
import { FC, useRef, useEffect, useState } from "react";
import { BubblesConfig, Compose, CreateBubble } from "./bubble.types";
import { retinaScreenFix } from "./helpers/retina-fix.helper";
import { BubbleCanvas } from "./bubbles.styles";

const defaultBubbleConfig: BubblesConfig = {
	count: 12,
	radius: 4 + (Math.random() * window.innerWidth) / 30,
	fill: `hsla(0, 0%, 100%, ${Math.random() * 0.02})`,
	angle: Math.random() * Math.PI * 2,
	velocity: 0.1 + Math.random() * 0.01,
	stroke: {
		color: "rgba(255, 255, 255, 0.01)",
		width: 0,
	},
};

interface Props {
	compose?: Compose;
	bubbles?: Partial<BubblesConfig>;
	background?: string;
}

export const Bubbles: FC<Props> = ({ compose = "lighter", bubbles }) => {
	const startedAnimation = useRef<boolean>(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRequestRef = useRef<number>(0);

	const [canvasContext, setCanvasContext] =
		useState<CanvasRenderingContext2D | null>(null);

	const bubblesConfig: BubblesConfig = {
		...defaultBubbleConfig,
		...bubbles,
	};

	const createBubble = (): CreateBubble => ({
		r: bubblesConfig.radius,
		f: bubblesConfig.fill,
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
		a: bubblesConfig.angle,
		v: bubblesConfig.velocity,
		sh: bubblesConfig.shadow,
		st: bubblesConfig.stroke,
		draw: (ctx, bubble) => {
			if (bubble.sh) {
				ctx.shadowColor = bubble.sh.color;
				ctx.shadowBlur = bubble.sh.blur;
			}
			ctx.fillStyle = bubble.f;
			ctx.beginPath();
			ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
			ctx.fill();
			if (bubble.st) {
				ctx.strokeStyle = bubble.st.color;
				ctx.lineWidth = bubble.st.width;
				ctx.stroke();
			}
		},
	});

	const bubblesArray = Array.from(
		{ length: bubblesConfig.count },
		createBubble
	);

	const drawCanvas = (
		cv: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D
	) => {
		animationRequestRef.current = requestAnimationFrame(() =>
			drawCanvas(cv, ctx)
		);

		ctx.globalCompositeOperation = "source-over";

		const gradient = ctx.createLinearGradient(
			0,
			0,
			ctx.canvas.width,
			ctx.canvas.height
		);

		gradient.addColorStop(0, "#000");
		gradient.addColorStop(0.1, "#1F1127");
		gradient.addColorStop(0.2, "#391B4B");
		gradient.addColorStop(0.3, "#532272");
		gradient.addColorStop(0.4, "#712A9D");
		gradient.addColorStop(0.5, "#8C30C5");
		gradient.addColorStop(0.6, "#712A9D");
		gradient.addColorStop(0.7, "#532272");
		gradient.addColorStop(0.8, "#391B4B");
		gradient.addColorStop(0.9, "#1F1127");
		gradient.addColorStop(1, "#000");
		ctx.fillStyle = gradient;

		ctx.fillRect(0, 0, cv.width, cv.height);
		ctx.globalCompositeOperation = compose;

		for (const bubble of bubblesArray) {
			bubble.draw(ctx, bubble);
			bubble.x += Math.cos(bubble.a) * bubble.v;
			bubble.y += Math.sin(bubble.a) * bubble.v;
			if (bubble.x - bubble.r > cv.width) {
				bubble.x = -bubble.r;
			}
			if (bubble.x + bubble.r < 0) {
				bubble.x = cv.width + bubble.r;
			}
			if (bubble.y - bubble.r > cv.height) {
				bubble.y = -bubble.r;
			}
			if (bubble.y + bubble.r < 0) {
				bubble.y = cv.height + bubble.r;
			}
		}
	};

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		setCanvasContext(canvasRef.current.getContext("2d"));
	}, [canvasRef]);

	useEffect(() => {
		if (!canvasContext || !canvasRef.current || startedAnimation.current)
			return;

		// Fix for retina screens
		if (window.devicePixelRatio > 1) {
			retinaScreenFix(canvasRef.current, canvasContext);
		}

		startedAnimation.current = true;
		animationRequestRef.current = requestAnimationFrame(() =>
			drawCanvas(canvasRef.current!, canvasContext)
		);

		return () => {
			cancelAnimationFrame(animationRequestRef.current);
		};
	});

	return <BubbleCanvas ref={canvasRef} />;
};
