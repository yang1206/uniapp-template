import request from '@/service'

interface GITHUB {
  owner: {
    archive_url: string
    login: string
  }
  full_name: string
  html_url: string
}
export function getGithub() {
  return request<any, GITHUB>({
    url: '/uniapp-template',
    method: 'GET',
  })
}
