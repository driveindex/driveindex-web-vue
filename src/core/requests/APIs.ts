import req from "@/core/requests/index";

export interface FileListInfo {
  data: {
    total_page: number,
    total_count: number,
    called_name: {
      prefix: string,
      suffix: string,
    },
    name: string,
    mine_type: string,
    content: Array<ContentItem>
  },
  code: number,
  message: string
}

export interface ContentItem {
  name: string
  mine_type: string
  info: {
    create_time: number
    modified_time: number
    size: number
    web_url: string
  }
  detail?: {
    child_count?: number
    quick_xor_hash?: string
    sha1_hash?: string
    sha256_hash?: string
  }
}

// export function getFileListInfo(path: string): Promise<FileListInfo> {
//   return req.get('api/azure/file', {
//     params: {
//       path,
//     }
//   })
// }

export function getFileListInfo(path: string): Promise<FileListInfo> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          "total_page": 1,
          "total_count": 2,
          "called_name": {
            "prefix": "--",
            "suffix": "常见资源"
          },
          "name": "3D制作",
          "mine_type": "directory",
          "content": []
        },
        code: 1,
        message: "message",
      })
    }, 1000)
  })
}
