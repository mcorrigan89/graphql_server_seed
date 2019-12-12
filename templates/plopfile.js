const path = require('path');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');

const controller = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/controller.ts',
  templateFile: 'data/controller.hbs'
};

const model = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/model.ts',
  templateFile: 'data/model.hbs'
};

const view = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/view.ts',
  templateFile: 'data/view.hbs'
};

const schema = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/schema.graphql',
  templateFile: 'data/schema.hbs'
};

const resolvers = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/resolvers.ts',
  templateFile: 'data/resolvers.hbs'
};

const updateSchema = {
  type: 'append',
  path: path.resolve() + '/src/graphql/schema.graphql',
  template: '# import Query.*, Mutation.* from "src/data/{{ dotCase model }}/schema.graphql"'
}

const updateContextImport = {
  type: 'modify',
  path: path.resolve() + '/src/app/context.ts',
  pattern: '',
  template: `import { {{ pascalCase model }}Controller } from '@data/{{ dotCase model }}/controller'; \n`
}
const updateContext = {
  type: 'modify',
  path: path.resolve() + '/src/app/context.ts',
  pattern: 'export class Context {',
  template: `export class Context {
  public readonly {{ dotCase model }}Controller: {{ pascalCase model }}Controller;`
}

const updateContextConstructor = {
  type: 'modify',
  path: path.resolve() + '/src/app/context.ts',
  pattern: ' constructor() {',
  template: ` constructor() {
    this.{{ dotCase model }}Controller = new {{ pascalCase model }}Controller();`
}

const modelPrompt = {
  type: 'input',
  name: 'model',
  message: 'What is the name of this model'
};

const directoryPrompt = {
  type: 'directory',
  name: 'directory',
  message: 'Where are you adding this Component?',
  onlyShowDir: true,
  root: '.'
};

module.exports = plop => {
  plop.setPrompt('directory', inquirerFileTreeSelection)

  plop.setGenerator('Component', {
    description: 'Create an object w/ Controller, View, Model, and Schema',
    prompts: [modelPrompt, directoryPrompt],
    actions: [controller, model, view, schema, resolvers, updateSchema, updateContextImport, updateContext, updateContextConstructor]
  });
}