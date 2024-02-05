import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';

import { AppConfig } from '@/config/AppConfig';
import Providers from '@/context/providers';
import Main from '@/templates/Main';

export const viewport = {
  themeColor: 'black',
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  return {
    metadataBase: new URL(AppConfig.url),
    title: { template: `%s - ${t('site.title')}`, default: t('site.title') },
    description: t('site.description'),
    openGraph: {
      title: t('site.title'),
      description: t('site.description'),
      type: 'website',
      locale,
      alternateLocale: AppConfig.locales,
      url: '/',
    },
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-3HGW4CY6F0"
        />
        <Script strategy="lazyOnload" id="google-analytics">
          {`const gaIds = ${JSON.stringify(AppConfig.googleAnalyticsIds)};
            console.log('AppConfig.googleAnalyticsIds', gaIds)
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3HGW4CY6F0');
            if(gaIds){
              try {
                gaIds.forEach((gaId) => gtag('config', gaId))
              } catch(error) {
                gtag('config', gaIds);
              }
            }`}
        </Script>
      </head>
      <body className={AppConfig.fontFamily.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <CssBaseline />
            <Providers>{children}</Providers>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
