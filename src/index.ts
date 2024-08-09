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
    ? parseDecimals(nr, { before: false, after: true })
    : initialDecimalsWords;

  let remainder = 0;
  let word = '';

  // If NaN stop and return 'NaN'
  if (isNaN(nr)) {
    return 'NaN';
  }

  // if user go past trillion just return a warning message
  // .01 because 999.999.999.999,99 is still valid and the library should not throw an error
  if (nr > ONE_TRILLION - 0.01) {
    return 'over library limit';
  }

  // If the we are finished, then add the first decimal words got from the original number to the end of the words array
  if (nr === 0 && initialDecimalsWords.length) {
    words.push(initialDecimalsWords);
  }

  // We are done, if words[] is empty than we have zero else join words,
  // first replace() is used to prevent errors when user writes a number 100,000 instead of 100000,
  // second replace() is used to remove extra spaces
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

  switch (true) {
    case nr < 20:
      remainder = 0;
      word = LESS_THAN_TWENTY[Math.trunc(nr)];
      break;
    case nr < ONE_HUNDRED:
      remainder = Math.trunc(nr % TEN);
      word = TENTHS_LESS_THAN_HUNDRED[Math.floor(nr / TEN)];
      // In case of remainder, we need to handle it here to be able to add the “ și ”
      if (remainder) {
        word += ' și ';
      }
      break;
    case nr < ONE_THOUSAND:
      remainder = nr % ONE_HUNDRED;
      const hundreds = Math.floor(nr / ONE_HUNDRED);
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

  return generateWords(remainder, words, currInitialDecimalWords);
}

function parseDecimals(
  nr: number,
  separatorPadding: { before: boolean; after: boolean } = { before: true, after: true },
): string {
  const decimals = parseInt(nr.toFixed(2).split('.')[1], 10);
  let word = '';
  if (decimals > 0) {
    if (separatorPadding.before) {
      word += ' ';
    }
    word += 'virgulă';
    if (separatorPadding.after) {
      word += ' ';
    }

    word += generateWords(decimals);
  }
  return word;
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
