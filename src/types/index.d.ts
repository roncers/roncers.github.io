declare module "*.module.css" {
  const classes: Record<string, string>
  export default classes
}

// TypeScript ignoring extensions

declare module "*.pdf" {
  const content: string
  export default content
}

declare module "*.ttf" {
  const content: string
  export default content
}

declare module "*.otf" {
  const content: string
  export default content
}

declare module "*.woff" {
  const content: string
  export default content
}

declare module "*.woff2" {
  const content: string
  export default content
}
