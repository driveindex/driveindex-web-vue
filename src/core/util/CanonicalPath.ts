import {LinkedList} from "linked-list-typescript";

export class CanonicalPath {
  private readonly pathStack: LinkedList<string>
  private readonly path: string

  private constructor(pathStack: LinkedList<string>, path: string) {
    this.pathStack = pathStack;
    this.path = path;
  }

  public static readonly ROOT: CanonicalPath = CanonicalPath.of('/')

  public static of(path: string): CanonicalPath {
    path = path.replaceAll("\\", "/")
      .replaceAll(":", "")
    return new CanonicalPath(this.getPathStack(path), path)
  }

  private static getPathStack(path: string): LinkedList<string> {
    const pathStack: LinkedList<string> = new LinkedList<string>()
    const stack: Array<string> = path.split("/")
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

  private static ofStack(pathStack: LinkedList<string>): CanonicalPath {
    return new CanonicalPath(pathStack, this.getPathByStack(pathStack))
  }

  private static getPathByStack(pathStack: LinkedList<string>): string {
    let path = "/"
    for (const file of pathStack) {
      path = path + "/" + file
    }
    return path
  }

  public getParentPath(): CanonicalPath {
    const path: LinkedList<string> = this.getPathStack()
    if (path.length > 0) {
      path.removeTail()
    }
    return CanonicalPath.ofStack(path)
  }

  public getPath(): string {
    return this.path
  }

  public getPathStack(): LinkedList<string> {
    const clone = new LinkedList<string>()
    for (const file of this.pathStack) {
      clone.append(file)
    }
    return clone
  }

  public isRoot(): boolean {
    return this.pathStack.length > 0
  }

  public getFileName(): string {
    if (this.pathStack.length <= 0) {
      return '/'
    } else {
      return this.pathStack.tail
    }
  }

  public toBreadcrumbItems(): BreadcrumbItem[] {
    let path: CanonicalPath = this
    const items: LinkedList<any> = new LinkedList<any>()
    while (path.isRoot()) {
      items.append({
        title: path.getFileName(),
        // todo: Find problem in the algorithm, try not use replacement.
        /*
        * Problem: if the path is "%2FAMD%2Ftest%2F123"
        * the 3 elements' getPath() method will return
        * /AMD/test/123
        * //AMD/test
        * //AMD
        * except the last element's getPath method, others returned more than 1 slash.
        * */
        to: path.getPath().replaceAll("//", "/").replaceAll('/', "%2F")
      })
      path = path.getParentPath()
    }
    items.append({
      title: '/',
      to: '%2F',
    })
    return items.toArray().reverse()
  }

}

interface BreadcrumbItem {
  title: string,
  to: string,
}
