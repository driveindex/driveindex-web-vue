import req from "@/core/requests/index";
import {sha1} from "hash-wasm";


export interface response {
  data?: any,
  code: number,
  message: string
}

export interface FileListInfo extends response {
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

export interface FileData extends response {
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

export interface requestQuery {
  path: string,
  drive?: string,
  password?: string

}

export async function getFileListInfo(queries: requestQuery): Promise<response> {
  const params: requestQuery = {
    path: queries.path as string,
  }
  if (queries.drive) {
    params['drive'] = queries.drive
  }
  if (queries.password) {
    await sha1(queries.password).then((hash: string) => {
      console.log(hash, queries.password, 'pas')
      params['password'] = hash
    })
  }
  return req.get('api/azure/file', {
    params,
  }).then(res => {
    return res.data
  })
}
