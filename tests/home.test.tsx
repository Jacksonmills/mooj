import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Page from '../app/page';
import React from 'react';

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ),
    ClerkProvider: ({ children }: { children: React.ReactNode; }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  };
});

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  };
});

test(`Home`, async () => {
  render(await Page());
  expect(screen.getByText('The best journal app, period.')).toBeTruthy();
});