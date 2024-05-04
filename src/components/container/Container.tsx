import cx from 'clsx';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
  Container as MContainer,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconActivity,
  IconBooks,
  IconAward,
  IconSearch,
} from '@tabler/icons-react';
import { supabase } from '@/client';
import classes from './Container.module.css';
import './Container.css';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
};

export function Container() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div>
      <div
        style={{
          maxWidth: 600,
          margin: 'auto',
        }}
      >
        <div className={classes.header}>
          <MContainer className={classes.mainSection} size="md">
            <Group justify="space-between">
              <Burger opened={opened} onClick={toggle} size="sm" />

              <Menu
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                  >
                    <Group gap={7}>
                      <Avatar src={user.image} alt={user.name} radius="xl" size={32} />
                      {/* <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text> */}
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconHeart
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Your Books
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconStar
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.yellow[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Challenges
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconMessage
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Your comments
                  </Menu.Item>

                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    onClick={() => navigate('profile/settings')}
                  >
                    Account settings
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    onClick={() => supabase.auth.signOut()}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MContainer>
        </div>

        <MContainer size="md" style={{ paddingBottom: '115px' }}>
          <Outlet />
        </MContainer>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          borderTop: '1px solid var(--mantine-color-gray-8)',
          width: '100%',
          backgroundColor: 'var(--mantine-color-body)',
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: 'auto',
            padding: '15px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          <div
            className={`${location.pathname.includes('activity') ? 'active' : ''} footer-nav-item`}
            onClick={() => navigate('activity')}
          >
            <IconActivity size={32} stroke={2} />
            <Text size="xs">ACTIVITY</Text>
          </div>
          <div
            className={`${location.pathname.includes('library') ? 'active' : ''} footer-nav-item`}
            onClick={() => navigate('library')}
          >
            <IconBooks size={32} stroke={2} />
            <Text size="xs">LIBRARY</Text>
          </div>
          <div
            className={`${location.pathname.includes('challenges') ? 'active' : ''} footer-nav-item`}
            onClick={() => navigate('challenges')}
          >
            <IconAward size={32} stroke={2} />
            <Text size="xs">CHALLENGE</Text>
          </div>
          <div
            className={`${location.pathname.includes('search') ? 'active' : ''} footer-nav-item`}
            onClick={() => navigate('search')}
          >
            <IconSearch size={32} stroke={2} />
            <Text size="xs">SEARCH</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
