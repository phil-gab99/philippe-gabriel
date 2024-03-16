export interface Project {
  name: string
  description: string
  sourceUrl: string
  dateStart: string
  dateEnd: string
  stack: { name: string, icon: string }
  featured: boolean
}
