import Card from './Card'
import Chart from './Chart'

const mockData = [
  { date: 'Jan', value: 100 },
  { date: 'Feb', value: 200 },
  { date: 'Mar', value: 300 }
]

export default function Dashboard({ data, dashboardId }: { data: any[]; dashboardId: string }) {
  return (
    <div className='dashboard'>
      <h1>{`Dashboard ${dashboardId}`}</h1>

      <div className='dashboard-widgets'>
        {/* <Card title='Consumption'>
          <Chart data={mockData} />
        </Card> */}

        {/* <Card title='Revenue Comparison'>
          <Chart data={mockData} />
        </Card> */}

        {/* Add more widgets dynamically */}
      </div>
    </div>
  )
}
