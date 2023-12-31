
# NUMBER TO WORDS IN ROMANIAN
Just converts numbers from digits to words in romanian language, maximum 999.999.999.999

# NUMERE IN CUVINTE
O librarie usoara care converteste numere in cuvinte, maxim 999.999.999.999

## Usage / Utilizare

```ts
// typescript
import {generateWords} from 'numbers-to-words-romanian';

generateWords(100)
// => o sută
```

```js
// javascript
const {generateWords} = require('numbers-to-words-romanian');

generateWords(125)
// => o sută douăzeci și cinci

generateWords(118931)
// => o sută optsprezece mii nouă sute treizeci și unu

generateWords(1259631)
// => un milion două sute cincizeci și nouă de mii șase sute treizeci și unu

generateWords(101230465)
// => o sută unu milioane două sute treizeci de mii patru sute șaizeci și cinci

generateWords(5101230465)
// => cinci miliarde o sută unu milioane două sute treizeci de mii patru sute șaizeci și cinci

generateWords(999999999999)
// => nouă sute nouăzeci și nouă de miliarde nouă sute nouăzeci și nouă de milioane nouă sute nouăzeci și nouă de mii nouă sute nouăzeci și nouă

```

#### Changelog
- v1.3.3 Merged PR request, fixes number 2 singular and plural. 
- v1.3.2 restored undocumented string replace() method that was scrapped during PR
- v1.3.1 code cleanup, improved logic, added more tests
- v1.3.0 improved logic by using switch case, added more test cases, updated readme, added warning message if user requests a number over max limit
- v1.2.0 added new rule for thousands, millions and billions
- v1.1.0 switched project to typescript, added types, created tests
- v1.0.1 trying to fix export member but using ES6 syntax created more bugs
- v1.0.0 initial release 
