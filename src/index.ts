import fs from 'node:fs';
import path from 'node:path';
import rules from '../rules.json' with { type: 'json' };
import config from './config.ts';

const inputPath = path[config.inputFormat];
const outputPath = path[config.outputFormat];

function transformPath(src: string) {
  return outputPath.resolve(config.outputDir, inputPath.basename(src));
}

const filteredRules = Object.fromEntries(
  Object.entries(rules).reduce<
    Array<[string, (typeof rules)[keyof typeof rules]]>
  >((acc, [key, rule]) => {
    if (new Date(rule.lastMatch) >= new Date(config.lastMatch)) {
      rule.savePath = transformPath(rule.savePath);
      rule.torrentParams.save_path = transformPath(
        rule.torrentParams.save_path,
      );

      acc.push([key, rule]);
    }

    return acc;
  }, []),
);

fs.writeFileSync(
  'output.json',
  JSON.stringify(filteredRules, null, 2),
  'utf-8',
);
