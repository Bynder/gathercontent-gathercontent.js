import nock from 'nock';
import { getProject } from '../lib';

test("getting data for a project", async () => {
  const projectId = 1;
  const itemMock = {
    id: 1,
    structure: {
      groups: [{
        fields: []
      }]
    }
  }
  const itemMock2 = {
    id: 2,
    structure: {
      groups: [{
        fields: []
      }]
    }
  }

  nock('https://api.gathercontent.com')
    .get(`/projects/${projectId}/folders`)
    .reply(200, { data: [] });

  nock('https://api.gathercontent.com')
    .get(`/projects/${projectId}/items`)
    .reply(200, {
      data: [itemMock],
      pagination: {
        page: 1,
        totalPages: 2
      }
    });

  nock('https://api.gathercontent.com')
    .get(`/projects/${projectId}/items?page=2`)
    .reply(200, {
      data: [itemMock2],
      pagination: {
        page: 2,
        totalPages: 2
      }
    });

  nock('https://api.gathercontent.com')
    .get(`/projects/${projectId}/templates`)
    .reply(200, { data: [] });

  nock('https://api.gathercontent.com')
    .get(`/items/1?include=structure`)
    .reply(200, {
      data: itemMock
    });

  nock('https://api.gathercontent.com')
    .get(`/items/2?include=structure`)
    .reply(200, {
      data: itemMock2
    });

  const expected = {
    folders: [],
    templates: [],
    items: [{
      ...itemMock,
      content: {}
    }, {
      ...itemMock2,
      content: {}
    }],
  }

  const result = await getProject(1, {
    email: 'hello@world.com',
    apiKey: 'apiKey'
  });

  expect(result).toEqual(expected)
})
