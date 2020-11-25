import { BaseCommand } from '@cenk1cenk2/boilerplate-oclif'

import { Configuration } from '@interfaces/default-config.interface'

export class GitlabCiCommand extends BaseCommand<Configuration> {
  static description = 'Create a gitlab ci configuration from known NX configuration.'
  static aliases = [ 'ci' ]

  public async run (): Promise<void> {
    this.logger.warn('Gitlab-ci generation will go here.')
  }
}