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

export function fetchGitHubRepo(repo: string): QueryOptions<GITHUB> {
  return {
    queryKey: [repo, 'repos'],
    queryFn: () => unInstance.get(`repos/${repo}`),
  }
}
