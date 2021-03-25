import { ProjectInterface } from "../../../lib/types/project"

const folder1 = {
  uuid: "folder-1",
  name: "Project folder 1",
  position: 1,
}

const folder2 = {
  uuid: "folder-2",
  name: "Project folder 2",
  position: 2,
  parent_uuid: "folder-1",
}

export function nockGetFolders(
  apiNock: any,
  projectMock: ProjectInterface,
  mockFolder1 = folder1,
  mockFolder2 = folder2
) {
  apiNock
    .get(`/projects/${projectMock.id}/folders`)
    .reply(200, { data: [mockFolder1, mockFolder2] })

  return [mockFolder1, mockFolder2]
}
