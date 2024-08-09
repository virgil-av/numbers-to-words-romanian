const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;
const ONE_TRILLION = 1000000000000;

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

export function generateWords(nr: number, words: string[] = [], initialDecimalsWords: string = ''): string {
  const currInitialDecimalWords = !initialDecimalsWords.length
    ? parseDecimals(nr)
    : initialDecimalsWords;

  let remainder = 0;
  let word = '';

  // If NaN stop and return 'NaN'
  if (isNaN(nr)) {
    return 'NaN';
  }

  // if user goes past trillion just return a warning message
  if (nr > ONE_TRILLION - 0.01) {
    return 'over library limit';
  }

  // If the number is zero and there are decimals to include
  if (nr === 0 && currInitialDecimalWords) {
    words.push(currInitialDecimalWords);
  }

  // If the number is zero
  if (nr === 0) {
    return !words.length
      ? 'zero'
      : words
        .join(' ')
        .replace(/,$/, '')
        .replace(/\s{2,}/, ' ');
  }

  // If negative, prepend “minus”
  if (nr < 0) {
    words.push('minus');
    nr = Math.abs(nr);
  }

  // Process integer part
  switch (true) {
    case nr < 20:
      word = LESS_THAN_TWENTY[Math.trunc(nr)];
      break;
    case nr < ONE_HUNDRED:
      remainder = Math.trunc(nr % TEN);
      word = TENTHS_LESS_THAN_HUNDRED[Math.floor(nr / TEN)];
      if (remainder) {
        word += ' și ';
      }
      break;
    case nr < ONE_THOUSAND:
      remainder = nr % ONE_HUNDRED;
      const hundreds = Math.floor(nr / ONE_HUNDRED);
      word = hundreds === 1 ? 'o sută' : generateWords(hundreds) + ' sute';
      break;
    case nr < ONE_MILLION:
      remainder = nr % ONE_THOUSAND;
      const thousands = Math.floor(nr / ONE_THOUSAND);
      word = match(thousands, 'o mie', 'mii');
      break;
    case nr < ONE_BILLION:
      remainder = nr % ONE_MILLION;
      const millions = Math.floor(nr / ONE_MILLION);
      word = match(millions, 'un milion', 'milioane');
      break;
    case nr < ONE_TRILLION:
      remainder = nr % ONE_BILLION;
      const billions = Math.floor(nr / ONE_BILLION);
      word = match(billions, 'un miliard', 'miliarde');
      break;
  }
  words.push(word);

  // If there are decimals, process them
  if (currInitialDecimalWords) {
    words.push(currInitialDecimalWords);
  }

  return words.join(' ').replace(/\s{2,}/, ' ').trim();
}

function parseDecimals(nr: number): string {
  const [integerPart, decimalsPart] = nr.toFixed(2).split('.').map(Number);
  let word = '';

  if (decimalsPart > 0) {
    word += ' virgulă';
    
    if (decimalsPart < 10) {
      word += ' zero ';
    }

    word += generateWords(decimalsPart);
  }
  
  return word.trim();
}

function match(nr: number, numberUnitsSingular: string, numberUnitsPlural: string): string {
  let str = '';

  switch (true) {
    case nr === 1:
      str = numberUnitsSingular;
      break;
    case nr === 2:
      str = 'două ' + numberUnitsPlural;
      break;
    case nr < 20 || (nr > 100 && nr % 100 < 20):
      str = generateWords(nr) + ' ' + numberUnitsPlural;
      break;
    default:
      let words = generateWords(nr);
      if (nr % 10 === 2) {
        words = words.replace(/doi$/, 'două');
      }
      str = words + ' de ' + numberUnitsPlural;
  }

  return str;
}
