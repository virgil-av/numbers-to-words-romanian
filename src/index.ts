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

function generateWords(nr: number, words: string[] = []): string {
  let remainder = 0;
  let word = '';

  // If NaN stop and return 'NaN'
  if (isNaN(nr)) {
    return 'NaN';
  }

  // if user go past trillion just return a warning message
  if (nr > ONE_TRILLION - 1) {
    return 'over library limit';
  }

  // We are done, if words[] is empty than we have zero else join words,
  // replace() is used to prevent errors when user writes a number 100,000 instead of 100000
  if (nr === 0) {
    return !words.length ? 'zero' : words.join(' ').replace(/,$/, '');
  }

  // If negative, prepend “minus”
  if (nr < 0) {
    words.push('minus');
    nr = Math.abs(nr);
  }

  switch (true) {
    case (nr < 20):
      remainder = 0;
      word = LESS_THAN_TWENTY[Math.trunc(nr)];
      word += parseDecimals(nr);
      break;
    case (nr < ONE_HUNDRED):
      remainder = Math.trunc(nr % TEN);
      console.log(remainder);
      word = TENTHS_LESS_THAN_HUNDRED[Math.floor(nr / TEN)];
      // In case of remainder, we need to handle it here to be able to add the “ și ”
      if (remainder) {
        word += ' și ';
      }
      break;
    case (nr < ONE_THOUSAND):
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
    case (nr < ONE_MILLION):
      remainder = nr % ONE_THOUSAND;
      const thousands = Math.floor(nr / ONE_THOUSAND);
      word = match(thousands, 'o mie', 'mii');
      break;
    case (nr < ONE_BILLION):
      remainder = nr % ONE_MILLION;
      const millions = Math.floor(nr / ONE_MILLION);
      word = match(millions, 'un milion', 'milioane');
      break;
    case (nr < ONE_TRILLION):
      remainder = nr % ONE_BILLION;
      const billions = Math.floor(nr / ONE_BILLION);
      word = match(billions, 'un miliard', 'miliarde');
      break;
  }
  words.push(word);
  return generateWords(remainder, words);
}

function parseDecimals(nr: number): string {
  const decimals = parseInt(nr.toFixed(2).split('.')[1], 10);
  let word = '';
  if (decimals > 0) {
    word += ' virgulă ';

    if (decimals < 10) {
      word += 'zero ';
    }
    word += generateWords(decimals);
  }
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
