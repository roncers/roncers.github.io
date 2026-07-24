export default class Router {
  private routes: Array<{ uri: string; callback: Function }> = []

  constructor() {
    this.routes = []
  }

  get(uri: string, callback: Function) {
    if (!uri || !callback) throw new Error("uri or callback must be given")

    if (typeof uri !== "string")
      throw new TypeError("typeof uri must be a string")
    if (typeof callback !== "function")
      throw new TypeError("typeof callback must be a function")

    this.routes.forEach((route) => {
      if (route.uri === uri)
        throw new Error(`the uri ${route.uri} already exists`)
    })

    const route = {
      uri,
      callback,
    }
    this.routes.push(route)
  }

  init() {
    this.routes.some((query) => {
      const search = window.location.search
      if (search === query.uri) {
        return query.callback.call(this, { search })
      }
    })
  }
}
