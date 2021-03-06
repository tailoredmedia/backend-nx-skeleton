import type { Rule } from '@angular-devkit/schematics'
import { filter, forEach, move, noop, applyPathTemplate } from '@angular-devkit/schematics'

import type { BaseCreateApplicationFilesOptions, CreateApplicationRuleInterface, CreateApplicationRuleOptions } from '@rules/create-application.rule.interface'
import { jinjaTemplate, multipleJinjaTemplate } from '@templates/template-engine'
import { formatFilesRule } from '@utils/file-system/format-files'

/**
 * Returns a general application rule that can be used in schematics.
 * @param rules
 * @param options
 * @param ruleOptions
 */
export function createApplicationRule<T extends BaseCreateApplicationFilesOptions> (
  rules: CreateApplicationRuleInterface,
  options?: T,
  ruleOptions?: CreateApplicationRuleOptions
): Rule[] {
  return [
    /**
     * Include files and folders depending on the SchematicFolder infastructure
     * This is mostly for conditional imports of files.
     */
    ...rules.include && typeof rules.include === 'object'
      ? Object.values(rules.include).map((val) => {
        return val.condition ?? true ? noop() : filter((file) => !val.files?.some((f) => file.match(f)))
      })
      : [],

    ...rules.include && typeof rules.include === 'object'
      ? Object.values(rules.include).map((val) => {
        return val.condition ?? true ? noop() : filter((file) => !val.folders?.some((f) => file.match(f)))
      })
      : [],

    /**
     * Cleaning up unwanted files and folders from tree
     * This is mostly for __${NAME}__ like file templates
     */

    // clean up unwanted folders from tree
    ...rules.templates?.map((val) => {
      return !val.condition ?? false ? filter((file) => !file.match(`__${val.match}__`)) : noop()
    }) ?? [],

    // omit some folders
    ...rules.omit?.map((val) => {
      return val.condition ?? false ? filter((file) => val.match(file)) : noop()
    }) ?? [],

    /**
     * Generating templates through jinja
     * These templates can be generated from a in-place template or generated multiple by a single template
     */

    // interpolate multiple templates first because we want to remove the jinja file
    ...rules.multipleTemplates?.map((val) => {
      return val.condition ?? true
        ? multipleJinjaTemplate<Record<string, any>>(
          {
            ...options ?? {}
            // offsetFromRoot: offsetFromRoot(options.root)
          },
          {
            templates: val.templates
          }
        )
        : noop()
    }) ?? [],

    // interpolate the templates
    jinjaTemplate(
      {
        ...options ?? {}
        // offsetFromRoot: offsetFromRoot(options.root)
      },
      { templates: ['.j2'] }
    ),

    /**
     * Clean up the file names or do renames
     * Mostly for templates
     */

    // FIXME: This trickery is required in some of the stupid stuff, having two template engines and history merging
    // future note: this clears the __ from the names of the paths coming from angular schematics
    // node_modules check is required because the host might include it in the virtual filesystem
    forEach((entry) => {
      if (!entry.path.includes('node_modules')) {
        return applyPathTemplate(
          rules.templates?.reduce((o, val) => {
            return val.condition ? { ...o, [String(val.match)]: val?.rename ?? '' } : o
          }, {})
        )(entry)
      } else {
        return entry
      }
    }),

    /**
     * Trigger some additional rules
     */

    ...rules.trigger
      ?.map((val) => {
        return val.condition ?? true ? Array.isArray(val.rule) ? val.rule : [val.rule] : noop()
      })
      .flat() ?? [],

    // move all the files to package root
    options?.root ? move(options.root) : noop(),

    /**
     * Format
     * May be required for diff-merge rules
     */
    // need to format files before putting them through difference, or else it goes crazy.
    rules.format
      ? formatFilesRule({
        ...ruleOptions?.format ?? {}
      })
      : noop()
  ]
}
