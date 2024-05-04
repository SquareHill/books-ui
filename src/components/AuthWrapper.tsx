import { Title, Text } from '@mantine/core';

const AuthWrapper = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 600,
        display: 'grid',
        alignItems: 'center',
        gap: '10px',
        padding: '50px 30px',
        height: '100vh',
      }}
    >
      <div>
        <Title>
          Hello,{' '}
          <Text
            inherit
            component={'span'}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'grape', deg: 28 }}
          >
            Book Liker
          </Text>
        </Title>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
