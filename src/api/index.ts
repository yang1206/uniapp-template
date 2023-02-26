import request from '@/service'

export const getGithub = (data?: any) => {
  return request<{ owner: { archive_url: string; login: string }; full_name: string; html_url: string }>({
    url: 'https://api.github.com/repos/yang1206/vue-template',
    method: 'GET',
    data,
  })
}
