'use client'
import { Suspense, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableWidget from './Widget/SortableWidget'

// async function fetchData(dashboardId: string) {
//   const res = await fetch(`https://api.example.com/dashboard/${dashboardId}`)
//   if (!res.ok) throw new Error('Failed to fetch data')
//   return res.json()
// }

const mockData = [
  { date: 'Dec 23', value: 250 },
  { date: 'Jan 24', value: 500 },
  { date: 'Feb 24', value: 1000 },
  { date: 'Mar 24', value: 400 },
  { date: 'Apr 24', value: 600 },
  { date: 'May 24', value: 500 },
  { date: 'Jun 24', value: 750 },
  { date: 'Jul 24', value: 300 },
  { date: 'Aug 24', value: 800 },
  { date: 'Sep 24', value: 400 },
  { date: 'Oct 24', value: 900 },
  { date: 'Nov 24', value: 1000 }
]

const mockWidgets = [
  { id: '1', title: 'Consumption', description: 'Analysis of energy consumption', data: mockData },
  { id: '2', title: 'Revenue Comparison', description: 'Revenue trends over time', data: mockData }
]

export default function DataAnalysisPage({ params }: { params: { dashboardId: string } }) {
  // const data = await fetchData(params.dashboardId)

  const [widgets, setWidgets] = useState(mockWidgets)

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = widgets.findIndex((widget) => widget.id === active.id)
      const newIndex = widgets.findIndex((widget) => widget.id === over.id)
      setWidgets(arrayMove(widgets, oldIndex, newIndex))
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets.map((widget) => widget.id)} strategy={verticalListSortingStrategy}>
          {widgets.map((widget) => (
            <SortableWidget
              key={widget.id}
              id={widget.id}
              title={widget.title}
              description={widget.description}
              data={widget.data}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Suspense>
  )
}
