import type en from "./en"
import type { DeepString } from "@/i18n/types"
import farmerAndVagabond from "@/i18n/long-texts/farmer-and-vagabond/es"
import stagecoachReview from "@/i18n/long-texts/stagecoach-review/es"

const es: DeepString<typeof en> = {
  sketches: {
    title: "Sketch P5js",
    cell: "Fungi creciendo",
    lava: "Lámpara de lava",
    name: "Sketch de nombre",
    kaleidoscope: "Kaleidoscopio",
    ringsZooming: "Anillos",
    movingFloor: "Suelo movil",
    romboidRainbow: "Romboide arcoíris",
  },
  info: {
    title: "Mi info",
    cv: {
      title: "CV",
    },
    entryPoint: {
      contactMe: "Contacta conmigo",
      title: "Mi info",
      header: "Soy Martín", 
      description: "Me gusta crear",
      linksDescription: "Aquí tienes algunos de mis proyectos:",
    },
    projects: {
      title: "Proyectos",
      phraseRandomizer: "Aleatorizador de frases",
      umlEditor: "Editor UML",
      atv: "Avoid the void",
      creativeCoding: "Creative coding",
    },
    technologies: {
      title: "Tecnologías",
      randomize: "Randomizar",
    },
    contact: {
      title: "Contáctame",
      mail: "Correo",
      linkdin: "Linkdin",
      github: "Github",
    },
    experience: {
      title: "Experiencia",
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
    miscellaneous: {
      title: "Misceláneo",
      description: "Cosas random que he creado o que me gustan.",
      speeches: {
        title: "Discursos",
        description: "Algunos discursos que me han marcado.",
        tearsIntheRain: "Lágrimas en la lluvia",
        ourTimeHasPassed: "Nuestro tiempo ha pasado",
        sweatOfHisBrow: "El sudor de su frente",
      },
      myTexts: {
        title: "Mis textos",
        description: "Algunos textos que he escrito.",
        farmerAndVagabond: {
          title: "El ganadero y el vagabundo",
          story: farmerAndVagabond,
        },
        stagecoachReview: {
          title: "Reseña de la Diligencia (1939)",
          story: stagecoachReview,
        }
      },
      clock: {
        title: "Reloj",
      },
      gallery: {
        title: "Galería",
        description: "Algunas fotos aleatorias",
        me: "Yo",
        kebabPlace: "Kebab Station",
        deathBeach: "Death Beach",
        breakAspectRatio: "Romper ratio de aspecto",
        fixAspectRatio: "Arreglar ratio de aspecto",
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
      image: 'Imagen',
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

