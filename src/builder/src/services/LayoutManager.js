export class LayoutManager {
  static save(layoutData) {
    localStorage.setItem(`layout-${layoutData.id}`, JSON.stringify(layoutData))
  }

  static load(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}
