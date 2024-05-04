import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { Loader, Image, Skeleton } from '@mantine/core';
import { genCoverImgUrl } from '@/utils';
import { supabase } from '@/client';

const Book = ({ book }) => {
  const [showImg, setShowImg] = useState(false);

  return (
    <Skeleton visible={!showImg}>
      <Image
        radius="xs"
        src={
          book.cover_id
            ? genCoverImgUrl(book.cover_id)
            : `https://placehold.co/125x200?text=${book.title}`
        }
        style={{ boxShadow: '2px 2px 1px rgba(255,255,255,.2)' }}
        alt={book.title}
        h={175}
        onLoad={() => setShowImg(true)}
        fallbackSrc="https://placehold.co/200x125?text=Placeholder"
      />
    </Skeleton>
  );
};

export const Books = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data: userDat, error: userErr } = await supabase.auth.getSession();
      if (userErr) {
        console.error('error', userErr);
        notifications.show({
          color: 'red',
          title: 'Failed fetching user',
          message: userErr.message,
        });
        return;
      }

      const userId = userDat.session.user.id;

      // select user_books for userId
      const { data, error } = await supabase.from('user_books').select('*').eq('user_id', userId);

      if (error) {
        console.error('error', error);
        notifications.show({
          color: 'red',
          title: 'Failed fetching books',
          message: error.message,
        });
        return;
      }
      console.log(data);
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {loading && (
        <div
          style={{
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      )}
      {!loading && books.length === 0 && (
        <div
          style={{
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          You do not have any books in your library
        </div>
      )}
      {!loading && books.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)',
            gap: '20px',
          }}
        >
          {books.map((book) => (
            <div key={book.id}>
              <Book book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
