import { Box, Typography, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import Chart from './Chart'

const data = [
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

export default function Widget() {
  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: '#fff',
        position: 'relative',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Title Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Consumption
        </Typography>

        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Typography variant='body2' color='textSecondary' sx={{ marginBottom: '16px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.
      </Typography>

      {/* Chart Section */}
      <Box sx={{ width: '100%', height: 300, position: 'relative' }}>
        <Chart data={data} />

        {/* Drag-and-Drop Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: '#f0f0f0',
            '&:hover': { backgroundColor: '#e0e0e0' }
          }}
        >
          <OpenWithIcon fontSize='small' />
        </IconButton>
      </Box>

      {/* Footer Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant='body2' color='textSecondary'>
          Last 12 months
        </Typography>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
