import {LinkedList} from "linked-list-typescript";
import {log} from "@/core/plugins/vuejs3-logger";

export class CanonicalPath {
  private readonly pathStack: LinkedList<String>
  private readonly path: String

  private constructor(pathStack: LinkedList<String>, path: String) {
    this.pathStack = pathStack;
    this.path = path;
  }

  public static readonly ROOT: CanonicalPath = CanonicalPath.of('/')

  public static of(path: String): CanonicalPath {
    path = path.replaceAll("\\", "/")
      .replaceAll(":", "")
    return new CanonicalPath(this.getPathStack(path), path)
  }

  private static getPathStack(path: String): LinkedList<String> {
    const pathStack: LinkedList<String> = new LinkedList<String>()
    const stack: Array<String> = path.split("/")
    for (const file of stack) {
      if (file == "" || file == ".") {
        continue
      }
      if (file == "..") {
        if (pathStack.length > 0) {
          pathStack.removeTail()
        }
        continue
      }
      pathStack.append(file)
    }
    return pathStack
  }

  private static ofStack(pathStack: LinkedList<String>): CanonicalPath {
    return new CanonicalPath(pathStack, this.getPathByStack(pathStack))
  }

  private static getPathByStack(pathStack: LinkedList<String>): String {
    let path = "/"
    for (const file of pathStack) {
      path = path + "/" + file
    }
    return path
  }

  public getParentPath(): CanonicalPath {
    const path: LinkedList<String> = this.getPathStack()
    if (path.length > 0) {
      path.removeTail()
    }
    return CanonicalPath.ofStack(path)
  }

  public getPath(): String {
    return this.path
  }

  public getPathStack(): LinkedList<String> {
    const clone = new LinkedList<String>()
    for (let file of this.pathStack) {
      clone.append(file)
    }
    return clone
  }

  public isRoot(): boolean {
    return this.pathStack.length > 0
  }

  public getFileName(): String {
    if (this.pathStack.length <= 0) {
      return '/'
    } else {
      return this.pathStack.tail
    }
  }

  public toBreadcrumbItems(): any[] {
    let path: CanonicalPath = this
    const items: LinkedList<any> = new LinkedList<any>()
    do {
      items.prepend({
        title: path.getFileName(),
        href: path.getPath()
      })
      path = path.getParentPath()
    } while (!path.isRoot())
    log.debug("items.length: " + items.length)
    return items.toArray()
  }
}
