import { Title, Text } from '@mantine/core';
import SearchComponents from '@/components/search/Search';

export function Search() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        display: 'grid',
        gap: '10px',
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
      <SearchComponents />
    </div>
  );
}
