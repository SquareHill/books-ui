import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { supabase } from '@/client';

export const AddBook = ({ id, name, pages, coverId }) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const { error } = await supabase.from('user_books').insert([
      {
        book_id: id,
        book_name: name,
        read_count: 0,
        book_pages: pages,
        cover_id: coverId + '',
      },
    ]);
    setLoading(false);

    if (error) {
      console.error('error', error);
      notifications.show({
        color: 'red',
        title: 'Failed adding to library',
        message: error?.message,
      });
      return;
    }
    notifications.show({
      title: `'${name}' added to library`,
    });
  };

  return (
    <Button
      loading={loading}
      fullWidth
      variant="outline"
      style={{ marginTop: '10px' }}
      onClick={onClick}
    >
      <IconPlus />
      ADD TO LIBRARY
    </Button>
  );
};
