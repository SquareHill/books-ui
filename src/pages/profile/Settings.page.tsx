import { TextInput } from '@mantine/core';

export const ProfileSettings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <TextInput variant="filled" label="Display Name" placeholder="Enter a new display name" />
    </div>
  );
};
