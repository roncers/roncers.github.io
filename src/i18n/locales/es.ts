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
      atv: "Avoid the void",
    },
    experience: {
      title: "Mi experiencia",
      indra: { 
        title: "Indra",
        period: "01/2025 - Actualidad",
        description:
          "Actualmente me encuentro trabajando en indra en la BU de Ciberdefensa. Llevando labores de desarrollo front-end con Vue.js y TypeScript.",
      },
      nttData: {
        title: "NTT Data",
        period: "09/2023 - 12/2023",
        description:
          "Trabajé en NTT Data como desarrollador full-stack en prácticas. Realicé varias tareas relacionadas con Backend y Frontend. Dejé de trabajar ahí para centrarme en terminar la carrera.",
      },
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
      link: 'Enlace',
      video: 'Video'
    }
  },
  window: {
    close: "Cerrar",
    minimize: "Minimizar",
    maximize: "Maximizar",
  },
}

export default es

