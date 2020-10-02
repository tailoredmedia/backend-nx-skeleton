import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { addLintFiles, Linter } from '@nrwl/workspace'
import { eslintDeps, eslintJson } from '@utils/lint'
import { formatFiles, Logger, runInRule, updateTsconfigPaths } from '@webundsoehne/nx-tools'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateIntegration } from './lib/update-integration'
import { Schema } from './main.interface'
import init from '@src/schematics/init/main'

export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      runInRule(log.info.bind(log), 'Initiating workspace.'),
      init({
        ...options,
        skipFormat: true
      }),

      runInRule(log.info.bind(log), 'Adding project to workspace.'),
      addProject(options),

      !host.exists(`${options.root}/.eslintrc`)
        ? chain([
          runInRule(log.info.bind(log), 'Adding eslint configuration.'),

          addLintFiles(options.root, Linter.EsLint, {
            localConfig: eslintJson,
            extraPackageDeps: eslintDeps
          })
        ])
        : runInRule(log.warn.bind(log), 'Skipping since eslint configuration already exists.'),

      runInRule(log.info.bind(log), 'Creating application files.'),
      await createApplicationFiles(options, context),

      runInRule(log.info.bind(log), 'Updating integration.'),
      updateIntegration(options),

      runInRule(log.info.bind(log), 'Updating tsconfig files.'),
      updateTsconfigPaths(options),

      !schema.skipFormat ? chain([ runInRule(log.info.bind(log), 'Formatting and linting files.'), formatFiles({ eslint: true, prettier: true }) ]) : noop()
    ])
  }
}
