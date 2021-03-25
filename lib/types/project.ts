export interface ProjectInterface {
  id: number
  name: string
  statuses: {
    data: Array<{
      id: number
      name: string
    }>
  }
}
