import type en from "./en"
import type { DeepString } from "@/i18n/types"

const es: DeepString<typeof en> = {
  sketches: {
    title: "Sketch P5js",
    cell: "Celula creciendo",
    lava: "Lámpara de lava",
    name: "Sketch de nombre",
    kaleidoscope: "Kaleidoscopio",
    ringsZooming: "Anillos",
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
      creativeCoding: "Creative coding",
    },
    technologies: {
      title: "Mis tecnologías",
      randomize: "Randomizar",
    },
    contact: {
      title: "Contactame",
      mail: "Correo",
      linkdin: "Linkdin",
      github: "Github",
    },
    experience: {
      title: "Mi experiencia",
      indra: { 
        title: "Indra",
        period: "01/2025 - Actualidad",
        description1:
          "Actualmente me encuentro trabajando en Indra en la BU de Ciberdefensa. Llevando a cabo labores de desarrollo front-end con Vue.js y TypeScript. Además de coordinación de datos con Backend y DevOps.",
        description2: "Principalmente desarrollo pantallas para la unidad de mando y control dentro del ejército. Esta función requiere desarrollar componentes reutilizables para la visualización de datos complejos.",
        description3: "Dejo un documento listando algunas de las tareas que he realizado durante mi estancia en Indra. Aunque vienen cifradas porque son de proyectos de ciberdefensa:",
        tasksButton: "Mis Tareas",
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
      video: 'Video',
      shader: 'Shader',
    }
  },
  window: {
    close: "Cerrar",
    minimize: "Minimizar",
    maximize: "Maximizar",
  },
  creativeCoding: {
    p5Scripts: {
      title: "Mis scripts P5js",
    },
    glsl: {
      title: "Mis shaders GLSL",
    },
  },
}

export default es

