import { Title, Text } from '@mantine/core';
import { Books } from '@/components/library/Books';

export function Library() {
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
        My{' '}
        <Text
          inherit
          component={'span'}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'grape', deg: 28 }}
        >
          Library
        </Text>
      </Title>
      <Books />
    </div>
  );
}
