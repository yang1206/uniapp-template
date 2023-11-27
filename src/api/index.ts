import type { QueryOptions } from '@tanstack/vue-query'
import { unInstance } from '@/service'

interface GITHUB {
  owner: {
    archive_url: string
    login: string
  }
  full_name: string
  html_url: string
}

export function fetchGitHubRepo(repo: string) {
  return {
    queryKey: [repo, 'repos'],
    queryFn: async () => (await unInstance.get<GITHUB>(`repos/${repo}`)).data,
  }
}
