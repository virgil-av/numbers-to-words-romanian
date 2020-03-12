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

export function generateWords(nr: number, words?: string[]): string {
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

  // We are done, if words[] is empty than we have zero else join words
  if (nr === 0) {
    return !words ? 'zero' : words.join(' ').replace(/,$/, '');
  }
  // First run
  if (!words) {
    words = [];
  }
  // If negative, prepend “minus”
  if (nr < 0) {
    words.push('minus');
    nr = Math.abs(nr);
  }

  switch (true) {
    case (nr < 20):
      remainder = 0;
      word = LESS_THAN_TWENTY[nr];
      break;
    case (nr < ONE_HUNDRED):
      remainder = nr % TEN;
      word = TENTHS_LESS_THAN_HUNDRED[Math.floor(nr / TEN)];
      // In case of remainder, we need to handle it here to be able to add the “ și ”
      if (remainder) {
        word += ' și ' + LESS_THAN_TWENTY[remainder];
        remainder = 0;
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

      switch (true) {
        case (thousands === 1):
          word = 'o mie';
          break;
        case (thousands === 2):
          word = 'două mii';
          break;
        case (thousands < 20 || (thousands > 100 && thousands % 100 < 20)):
          word = generateWords(thousands) + ' mii';
          break;
        default:
          word = generateWords(thousands) + ' de mii';
      }
      break;
    case (nr < ONE_BILLION):
      remainder = nr % ONE_MILLION;
      const millions = Math.floor(nr / ONE_MILLION);

      switch (true) {
        case (millions === 1):
          word = 'un milion';
          break;
        case (millions === 2):
          word = 'două milioane';
          break;
        case (millions < 20 || (millions > 100 && millions % 100 < 20)):
          word = generateWords(millions) + ' milioane';
          break;
        default:
          word = generateWords(millions) + ' de milioane';
      }
      break;
    case (nr < ONE_TRILLION):
      remainder = nr % ONE_BILLION;
      const billions = Math.floor(nr / ONE_BILLION);

      switch (true) {
        case (billions === 1):
          word = 'un miliard';
          break;
        case (billions === 2):
          word = 'două miliarde';
          break;
        case (billions < 20 || (billions > 100 && billions % 100 < 20)):
          word = generateWords(billions) + ' miliarde';
          break;
        default:
          word = generateWords(billions) + ' de miliarde';
      }
      break;
    default:
      console.log('nothing');
  }

  words.push(word);
  return generateWords(remainder, words);
}
