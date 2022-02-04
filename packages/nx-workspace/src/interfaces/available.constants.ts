import type { PrettyNames } from '@webundsoehne/nx-tools'
import { PrettyNamesDefault } from '@webundsoehne/nx-tools'

/**
 * All the available clis that can be generated by this schematic.
 */
export enum AvailableCLIs {
  NX = 'nx'
}

export enum AvailableFolderStructures {
  MULTIPLE = 'apps-and-libs',
  SINGLE = 'packages'
}

export const AvailableWorkspaceFiles: Record<AvailableCLIs, string> = {
  [AvailableCLIs.NX]: 'workspace'
}

export const AvailableCLICommands: Record<AvailableCLIs, string> = {
  [AvailableCLIs.NX]: 'nx'
}

export enum AvailableLibraryTypes {
  SHARED = 'shared',
  BUILDABLE = 'buildable'
}

/**
 * Prettified names for components to use with prompts and such.
 */
export const PrettyNamesForAvailableThingies: PrettyNames<AvailableCLIs | AvailableFolderStructures> = {
  [AvailableCLIs.NX]: '@nrwl/nx',
  [AvailableFolderStructures.MULTIPLE]: 'Multiple Folders: "apps-and-libs"',
  [AvailableFolderStructures.SINGLE]: 'Single Folder: "packages"',
  ...PrettyNamesDefault
}
