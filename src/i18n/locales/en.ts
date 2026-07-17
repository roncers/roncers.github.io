import farmerAndVagabond from "@/i18n/long-texts/farmer-and-vagabond/es"
import stagecoachReview from "@/i18n/long-texts/stagecoach-review/en"

const en = {
  sketches: {
    title: "P5 sketch",
    cell: "Fungi growth sketch",
    lava: "Lava sketch",
    name: "Name sketch",
    kaleidoscope: "Kaleidoscope sketch",
    ringsZooming: "Rings Zooming",
    movingFloor: "Moving floor",
    romboidRainbow: "Romboid rainbow",
  },
  info: {
    title: "My info",
    cv: {
      title: "CV",
    },
    entryPoint: {
      contactMe: "Contact me",
      title: "My info",
      header: "I'm Martín",
      description: "I like to create",
      linksDescription: "Here are some of my projects:",
    },
    projects: {
      title: "Projects",
      phraseRandomizer: "Phrase randomizer",
      umlEditor: "UML editor",
      atv: "Avoid the void",
      creativeCoding: "Creative coding",
    },
    technologies: {
      title: "Skills",
      randomize: "Randomize",
    },
    contact: {
      title: "Contact me",
      mail: "Mail",
      linkdin: "Linkdin",
      github: "Github",
    },
    experience: {
      title: "Experience",
      indra: {
        title: "Indra",
        period: "01/2025 - Present",
        description1:
          "I'm currently working at Indra in the Ciberdefensa BU. I'm carrying out front-end development tasks with Vue.js and TypeScript.",
        description2:
          "I mainly develop screens for the army's command and control team. This function requires developing reusable components for visualizing complex data.",
        description3:
          "I leave a document listing some of the tasks I have performed during my stay at Indra. Although they are encrypted because they are for ciberdefense projects:",
        tasksButton: "See my tasks",
      },
      nttData: {
        title: "NTT Data",
        period: "09/2023 - 12/2023",
        description:
          "I worked in NTT Data as a full-stack developer intern. I carried out several tasks related to Backend and Frontend. I stopped working there to focus on finishing my degree.",
      },
    },
    miscellaneous: {
      title: "Miscellaneous",
      description: "Random stuff I've created or that I like.",
      speeches: {
        title: "Speeches",
        description: "Some speeches that have marked me.",
        tearsIntheRain: "Tears in the rain",
        ourTimeHasPassed: "Our time has passed",
        sweatOfHisBrow: "Sweat of his brow",
      },
      myTexts: {
        title: "My texts",
        description: "Some texts I've written.",
        farmerAndVagabond: {
          title: "The cattleman and the vagabond",
          story: farmerAndVagabond,
        },
        stagecoachReview: {
          title: "Review of Stagecoach (1939)",
          story: stagecoachReview,
        }
      },
      clock: {
        title: "Clock",
      },
      gallery: {
        title: "Gallery",
        description: "Some random pictures",
        me: "Me",
        kebabPlace: "Kebab Station",
        deathBeach: "Death Beach",
        breakAspectRatio: "Break aspect ratio",
        fixAspectRatio: "Fix aspect ratio",
      },
    },
  },
  table: {
    name: "Name",
    modificationDate: "Modification date",
    type: "Type",
    size: "Size",
    types: {
      file: "File",
      script: "Script",
      directory: "Directory",
      link: "Link",
      video: "Video",
      shader: "Shader",
      image: "Image",
    },
  },
  window: {
    close: "Close",
    minimize: "Minimize",
    maximize: "Maximize",
  },
  creativeCoding: {
    p5Scripts: {
      title: "My P5js scripts",
    },
    glsl: {
      title: "My GLSL shaders",
    },
  },
} as const

export default en
