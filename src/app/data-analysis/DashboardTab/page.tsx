import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box, IconButton } from '@mui/material'
import TabButton from './TabButton'

interface IDashboardTabProps {
  initialTabs?: string[] // Initial list of tabs
}
export default function DashboardTab({ initialTabs = [] }: IDashboardTabProps) {
  const [tabs, setTabs] = useState(initialTabs)
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const handleAddTab = () => {
    const newTab = `Dashboard ${tabs.length + 1}`
    setTabs([...tabs, newTab])
    setSelectedTab(newTab)
  }

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <Box display='flex' alignItems='center' gap={1}>
      {tabs.map((tab) => (
        <TabButton key={tab} label={tab} isSelected={tab === selectedTab} onClick={() => handleSelectTab(tab)} />
      ))}
      <IconButton
        onClick={handleAddTab}
        sx={{
          backgroundColor: '#f3f4f6',
          width: '40px',
          height: '40px',
          borderRadius: '50%'
        }}
      >
        <AddIcon sx={{ color: '#6b7280' }} />
      </IconButton>
    </Box>
  )
}
