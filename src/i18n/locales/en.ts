const en = {
  sketches: {
    title: "P5 sketch",
    cell: "Cell sketch",
    lava: "Lava sketch",
    name: "Name sketch",
    kaleidoscope: "Kaleidoscope sketch",
  },
  info: {
    title: "My info",
    cv: {
      title: "My CV",
    },
    entryPoint: {
      contactMe: "Contact me",
      title: "My info",
      header: "I'm Martín",
      description: "In reality I'm just information.",
      linksDescription: "Here are some of my projects:",
    },
    projects: {
      title: "My projects",
      phraseRandomizer: "Phrase randomizer",
      umlEditor: "UML editor",
      atv: "Avoid the void",
    },
    experience: {
      title: "My experience",
      indra: { 
        title: "Indra",
        period: "01/2025 - Present",
        description:
          "I'm currently working at Indra in the Ciberdefensa BU. I'm carrying out front-end development tasks with Vue.js and TypeScript.",
      },
      nttData: {
        title: "NTT Data",
        period: "09/2023 - 12/2023",
        description:
          "I worked in NTT Data as a full-stack developer intern. I carried out several tasks related to Backend and Frontend. I stopped working there to focus on finishing my degree.",
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
    },
  },
  window: {
    close: "Close",
    minimize: "Minimize",
    maximize: "Maximize",
  },
} as const

export default en
