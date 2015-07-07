import Config from "../config"

export default class PageTitle {
  constructor (document) {
    document.title = Config.APP_NAME
  }
}
