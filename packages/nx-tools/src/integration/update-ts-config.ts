import { Rule } from '@angular-devkit/schematics'
import { NxConstants } from '@constants/nx.constants'
import { updateJsonInTree } from '@nrwl/workspace'

/**
 * Updates tsconfig paths in the tsconfig.json
 * @param options
 */
export function updateTsConfigPathsRule (options: { packageName: string, root: string, sourceRoot?: string }): Rule {
  return updateJsonInTree(NxConstants.TS_CONFIG_PATH, (json) => {
    json.compilerOptions.paths[options.packageName] = [ `${options.root}/${options.sourceRoot}` ]
    json.compilerOptions.paths[`${options.packageName}/*`] = [ `${options.root}/${options.sourceRoot}/*` ]

    return json
  })
}

/**
 * Removes tsconfig paths in the tsconfig.json
 * @param options
 */
export function removeTsConfigPathsRule (options: { packageName: string }): Rule {
  return updateJsonInTree(NxConstants.TS_CONFIG_PATH, (json) => {
    Object.keys(json.compilerOptions.paths).forEach((path) => {
      if (path.startsWith(`${options.packageName}`)) {
        delete json.compilerOptions.paths[path]
      }
    })

    return json
  })
}
