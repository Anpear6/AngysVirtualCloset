import fs from 'node:fs';

const files = process.argv.slice(2);

function formatCss(source) {
  let output = '';
  let token = '';
  let indent = 0;
  let quote = null;

  const writeToken = (isProperty = false) => {
    let value = token.trim();
    if (isProperty) value = value.replace(/^([^:]+):\s*/, '$1: ');
    if (value) output += `${'  '.repeat(indent)}${value}`;
    token = '';
  };

  for (const character of source) {
    if (quote) {
      token += character;
      if (character === quote) quote = null;
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      token += character;
    } else if (character === '{') {
      writeToken(false);
      output += ' {\n';
      indent += 1;
    } else if (character === ';') {
      writeToken(true);
      output += ';\n';
    } else if (character === '}') {
      writeToken(true);
      if (!output.endsWith('\n')) output += '\n';
      indent = Math.max(0, indent - 1);
      output += `${'  '.repeat(indent)}}\n\n`;
    } else if (character === '\n' || character === '\r' || character === '\t') {
      token += ' ';
    } else {
      token += character;
    }
  }

  writeToken();
  return output.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

for (const file of files) {
  fs.writeFileSync(file, formatCss(fs.readFileSync(file, 'utf8')), 'utf8');
}
