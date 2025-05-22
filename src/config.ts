type PathType = 'posix' | 'win32';

interface Config {
  lastMatch: string | Date;
  inputFormat: PathType;
  outputFormat: PathType;
  outputDir: string;
}

export default {
  lastMatch: '2025-04-01',
  inputFormat: 'win32',
  outputFormat: 'posix',
  // outputDir: 'D:\\Series\\Anime',
  outputDir: '/Users/jereaa/anime',
} satisfies Config;
