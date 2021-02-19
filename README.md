!['GatherContent & JS working together'](public/gcjs.png)

# gathercontent.js

A Javascript library for getting content out of GatherContent.

## Install

```cli
npm install gathercontent.js
```

## Usage

Content is written on items in GatherContent. Items are stored in projects, so the main function in this library is called `getProjectData`;

```javascript
import { getProjectData } from "gathercontent.js"

const projectId = "project_id" // you can find the id in your project settings.
const credentials = {
  email: "your@email.com", // the one you signed up with. 😊
  apiKey: "api_key", // https://docs.gathercontent.com/reference#authentication 🔑
}

const project = getProjectData(projectId, credentials)
```

`getProjectData` returns key pieces of project data from our [API](https://docs.gathercontent.com/reference);

```
{
  project: {},
  folders: [],
  templates: [],
  items: [],
}
```

## Data structure

You can understand the structure of the data by reading our API docs;

- [project](https://docs.gathercontent.com/v0.5/reference#get-project-by-id)
- [templates](https://docs.gathercontent.com/reference#templates)
- [folders](https://docs.gathercontent.com/reference#folders)

Items are a little more complex;

- [listing items](https://docs.gathercontent.com/reference#listitems)
- [getting item content](https://docs.gathercontent.com/reference#getitem)

Content is retrieved and sorted into an `itemContent` property;

```javascript
const item = {
  ...itemProperties,
  itemContent: {
    slugOfFieldGroup: {
      slugOfField: "This is content",
    },
  },
}
```

## Slugs

This library appends slugs where helpful by converting the name. Items, templates, folders and workflow statuses all have slugs added. For content, we use the slug to help key the fields. Here's an example;

```javascript
const item = {
  name: "Hello [world]",
  slug: "helloWorld", // item name is converted
  itemContent: {
    metaData: { // field group name is converted
      pageHeading: "Page heading", // field name is converted
    },
  },
}
```

Using the name for the conversion is logical but comes with a serious downside, duplicate names.

Duplicate names are automatically handled. For example if you have a group of fields with duplicate names the conversion will append a position to the end of the key. E.g. `fieldName2`.

## Casing

Our api uses snake case but this library converts the data to camelcase.

```javascript
const itemBefore = {
  id: 0,
  project_id: 0,
  folder_uuid: "uuid",
}

const itemAfter = {
  id: 0,
  projectId: 0,
  folderUuid: "uuid",
}
```

## Feedback

If you have feedback or experience any issues, create a Github issue.

You're more than welcome to contribute to the repo. To do so fork the repo, create a PR and be sure to test your work before submitting it 🙌
