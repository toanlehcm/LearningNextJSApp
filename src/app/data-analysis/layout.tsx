'use client'
import ActionBar from './ActionBar/page'
import DashboardTab from './DashboardTab/page'

export default function DataAnalysisLayout({ children }: { children: React.ReactNode }) {
  const handleAddWidget = () => {
    console.log('Add Widget clicked')
  }

  const handleDownload = () => {
    console.log('Download clicked')
  }

  return (
    <>
      <DashboardTab />
      <ActionBar onAddWidget={handleAddWidget} onDownload={handleDownload} />
      {children}
    </>
  )
}
