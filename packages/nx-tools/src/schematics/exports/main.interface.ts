import type { BarebonesSchema } from '@interfaces/base-schemas.interface'
import type { GenerateExportsJinjaTemplateOptions } from '@rules/generate-exports.rule.interface'

// this is the one gets inputted from the command line
export interface Schema extends BarebonesSchema {
  templates: GenerateExportsJinjaTemplateOptions
}

export interface NormalizedSchema extends Schema {
  templates: Schema['templates']
}
