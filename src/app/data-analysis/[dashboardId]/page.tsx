// import Dashboard from "./components/Dashboard"
import Dashboard from '@/app/data-analysis/[dashboardId]/components/Dashboard'
import { Suspense } from 'react'

// async function fetchData(dashboardId: string) {
//   const res = await fetch(`https://api.example.com/dashboard/${dashboardId}`)
//   if (!res.ok) throw new Error('Failed to fetch data')
//   return res.json()
// }

export default async function DataAnalysisPage({ params }: { params: { dashboardId: string } }) {
  // const data = await fetchData(params.dashboardId)

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard data={[]} dashboardId={params.dashboardId} />
      </Suspense>
    </main>
  )
}
