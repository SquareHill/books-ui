import { Title, Text } from '@mantine/core';
import Search from '@/components/search/Search';

export function HomePage() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        display: 'grid',
        gap: '10px',
        padding: '50px 0px',
      }}
    >
      <Title>
        Welcome,{' '}
        <Text
          inherit
          component={'span'}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'grape', deg: 28 }}
        >
          Book Liker
        </Text>
      </Title>
      <Search />
    </div>
  );
}
