'use client'
import { Suspense } from 'react'
import Widget from './Widget/page'

// async function fetchData(dashboardId: string) {
//   const res = await fetch(`https://api.example.com/dashboard/${dashboardId}`)
//   if (!res.ok) throw new Error('Failed to fetch data')
//   return res.json()
// }

export default async function DataAnalysisPage({ params }: { params: { dashboardId: string } }) {
  // const data = await fetchData(params.dashboardId)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Widget />
    </Suspense>
  )
}
