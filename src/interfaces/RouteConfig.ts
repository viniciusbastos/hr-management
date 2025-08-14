export interface RouteConfig {
  path: string
  element: React.ReactNode
  children?: RouteConfig[]
  protected?: boolean
  lazy?: boolean
}
