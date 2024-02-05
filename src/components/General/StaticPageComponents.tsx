import { List, ListItemText, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { AppConfig } from '@/config/AppConfig';

export const PageHeader = ({ title }: { title: string }) => (
  <Typography variant="h2" fontSize={{ xss: '3.75rem', md: '3rem' }} fontWeight="bold">
    {title}
  </Typography>
);

export const PageSubHeader = ({ title }: { title: string | React.ReactNode }) => (
  <Typography variant="h4" fontSize={{ xss: '1.25rem', md: '1.5rem' }} fontWeight="bold">
    {title}
  </Typography>
);

export const BodyText = ({ text }: { text: string | React.ReactNode }) => (
  <Typography
    variant="body1"
    fontSize="1rem"
    sx={{ a: { color: `${AppConfig.primaryContent} !important` } }}
    color={AppConfig.secondaryContent}
  >
    {text}
  </Typography>
);
export const Block = ({ children }: { children: React.ReactNode }) => (
  <Stack gap={3.5} p={3}>
    {children}
  </Stack>
);

export const Sections = ({ children }: { children: React.ReactNode }) => (
  <Stack gap={3}>{children}</Stack>
);

export const Section = ({ children }: { children: React.ReactNode }) => (
  <Stack gap={1}>{children}</Stack>
);

export const MappedSection = ({ t, sections }: { t: any; sections: string[] }) => (
  <Sections>
    {sections.map((key) => (
      <Section key={key}>
        {t.rich(`${key}.body`, {
          title: (chunks: any) => <PageSubHeader title={chunks} />,
          p: (chunks: any) => <BodyText text={chunks} />,
          sitelink: (chunks: any) => (
            <Link href={chunks.toString().replace(/^www/, 'https://www')}>{chunks}</Link>
          ),
          ul: (chunks: any) => <List sx={{ listStyle: 'square', pl: 3 }}>{chunks}</List>,
          li: (chunks: any) => (
            <ListItemText
              sx={{ display: 'list-item', color: AppConfig.secondaryContent }}
            >
              <BodyText text={chunks} />
            </ListItemText>
          ),
        })}
      </Section>
    ))}
  </Sections>
);
