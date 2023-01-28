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

export interface FileData {
  data: {
    called_name: {
      prefix: string,
      suffix: string,
    },
    name: string,
    mine_type: string,
    content: {
      mine_type: string,
      info: {
        create_time: number
        modified_time: number
        size: number
        web_url: string
      },
      detail?: {
        quick_xor_hash?: string
        sha1_hash?: string
        sha256_hash?: string
      }
    }
  }
}

export function getFileListInfo(path: string): Promise<FileListInfo | FileData> {
  return req.get('api/azure/file', {
    params: {
      path,
    }
  }).then(res => {
    return res.data
  })
}
