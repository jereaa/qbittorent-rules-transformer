import fs from 'node:fs';
import path from 'node:path';
import rules from './rules.json' with { type: 'json' };
import config from './config.json' with { type: 'json' };

const inputPath = path[config.input_format];
const outputPath = path[config.output_format];

function transformPath(src) {
  return outputPath.resolve(config.output_dir, inputPath.basename(src));
}

const filteredRules = Object.fromEntries(
  Object.entries(rules).reduce((acc, [key, rule]) => {
    if (new Date(rule.lastMatch) >= new Date(config.last_match)) {
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
