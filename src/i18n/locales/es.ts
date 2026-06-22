import type en from "./en"
import type { DeepString } from "@/i18n/types"

const es: DeepString<typeof en> = {
  sketches: {
    title: "Sketch P5js",
    cell: "Celula creciendo",
    lava: "Lámpara de lava",
    name: "Sketch de nombre",
    kaleidoscope: "Kaleidoscopio",
  },
  info: {
    title: "Mi info",
    entryPoint: {
      header: "Hola! Soy Martín", 
      description: "Disfruto el desarrollo frontend porque es donde la tecnología encuentra a las personas",
      linksDescription: "Aquí tienes algunos de mis proyectos:",
    },
  },
  window: {
    close: "Cerrar",
    minimize: "Minimizar",
    maximize: "Maximizar",
  },
}

export default es

