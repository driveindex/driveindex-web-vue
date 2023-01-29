import {LinkedList} from "linked-list-typescript";
import {routeString} from "@/core/store";

export class CanonicalPath {
  private readonly pathStack: LinkedList<string> = new LinkedList<string>()
  private readonly path: string

  constructor(path: routeString) {
    if (path == null) {
      this.path = "/"
    } else {
      this.path = path.replaceAll("\\", "/")
        .replaceAll(":", "")
      this.pathStack = this.getPathStack(this.path)
    }
  }

  private getPathStack(path: string): LinkedList<string> {
    const pathArray: Array<string> = path.split("/")
    if (pathArray[0] == "" && pathArray[1] == "") {
      return new LinkedList<string>('/')
    }
    for (const path of pathArray) {
      if (path == "" || path == ".") {
        this.pathStack.append("/")
        continue
      }
      if (path == ".." && this.pathStack.length > 1) {
        this.pathStack.removeTail()
      }
      this.pathStack.append(path)
    }
    return this.pathStack
  }

  public getPath(): string {
    return this.pathStack.toArray().join("/").replace("//", "/")
  }

  public getParentPath(): string {
    this.pathStack.removeTail()
    if (!this.isFile()) {
      this.pathStack.removeTail()
    }
    return this.getPath()
  }

  public isRoot(): boolean {
    return this.pathStack.length == 1
  }

  public isFile(): boolean {
    return !this.path.endsWith("/")
  }

  public toChildrenPath(name: string): string {
    this.pathStack.append(name)
    return this.getPath()
  }

  public toBreadcrumbItems(): Array<BreadcrumbItem> {
    const breadCrumbItems: Array<BreadcrumbItem> = []
    for (const item of this.pathStack.toArray()) {
      breadCrumbItems.push({
        title: item,
        to: this.pathStack.toArray().slice(0, this.pathStack.toArray().indexOf(item) + 1).join("/").replace("//", "/")
      })
    }
    if (!this.isFile() && !this.isRoot()) {
      breadCrumbItems.pop()
    }
    return breadCrumbItems
  }
}

interface BreadcrumbItem {
  title: string,
  to: string,
}
