export const retinaScreenFix = (
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D
) => {
	const canvasWidth = canvas.width;
	const canvasHeight = canvas.height;

	canvas.width = canvasWidth * window.devicePixelRatio;
	canvas.height = canvasHeight * window.devicePixelRatio;
	canvas.style.width = canvasWidth + "px";
	canvas.style.height = canvasHeight + "px";

	context.scale(window.devicePixelRatio, window.devicePixelRatio);
};
