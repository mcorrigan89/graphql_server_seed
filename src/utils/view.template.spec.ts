import 'reflect-metadata';
import { ViewTemplate, ModelViewTemplate } from './view.template';
import { Context } from '../app/context';
import { ModelTemplate } from './model.template';

interface FakeModel {
  fizz: string;
  flerp: string;
}

describe('View Template', () => {
  it('should return model data passed to it', () => {
    const fakeContext = new Context();
    const model: FakeModel = { fizz: 'buzz', flerp: 'derp ' };
    const template = new ViewTemplate(fakeContext, model);
    expect(template.data).toBe(model);
  });

  it('should return context passed to it', () => {
    const fakeContext = new Context();
    const model: FakeModel = { fizz: 'buzz', flerp: 'derp ' };
    const template = new ViewTemplate(fakeContext, model);
    expect(template.context).toBe(fakeContext);
  });

  it('should return model template information', () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const modelTemplate: ModelTemplate = {
      key: 1,
      id: '1',
      createdAt,
      updatedAt,
      version: 1,
      deleted: false
    };
    const fakeContext = new Context();
    const template = new ModelViewTemplate(fakeContext, modelTemplate);
    expect(template.key).toBe(1);
    expect(template.id).toBe('1');
    expect(template.createdAt).toBe(createdAt);
    expect(template.updatedAt).toBe(updatedAt);
  });
});
