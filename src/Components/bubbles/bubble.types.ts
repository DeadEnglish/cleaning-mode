export type Compose =
	| "source-over"
	| "lighter"
	| "xor"
	| "multiply"
	| "screen"
	| "overlay"
	| "darken"
	| "lighten"
	| "color-dodge"
	| "color-burn"
	| "hard-light"
	| "soft-light"
	| "difference"
	| "exclusion"
	| "hue"
	| "saturation"
	| "color";

export interface Shadow {
	blur: number;
	color: string;
}

export interface Stroke {
	width: number;
	color: string;
}

export interface BubblesConfig {
	count: number;
	radius: number;
	fill: string;
	angle: number;
	velocity: number;
	shadow?: Shadow;
	stroke: Stroke;
}

interface canvasBubbleConfig {
	r: number;
	f: string;
	x: number;
	y: number;
	a: number;
	v: number;
	sh?: Shadow;
	st: Stroke;
}

export interface CreateBubble extends canvasBubbleConfig {
	draw: (ctx: CanvasRenderingContext2D, bubble: canvasBubbleConfig) => void;
}
