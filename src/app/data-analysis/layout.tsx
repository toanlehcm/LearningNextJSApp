import DashboardTab from './DashboardTab/page'

export default function DataAnalysisLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardTab />
      {children}
    </>
  )
}
