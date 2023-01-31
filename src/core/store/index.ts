import {defineStore} from "pinia";

export type routeString = string | null | undefined

export interface RouteVars {
  client: routeString,
  account: routeString,
  drive: routeString,

  path: routeString,
  password: routeString,
  sort_by: routeString,
  asc: routeString,
  page_size: routeString,
  page_index: routeString,
}

// Define a store. We are following an option API style here.
export const useStore = defineStore('store',{
  state: () => ({
    routeVars: {
      client: null,
      account: null,
      drive: null,
      path: '/',
      password: null,
      sort_by: null,
      asc: null,
      page_size: '20',
      page_index: '1',
    } as RouteVars,
    language: 'zh',
  })
})
