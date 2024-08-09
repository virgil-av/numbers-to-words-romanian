const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000; //         1.000.000.000 (9)
const ONE_TRILLION = 1000000000000; //     1.000.000.000.000 (12)

const LESS_THAN_TWENTY = [
  "zero",
  "unu",
  "doi",
  "trei",
  "patru",
  "cinci",
  "șase",
  "șapte",
  "opt",
  "nouă",
  "zece",
  "unsprezece",
  "doisprezece",
  "treisprezece",
  "paisprezece",
  "cincisprezece",
  "șaisprezece",
  "șaptesprezece",
  "optsprezece",
  "nouăsprezece",
];

const TENTHS_LESS_THAN_HUNDRED = [
  "zero",
  "zece",
  "douăzeci",
  "treizeci",
  "patruzeci",
  "cincizeci",
  "șaizeci",
  "șaptezeci",
  "optzeci",
  "nouăzeci",
];

export function generateWords(nr: number, words: string[] = [], initialDecimalsWords: string = ''): string {
  // Handle NaN and limits
  if (isNaN(nr)) return 'NaN';
  if (nr > ONE_TRILLION - 0.01) return 'over library limit';

  const currInitialDecimalWords = !initialDecimalsWords.length
    ? parseDecimals(nr, { before: false, after: true })
    : initialDecimalsWords;

  let remainder = 0;
  let word = '';

  if (nr === 0) {
    if (initialDecimalsWords.length) {
      words.push(initialDecimalsWords);
    }
    return !words.length ? 'zero' : words.join(' ').replace(/,$/, '').replace(/\s{2,}/, ' ');
  }

  if (nr < 0) {
    words.push('minus');
    nr = Math.abs(nr);
  }

  switch (true) {
    case nr < 20:
      word = LESS_THAN_TWENTY[Math.trunc(nr)];
      break;
    case nr < ONE_HUNDRED:
      const tens = Math.floor(nr / TEN);
      const units = nr % TEN;
      word = TENTHS_LESS_THAN_HUNDRED[tens];
      if (units) word += ' și ' + LESS_THAN_TWENTY[units];
      break;
    case nr < ONE_THOUSAND:
      const hundreds = Math.floor(nr / ONE_HUNDRED);
      remainder = nr % ONE_HUNDRED;
      word = hundreds === 1 ? 'o sută' : generateWords(hundreds) + ' sute';
      if (remainder) word += ' ' + generateWords(remainder);
      break;
    case nr < ONE_MILLION:
      const thousands = Math.floor(nr / ONE_THOUSAND);
      remainder = nr % ONE_THOUSAND;
      word = match(thousands, 'o mie', 'mii');
      if (remainder) word += ' ' + generateWords(remainder);
      break;
    case nr < ONE_BILLION:
      const millions = Math.floor(nr / ONE_MILLION);
      remainder = nr % ONE_MILLION;
      word = match(millions, 'un milion', 'milioane');
      if (remainder) word += ' ' + generateWords(remainder);
      break;
    case nr < ONE_TRILLION:
      const billions = Math.floor(nr / ONE_BILLION);
      remainder = nr % ONE_BILLION;
      word = match(billions, 'un miliard', 'miliarde');
      if (remainder) word += ' ' + generateWords(remainder);
      break;
  }
  words.push(word);

  // Append decimal part if there are any
  if (nr % 1 !== 0) {
    const decimalsPart = parseDecimals(nr);
    words.push(decimalsPart);
  }

  return words.join(' ').trim();
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

    // Add zero padding only if decimals are less than 10
    if (decimals < 10) {
      word += 'zero ';
    }
    word += generateWords(decimals);
  }
  return word;
}

function match(
  nr: number,
  numberUnitsSingular: string,
  numberUnitsPlural: string
): string {
  let str = "";

  switch (true) {
    case nr === 1:
      str = numberUnitsSingular;
      break;
    case nr === 2:
      str = "două " + numberUnitsPlural;
      break;
    case nr < 20 || (nr > 100 && nr % 100 < 20):
      str = generateWords(nr) + " " + numberUnitsPlural;
      break;
    default:
      let words = generateWords(nr);
      if (nr % 10 === 2) {
        words = words.replace(/doi$/, "două");
      }
      str = words + " de " + numberUnitsPlural;
  }

  return str;
}
