import React, { useRef, useEffect } from "react";
import "./DayLightCanvas.css";
const DayLightCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current!.height);
    gradient.addColorStop(0, "#87CEEB"); 
    gradient.addColorStop(0.3, "#FFDDC1");
    gradient.addColorStop(0.5, "#FFEB99"); 
    gradient.addColorStop(0.7, "#FFFACD"); 
    gradient.addColorStop(1, "#FFFFFF"); 
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(ctx);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  return <canvas ref={canvasRef} className="sunrise-canvas"></canvas>;
};

export default DayLightCanvas;
