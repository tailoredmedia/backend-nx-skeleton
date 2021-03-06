import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'
import type { Linter } from '@nrwl/workspace'
import { addLintFiles } from '@nrwl/workspace'

import { AvailableLinterTypes } from '@constants/available.constants'
import type { BaseNormalizedSchemaRoot } from '@interfaces/base-schemas.interface'
import { runInRule } from '@rules/run.rule'
import { Logger } from '@utils'

/**
 * Adding eslint to workspace
 * @param  {Tree} host
 * @param  {Logger} log
 * @param  {T} options
 * @param  {{json:any} eslint
 * @param  {any}} deps
 * @returns Rule
 */
export function addEslintConfigRule<T extends BaseNormalizedSchemaRoot> (options: T, eslint: { json: any, deps: any }): Rule {
  return (host: Tree, context: SchematicContext): Rule => {
    const log = new Logger(context)

    return chain([
      !host.exists(`${options.root}/.eslintrc`) && !host.exists(`${options.root}/.eslintrc.json`) && !host.exists(`${options.root}/.eslintrc.js`)
        ? chain([
          runInRule(log.info.bind(log)('Adding eslint configuration.')),

          addLintFiles(options.root, AvailableLinterTypes.ESLINT as unknown as Linter, {
            localConfig: eslint.json,
            extraPackageDeps: eslint.deps
          })
        ])
        : runInRule(log.warn.bind(log)('Skipping since eslint configuration already exists.'))
    ])
  }
}
