const path = require('path');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');

const controller = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/controller.ts',
  templateFile: 'data/controller.hbs'
};

const controllerSpec = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/controller.spec.ts',
  templateFile: 'data/controller.spec.hbs'
};

const model = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/model.ts',
  templateFile: 'data/model.hbs'
};

const modelSpec = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/model.spec.ts',
  templateFile: 'data/model.spec.hbs'
};

const view = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/view.ts',
  templateFile: 'data/view.hbs'
};

const viewSpec = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/view.spec.ts',
  templateFile: 'data/view.spec.hbs'
};

const schema = {
  type: 'add',
  path: '{{directory}}/{{dotCase model}}/schema.graphql',
  templateFile: 'data/schema.hbs'
};

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
  public readonly {{ camelCase model }}Controller: {{ pascalCase model }}Controller;`
}

const updateContextConstructor = {
  type: 'modify',
  path: path.resolve() + '/src/app/context.ts',
  pattern: ' constructor() {',
  template: ` constructor() {
    this.{{ camelCase model }}Controller = new {{ pascalCase model }}Controller(this);`
}

const updateModelIndexImport = {
  type: 'modify',
  path: path.resolve() + '/src/data/index.ts',
  pattern: '',
  template: `import { {{ pascalCase model }}Model } from '@data/{{ dotCase model }}/model';\n`
}

const updateModelIndexArray = {
  type: 'modify',
  path: path.resolve() + '/src/data/index.ts',
  pattern: 'export const MODELS = [',
  template: `export const MODELS = [
    {{ pascalCase model }}Model,`
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
  plop.setPrompt('directory', inquirerFileTreeSelection);

  plop.setGenerator('Component', {
    description: 'Create an object w/ Controller, View, Model, and Schema',
    prompts: [modelPrompt, directoryPrompt],
    actions: [controller, controllerSpec, model, modelSpec, view, viewSpec, schema, updateContextImport, updateContext, updateContextConstructor, updateModelIndexImport, updateModelIndexArray]
  });
}