
export interface GitHubPullRequest {
  id: number
  number: number
  title: string
  body: string | null
  html_url: string
  state: 'open' | 'closed'
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
  user: {
    login: string
    avatar_url: string
    html_url: string
  }
  head: {
    ref: string
    repo: {
      name: string
      full_name: string
      owner: {
        login: string
      }
    }
  }
  base: {
    ref: string
    repo: {
      name: string
      full_name: string
      owner: {
        login: string
      }
    }
  }
}

export interface ProcessedContribution {
  title: string
  description: string
  repository: string
  link: string
  date: string
  type: 'feature' | 'fix' | 'perf' | 'docs' | 'refactor' | 'test' | 'chore'
  state: 'open' | 'closed' | 'merged'
}
export const fallbackContributions: ProcessedContribution[] = [

  {
      
    title: "feat: Selected actions to perform pause,resume work and a bulk-delete option",
    description: "Added selected actions to perform pause, resume work and a bulk-delete option in Uptime Kuma.",
    repository: "uptime-kuma",
    link: "https://github.com/louislam/uptime-kuma/pull/6676",
    date: "2025",
    type: "feature",
    state: "merged"
  },
  {    
    title: "fix: Remove active line background color in HtmlEditor",
    description: "Removed the active line background color in the HtmlEditor component to enhance user experience.",
    repository: "useplunk",
    link: "https://github.com/useplunk/plunk/pull/245",
    date: "2025",
    type: "fix",
    state: "merged"
  },
  {
    title: "feat: New API endpoint to fetch bookings for standalone teams ",
    description: "Added a new API endpoint to fetch bookings for standalone teams in the Plunk project.",
    repository: "cal.com",
    link: "https://github.com/calcom/cal.com/pull/26818/",
    date: "2025",
    type: "feature",
    state: "open"

  },
  {
    title: " feat: select all monitors on the maintenance page ",
    description: "Implemented a feature to select all monitors on the maintenance page in Uptime Kuma.",
    repository: "uptime-kuma",
    link: "https://github.com/louislam/uptime-kuma/pull/6528",
    date: "2025",
    type: "feature",
    state: "merged"
  },
  {
    title: "feat: RTSP (Real Time Streaming Protocol) support",
    description: "Added RTSP (Real Time Streaming Protocol) support to Uptime Kuma for enhanced monitoring capabilities.",
    repository: "uptime-kuma",
    link: "https://github.com/louislam/uptime-kuma/pull/5954",
    date: "2025",
    type: "feature",
    state: "merged"
  },
  {
    title: "fix: fixed redis connection",
    description: "Fixed the redis connection issue in the MotiaDev project.",
    repository: "MotiaDev",
    link: "https://github.com/MotiaDev/motia/pull/1078",
    date: "2025",
    type: "fix",
    state: "merged"
  },
  
]
