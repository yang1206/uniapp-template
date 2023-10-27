import { useStorageAsync } from '@uni-helper/uni-use'

// import type { RemovableRef } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'
import { DefaultToken, TokenKey } from '@/constants'

/**
 * Generates a function comment for the given function body.
 *
 * @param {string} initialToken - the initial token value (optional, default: DefaultToken)
 * @return {RemovableRef<string>} the token value
 */
export function useToken(initialToken: string = DefaultToken): RemovableRef<string> {
  const token = useStorageAsync(TokenKey, initialToken)
  return token
}
