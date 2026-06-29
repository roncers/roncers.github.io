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
    cv: {
      title: "Mi CV",
    },
    entryPoint: {
      contactMe: "Contacta conmigo",
      title: "Mi info",
      header: "Soy Martín", 
      description: "Realmente solo soy información.",
      linksDescription: "Aquí tienes algunos de mis proyectos:",
    },
    projects: {
      title: "Mis proyectos",
      phraseRandomizer: "Aleatorizador de frases",
      umlEditor: "Editor UML",
    },
    experience: {
      title: "Mi experiencia",
      indra: "Indra",
      nttData: "NTT Data",
    },
  },
  table: {
    name: "Nombre",
    modificationDate: "Fecha de modificación",
    type: "Tipo",
    size: "Tamaño",
    types: {
      file: 'Archivo',
      script: 'Script',
      directory: 'Directorio',
      link: 'Enlace'
    }
  },
  window: {
    close: "Cerrar",
    minimize: "Minimizar",
    maximize: "Maximizar",
  },
}

export default es

