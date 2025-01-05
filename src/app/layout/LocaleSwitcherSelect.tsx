'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'
import { useTransition } from 'react'
import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/services/locale'

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string }>
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <div className='relative'>
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            'rounded-sm p-2 transition-colors hover:bg-slate-200',
            isPending && 'pointer-events-none opacity-60'
          )}
        >
          <Select.Icon>{defaultValue}</Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            align='end'
            className='min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md'
            position='popper'
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className='flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100'
                  value={item.value}
                >
                  <div className='mr-2 w-[1rem]'>
                    {item.value === defaultValue && <CheckIcon className='h-5 w-5 text-slate-600' />}
                  </div>

                  <button>
                    {/* {item.value === 'en' ? 🇬🇧 : 🇬}  */}
                    <span className='text-slate-900'>
                      {item.value === 'en' ? 'EN' : 'VI'}
                      {/* {item.label} */}
                    </span>
                  </button>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className='fill-white text-white' />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
