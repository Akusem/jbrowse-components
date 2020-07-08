import { Command, flags } from '@oclif/command'
import * as fs from 'fs'
import { promises as fsPromises } from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'
import * as unzip from 'unzipper'

export default class Upgrade extends Command {
  static description = 'Upgrades JBrowse 2 to latest version'

  static examples = [
    '$ jbrowse upgrade',
    '$ jbrowse upgrade /path/to/jbrowse2/installation',
  ]

  static args = [
    {
      name: 'userPath',
      required: false,
      description: `Location where JBrowse 2 is installed`,
    },
    {
      name: 'placeholder',
      required: false,
      description: `Placeholder for config file migration scripts`,
    },
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run() {
    const { args: runArgs } = this.parse(Upgrade)
    const { userPath: argsPath } = runArgs as { userPath: string }

    const upgradePath = argsPath || '.'
    this.debug(`Want to upgrade at: ${upgradePath}`)

    await this.checkLocation(upgradePath)

    let response
    try {
      response = await fetch(
        'https://s3.amazonaws.com/jbrowse.org/jb2_releases/JBrowse2_PKX_cli_testing.zip',
        {
          method: 'GET',
        },
      )
    } catch (error) {
      this.error(error)
    }
    if (!response.ok) this.error(`Failed to fetch JBrowse2 from server`)

    let body
    try {
      body = await response.body
    } catch (error) {
      this.error(error)
    }
    body
      .pipe(unzip.Parse())
      .on('entry', async entry => {
        const { path: fileName, type } = entry
        if (type === 'Directory') {
          try {
            await fsPromises.mkdir(path.join(upgradePath, fileName), {
              recursive: true,
            })
          } catch (error) {
            this.error(error)
          }
        }
        entry.pipe(fs.createWriteStream(path.join(upgradePath, fileName)))
      })
      .on('error', err => {
        this.error(
          `Failed to upgrade JBrowse 2 with error: ${err}. Please try again later`,
        )
      })
      .on('close', () => {
        this.log(`Your JBrowse 2 setup has been upgraded`)
      })
  }

  async checkLocation(userPath: string) {
    let manifestJson: string
    try {
      manifestJson = await fsPromises.readFile(
        path.join(userPath, 'manifest.json'),
        {
          encoding: 'utf8',
        },
      )
    } catch (error) {
      this.error(
        'Could not find the file "manifest.json". Please make sure you are in the top level of a JBrowse 2 installation or provide the path to one.',
        { exit: 10 },
      )
    }

    let manifest: { name?: string } = {}
    try {
      manifest = JSON.parse(manifestJson)
    } catch (error) {
      this.error(
        'Could not parse the file "manifest.json". Please make sure you are in the top level of a JBrowse 2 installation or provide the path to one.',
        { exit: 20 },
      )
    }
    if (manifest.name !== 'JBrowse') {
      this.error(
        '"name" in file "manifest.json" is not "JBrowse". Please make sure you are in the top level of a JBrowse 2 installation or provide the path to one.',
        { exit: 30 },
      )
    }
  }
}