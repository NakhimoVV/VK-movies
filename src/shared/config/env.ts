import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ENV_DEFAULT_PATH = join(process.cwd(), '.env.default')

function readEnvFromDefaultFile(name: string): string {
  try {
    const content = readFileSync(ENV_DEFAULT_PATH, 'utf-8')
    const match = content.match(new RegExp(`^${name}=(.*)$`, 'm'))

    return match?.[1]?.trim() ?? ''
  } catch {
    return ''
  }
}

export function getRequiredEnv(name: string): string {
  const value = process.env[name] ?? readEnvFromDefaultFile(name)

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}
