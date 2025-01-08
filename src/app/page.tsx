import { useTranslations } from 'next-intl'
export default function Home({ children }: any) {
  const t = useTranslations('HomePage')

  return (
    <main>
      <h1>{t('title')}</h1>
      {/* {children} */}
    </main>
  )
}
