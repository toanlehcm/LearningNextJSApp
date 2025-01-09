// 'use client'
import { Box, Typography, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import Chart from './Chart'
import { useState } from 'react'

interface IWidgetProps {
  data: { date: string; value: number }[]
  title: string
  description?: string
}

export default function Widget({ data = [], title = '', description = '' }: IWidgetProps) {
  const [dragMode, setDragMode] = useState(false)

  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: '#fff',
        position: 'relative',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden', // Ensure no overflow
        clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)' // Missing top-right corner
      }}
    >
      {/* MoreVertIcon positioned outside the cut-out */}
      <IconButton
        onClick={() => setDragMode(!dragMode)}
        sx={{
          position: 'absolute',
          top: -8,
          right: -8,
          backgroundColor: '#E5E7EB',
          '&:hover': { backgroundColor: '#D1D5DB' },
          padding: '8px',
          borderRadius: '50%',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <MoreVertIcon sx={{ color: '#4B5563' }} />
      </IconButton>

      {/* Title Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>

        {/* <IconButton
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: '#E5E7EB',
            '&:hover': { backgroundColor: '#D1D5DB' },
            padding: '8px',
            borderRadius: '50%',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <MoreVertIcon />
        </IconButton> */}
      </Box>
      <Typography variant='body2' color='textSecondary' sx={{ marginBottom: '16px' }}>
        {description}
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
          onClick={() => setDragMode(!dragMode)}
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
