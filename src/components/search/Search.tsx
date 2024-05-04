import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import {
  TextInput,
  Loader,
  Text,
  Title,
  Image,
  Badge,
  Skeleton,
  Avatar,
  Group,
  Button,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { AddBook } from './AddBook';
import { genCoverImgUrl } from '@/utils';

type Book = {
  id: number;
  title: string;
  cover_edition_key: string;
  cover_i: number;
  author_name: string[];
  key: string;
  number_of_pages_median: number;
  subject: string[];
  author_key: string[];
};

type SearchResults = {
  count: number;
  items: Book[];
};

function getSearchResults(query: string): Promise<SearchResults> {
  return fetch(
    `https://openlibrary.org/search.json?q=${query}&fields=cover_edition_key,cover_i,author_name,key,number_of_pages_median,title,subject,author_key&limit=10`
  )
    .then((response) => response.json())
    .then((data) => ({
      count: data.numFound,
      items: data.docs.map((book: any) => ({
        id: book.key,
        title: book.title,
        cover_i: book.cover_i,
        author_name: book.author_name,
        key: book.key,
        number_of_pages_median: book.number_of_pages_median,
        subject: book.subject,
        author_key: book.author_key,
      })),
    }));
}

// test
const Result = ({ book }: { book: Book }) => {
  const [showImg, setShowImg] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(auto, 100px) minmax(0, 1fr)',
          gap: '20px',
        }}
      >
        <div>
          <Skeleton visible={!showImg}>
            <Image
              radius="xs"
              src={
                book.cover_i
                  ? genCoverImgUrl(book.cover_i)
                  : `https://placehold.co/125x200?text=${book.title}`
              }
              h={'175px'}
              style={{ maxWidth: '100px', boxShadow: '2px 2px 1px rgba(255,255,255,.2)' }}
              alt={book.title}
              onLoad={() => setShowImg(true)}
              fallbackSrc="https://placehold.co/200x125?text=Placeholder"
            />
          </Skeleton>
        </div>
        <div>
          <Title order={3}>{book.title}</Title>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginTop: '10px',
              flexWrap: 'flex',
            }}
          >
            {!!book.author_name &&
              book.author_name.slice(0, 3).map((author, idx) => (
                <Group gap="sm">
                  <Avatar
                    key={author}
                    size="sm"
                    src={
                      idx === 0
                        ? `https://covers.openlibrary.org/a/olid/${book.author_key?.[0]}-S.jpg`
                        : undefined
                    }
                  />
                  <Text size="xs">{author}</Text>
                </Group>
              ))}
          </div>
          <div style={{ marginTop: '10px' }}>
            <Text size="xs">{book.number_of_pages_median} pages</Text>
            {/* <div style={{ marginTop: '8px' }}>
              {!!book.subject && (
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {book.subject.slice(0, 3).map((subject) => (
                    <Badge key={subject} color="gray">
                      {subject}
                    </Badge>
                  ))}
                </div>
              )}
            </div> */}

            <AddBook
              id={book.id}
              name={book.title}
              pages={book.number_of_pages_median}
              coverId={book.cover_i}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Results = ({ results }: SearchResults) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
    {results.items.map((result) => (
      <Result key={result.key} book={result} />
    ))}
  </div>
);

const Search = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{ id: number; title: string }[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults>({ items: [] });
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    if (query === '') {
      setLoading(false);
      // setSearchResults({ items: [] });
      return;
    }
    setSearchResults(await getSearchResults(query));
    setLoading(false);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  return (
    <>
      <TextInput
        value={search}
        onChange={handleChange}
        variant="filled"
        size="xl"
        placeholder="Search books..."
        rightSection={loading && <Loader size={20} />}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!!searchResults?.count && (
          <Text size={'sm'} color={'rgba(255,255,255,.6)'}>
            Found {searchResults.count} results
          </Text>
        )}
      </div>
      {!!searchResults?.count && <Results results={searchResults} />}
    </>
  );
};

export default Search;
