// plopfile.js
module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // component generator
  plop.setGenerator('component', {
    description: 'create react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.test.tsx',
        templateFile: 'plop-templates/component.test.hbs',
      },
    ],
  })
}
