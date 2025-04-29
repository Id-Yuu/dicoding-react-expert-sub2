import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';

global.vi = vi;
afterEach(() => {
  cleanup();
});