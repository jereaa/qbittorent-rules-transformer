import { describe, test } from 'node:test';
import assert from 'node:assert';

import config from '../src/config.ts';

describe('Config file', () => {
  test('Config file has expected structure', () => {
    assert.deepStrictEqual(
      config,
      {
        inputFormat: 'win32',
        lastMatch: '2025-04-01',
        outputDir: '/Users/jereaa/anime',
        outputFormat: 'posix',
      },
      'Config object is not equal',
    );
  });
});
