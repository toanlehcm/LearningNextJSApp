import React from 'react'
import { Button } from '@mui/material'

interface ITabButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
}

export default function TabButton({ label, isSelected, onClick }: ITabButtonProps) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: isSelected ? '#0018A8' : 'transparent',
        color: isSelected ? '#fff' : '#6b7280',
        border: isSelected ? 'none' : '1px solid #d1d5db',
        borderRadius: '20px',
        padding: '8px 16px',
        fontWeight: isSelected ? 500 : 400,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: isSelected ? '#0018A8' : '#f3f4f6'
        }
      }}
    >
      {label}
    </Button>
  )
}
