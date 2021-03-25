import { ProjectInterface } from "../../../lib/types/project"

export function nockGetTemplates(apiNock: any, projectMock: ProjectInterface) {
  const templates: any = [
    {
      id: 1,
      name: "template name",
    },
  ]

  apiNock
    .get(`/projects/${projectMock.id}/templates`)
    .reply(200, { data: templates })

  return templates
}
