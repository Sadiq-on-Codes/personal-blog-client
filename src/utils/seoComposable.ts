import { useHead } from '@vueuse/head'

export function useSEO(title: string, description: string, location: string = 'Africa') {
  useHead(() => ({
    title: `${title} | Sadiq on Codes`,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} | Sadiq on Codes` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'geo.region', content: '002' }, // UN M.49 code for Africa
      { name: 'geo.placename', content: location },
      // Average coordinates for Africa (approximate)
      { name: 'geo.position', content: '8.7832;34.5085' },
      { name: 'ICBM', content: '8.7832, 34.5085' },
    ],
    link: [
      { rel: 'alternate', hreflang: 'en-af', href: 'https://sadiqoncodes.com' + window.location.pathname }
    ]
  }))
}
