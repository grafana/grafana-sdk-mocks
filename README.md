# NOTE, this is no longer the recommended way to develop Grafana Plugins:

We recommend copying one of the following projects and using its config files:
* https://github.com/grafana/simple-angular-panel
* https://github.com/grafana/simple-react-panel  (ALPHA -- the interfaces are still a work in progress)
* https://github.com/grafana/simple-json-datasource

---

# Grafana SDK Mocks for Plugins

This package facilitates writing Grafana plugins in TypeScript.

- provides Typescript typings for the most common Grafana classes.
- provides some simple fakes and util files to test plugins with Karma

## Setup

### With npm, Grunt, karma and mocha.js

This shows how to setup a project with Grunt as the build system, using npm to install the packages (yarn is very similar), karma for unit testing and mocha with expect.js for unit testing.

1. `npm install --save systemjs lodash moment` (lodash and moment are optional)
2. `npm install --save-dev grunt grunt-contrib-clean grunt-contrib-copy grunt-contrib-watch grunt-typescript karma karma-expect karma-mocha karma-chrome-launcher karma-sinon karma-systemjs karma-phantomjs-launcher plugin-typescript q sinon`
3. Install this package: `npm install --save-dev grafana/grafana-sdk-mocks`
4. Here is an example Gruntfile for building TypeScript. It expects the TypeScript files to be located in a `src` subdirectory.

```js
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    clean: ['dist'],

    copy: {
      dist_js: {
        expand: true,
        cwd: 'src',
        src: ['**/*.ts', '**/*.d.ts'],
        dest: 'dist'
      },
      dist_html: {
        expand: true,
        flatten: true,
        cwd: 'src/partials',
        src: ['*.html'],
        dest: 'dist/partials/'
      },
      dist_statics: {
        expand: true,
        flatten: true,
        src: ['src/plugin.json', 'LICENSE', 'README.md'],
        dest: 'dist/'
      }
    },

    typescript: {
      build: {
        src: ['dist/**/*.ts', '!**/*.d.ts'],
        dest: 'dist',
        options: {
          module: 'system',
          target: 'es5',
          rootDir: 'dist/',
          declaration: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          sourceMap: true,
          noImplicitAny: false,
        }
      }
    },

    watch: {
      files: ['src/**/*.ts', 'src/**/*.html', 'src/plugin.json', 'README.md'],
      tasks: ['default'],
      options: {
        debounceDelay: 250,
      },
    }
  });

  grunt.registerTask('default', [
    'clean',
    'copy:dist_js',
    'typescript:build',
    'copy:dist_html',
    'copy:dist_statics'
  ]);
};
```
5. Here is an example karma.conf.js file. It assumes that test files are located in the `specs` subdirectory. It includes config for lodash, momentjs and q (promises).

```js
'use strict';
module.exports = function(config) {
    config.set({
      frameworks: ['systemjs', 'mocha', 'expect', 'sinon'],

      files: [
        'specs/*.ts',
        { pattern: 'src/**/*.ts', included: false },
        { pattern: 'node_modules/grafana-sdk-mocks/**/*.ts', included: false },
        { pattern: 'node_modules/grafana-sdk-mocks/**/*.js', included: false },
        { pattern: 'node_modules/typescript/lib/typescript.js', included: false },
        { pattern: 'node_modules/lodash/lodash.js', included: false },
        { pattern: 'node_modules/moment/moment.js', included: false },
        { pattern: 'node_modules/q/q.js', included: false },
      ],

      systemjs: {
      //   // SystemJS configuration specifically for tests, added after your config file.
      //   // Good for adding test libraries and mock modules
        config: {
          // Set path for third-party libraries as modules
          paths: {
            'systemjs': 'node_modules/systemjs/dist/system.js',
            'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
            'lodash': 'node_modules/lodash/lodash.js',
            'moment': 'node_modules/moment/moment.js',
            'q': 'node_modules/q/q.js',
            'typescript': 'node_modules/typescript/lib/typescript.js',
            'plugin-typescript': 'node_modules/plugin-typescript/lib/plugin.js',
            'app/': 'node_modules/grafana-sdk-mocks/app/',
          },

          map: {
              'plugin-typescript': 'node_modules/plugin-typescript/lib/',
              'typescript': 'node_modules/typescript/',
              'app/core/utils/kbn': 'node_modules/grafana-sdk-mocks/app/core/utils/kbn.js'
          },

          packages: {
            'plugin-typescript': {
                'main': 'plugin.js'
            },
            'typescript': {
                'main': 'lib/typescript.js',
                'meta': {
                    'lib/typescript.js': {
                        'exports': 'ts'
                    }
                }
            },
            'app': {
              'defaultExtension': 'ts',
              'meta': {
                '*.js': {
                  'loader': 'typescript'
                }
              }
            },
            'src': {
              'defaultExtension': 'ts',
            },
            'specs': {
              'defaultExtension': 'ts',
              'meta': {
                '*.js': {
                  'loader': 'typescript'
                }
              }
            },
          },

          transpiler: 'plugin-typescript',
        }
      },

      reporters: ['dots'],

      logLevel: config.LOG_INFO,

      browsers: ['PhantomJS']
    });
};
```

### Typings

Use the following [triple slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) to use Grafana classes in your code. The directive will point the TypeScript compiler at the mocks package so that it can find the files it needs to build. Place the directive at the top of all your TypeScript files:

```
///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
```


### Commands to build and test

- `grunt` to build. This will create the `dist` subdirectory, copy the TypeScript files there, transpile them to JavaScript as well as copying html files, the License file, the Readme and plugin.json to `dist`.
- `grunt watch` runs grunt when a file is changed. Useful while developing.
- `karma start --single-run` runs the unit tests in the `specs` subdirectory.
- `karma start` is a test watcher for unit tests. It will rerun the tests when a file is changed.
