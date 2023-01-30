import req from "@/core/requests/index";
import {sha1} from "hash-wasm";
import {RouteVars} from "@/core/store";


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

export async function getFileListInfo(queries: RouteVars): Promise<response> {
  const params: RouteVars = {} as RouteVars
  if (queries.client) {
    params['client'] = queries.client
  }
  if (queries.account) {
    params['account'] = queries.account
  }
  if (queries.drive) {
    params['drive'] = queries.drive
  }
  if (queries.path) {
    params['path'] = queries.path
  }
  if (queries.password) {
    await sha1(queries.password).then((hash: string) => {
      params['password'] = hash
    })
  }
  if (queries.sort_by) {
    params['sort_by'] = queries.sort_by
  }
  if (queries.asc) {
    params['asc'] = queries.asc
  }
  if (queries.page_size) {
    params['page_size'] = queries.page_size
  }
  if (queries.page_index) {
    params['page_index'] = queries.page_index
  }
  return req.get('api/azure/file', {
    params,
  }).then(res => {
    return res.data
  })
}

// export async function getLanguage(): Promise<response> {
//   return req.get('api/language').then(res => {
//     return res.data
//   })
// }
// test
export async function getLanguage(): Promise<response> {
  console.log('getLanguage')
  return Promise.resolve({
    code: 200,
    message: 'success',
    data: {
      language: 'en',
    }
  })
}
