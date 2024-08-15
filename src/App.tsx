import { Content } from '@/components/Content'
import { Sidebar } from '@/components/Sidebar'

export const App = () => {
  return (
    <main className="h-screen overflow-hidden flex">
      <Sidebar />
      <Content />
    </main>
  )
}
