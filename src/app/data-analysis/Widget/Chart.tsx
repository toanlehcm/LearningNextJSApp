import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface IChartProps {
  data: { date: string; value: number }[]
}

export default function Chart({ data = [] }: IChartProps) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data}>
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='value' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  )
}
