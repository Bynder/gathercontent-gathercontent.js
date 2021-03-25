export interface ItemInterface {
  id: number
  name: string
  status_id: number
  template_id: number
  position: number
  content: {
    [uuid: string]: string
  }
  structure: {
    groups: Array<{
      name: string
      fields: Array<{
        uuid: string
        label: string
      }>
    }>
  }
}
