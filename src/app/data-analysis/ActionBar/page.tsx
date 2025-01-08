import React from 'react'
import { Box, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'

interface IActionBarProps {
  onAddWidget?: () => void
  onDownload?: () => void
}

export default function ActionBar({ onAddWidget, onDownload }: IActionBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}
    >
      {/* Left Section */}
      <Box>
        <Button
          onClick={onAddWidget}
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            borderRadius: '20px',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: '#e5e7eb'
            }
          }}
        >
          Add Widget
        </Button>
      </Box>

      {/* Right Section */}
      <Box>
        <IconButton
          onClick={onDownload}
          sx={{
            backgroundColor: '#f3f4f6',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: '#e5e7eb'
            }
          }}
        >
          <DownloadIcon sx={{ color: '#6b7280' }} />
        </IconButton>
      </Box>
    </Box>
  )
}
