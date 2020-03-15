const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000; //         1.000.000.000 (9)
const ONE_TRILLION = 1000000000000; //     1.000.000.000.000 (12)

const LESS_THAN_TWENTY = [
  'zero',
  'unu',
  'doi',
  'trei',
  'patru',
  'cinci',
  'șase',
  'șapte',
  'opt',
  'nouă',
  'zece',
  'unsprezece',
  'doisprezece',
  'treisprezece',
  'paisprezece',
  'cincisprezece',
  'șaisprezece',
  'șaptesprezece',
  'optsprezece',
  'nouăsprezece',
];

const TENTHS_LESS_THAN_HUNDRED = [
  'zero',
  'zece',
  'douăzeci',
  'treizeci',
  'patruzeci',
  'cincizeci',
  'șaizeci',
  'șaptezeci',
  'optzeci',
  'nouăzeci',
];

export function generateWords(nr: number, words: string[] = []): string {
  let remainder = 0;
  let quotient: number;
  let integer: number;
  let decimals: number;

  // If NaN stop and return 'NaN'
  if (isNaN(nr)) {
    return 'NaN';
  }

  // if user go past trillion just return a warning message
  if (nr > ONE_TRILLION - 1) {
    return 'over library limit';
  }

  // We are done, if words[] is empty than we have zero else join words
  if (nr === 0) {
    return !words.length ? 'zero' : words.join(' ');
  }

  // If negative, prepend “minus”
  if (nr < 0) {
    words.push('minus');
    nr = Math.abs(nr);
  }

  switch (true) {
    case (nr < 20):
      [,, integer, decimals] = parseNumber(nr);
      words.push(LESS_THAN_TWENTY[integer]);
      if (decimals > 0) {
        words.push(parseDecimals(decimals));
      }
      break;
    case (nr < ONE_HUNDRED):
      [quotient, remainder] = parseNumber(nr, TEN);
      words.push(TENTHS_LESS_THAN_HUNDRED[quotient]);
      // In case of remainder, we need to handle it here to be able to add the “ și ”
      if (remainder) {
        words.push('și');
      }
      break;
    case (nr < ONE_THOUSAND):
      [quotient, remainder] = parseNumber(nr, ONE_HUNDRED);
      words.push(parseHundreds(quotient));
      break;
    case (nr < ONE_MILLION):
      [quotient, remainder] = parseNumber(nr, ONE_THOUSAND);
      words.push(match(quotient, 'o mie', 'mii'));
      break;
    case (nr < ONE_BILLION):
      [quotient, remainder] = parseNumber(nr, ONE_MILLION);
      words.push(match(quotient, 'un milion', 'milioane'));
      break;
    case (nr < ONE_TRILLION):
      [quotient, remainder] = parseNumber(nr, ONE_BILLION);
      words.push(match(quotient, 'un miliard', 'miliarde'));
      break;
  }

  return generateWords(remainder, words);
}

function parseNumber(nr: number, divider = 1): number[] {
  return [Math.trunc(nr / divider), nr % divider, Math.trunc(nr), extractDecimals(nr)];
}

function parseHundreds(hundreds: number): string {
  let word = '';

  switch (hundreds) {
    case 1:
      word = 'o sută';
      break;
    case 2:
      word = 'două sute';
      break;
    default:
      word = generateWords(hundreds) + ' sute';
  }

  return word;
}

function extractDecimals(nr: number): number {
  return +nr.toFixed(2) * 100 - Math.trunc(nr) * 100;
}

function parseDecimals(decimals: number): string {
  let word = '';

  word += ' virgulă ';

  if (decimals < 10) {
    word += 'zero ';
  }

  word += generateWords(decimals);

  return word;
}

function match(nr: number, numberUnitsSingular: string, numberUnitsPlural: string): string {
  let str = '';

  switch (true) {
    case (nr === 1):
      str = numberUnitsSingular;
      break;
    case (nr === 2):
      str = 'două ' + numberUnitsPlural;
      break;
    case (nr < 20 || (nr > 100 && nr % 100 < 20)):
      str = generateWords(nr) + ' ' + numberUnitsPlural;
      break;
    default:
      str = generateWords(nr) + ' de ' + numberUnitsPlural;
  }

  return str;
}
