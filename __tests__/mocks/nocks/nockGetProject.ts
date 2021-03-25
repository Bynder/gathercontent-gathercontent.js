import { ProjectInterface } from "../../../lib/types/project"

export function nockGetProject(apiNock: any) {
  const project: ProjectInterface = {
    id: 1,
    name: "project",
    statuses: {
      data: [
        {
          id: 1,
          name: "Draft",
        },
      ],
    },
  }

  apiNock.get(`/projects/${project.id}`).reply(200, {
    data: project,
  })

  return project
}
