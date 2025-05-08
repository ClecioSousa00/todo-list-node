import { HashComparer } from './hash-comparer'
import { HashGenerator } from './hash-generator'
import bcryptjs from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return await bcryptjs.hash(plain, 6)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(plain, hash)
  }
}
