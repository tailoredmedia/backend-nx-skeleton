import type { AvailableGenerators } from '@interfaces'
import type { Schema as GeneratorBaseSchema, NormalizedSchema as GeneratorBaseNormalizedSchema } from '@webundsoehne/nx-tools/dist/schematics/generator/main.interface'

type TypedBaseSchema = GeneratorBaseSchema<AvailableGenerators>

type TypedBaseNormalizedSchema = GeneratorBaseNormalizedSchema<never, AvailableGenerators>

export type { TypedBaseSchema as Schema, TypedBaseNormalizedSchema as NormalizedSchema }
