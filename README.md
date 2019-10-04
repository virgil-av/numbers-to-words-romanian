
# NUMBER TO WORDS IN ROMANIAN ![build](https://travis-ci.org/virgil-av/numbers-to-words-romanian.svg?branch=master)
Just converts numbers from digits to words in romanian language, maximum 999.999.999.999

# NUMERE IN CUVINTE
O librarie usoara care converteste numere in cuvinte, maxim 999.999.999.999

## IMPLEMENTATION

```js
// javascript
const {generateWords} = require('numbers-to-words-romanian');

generateWords(100)
// => o sută

```

```ts
// typescript
import {generateWords} from 'numbers-to-words-romanian';

generateWords(100)
// => o sută

```

#### Changelog
- v1.1.0 switched project to typescript, added types, created tests
- v1.0.1 trying to fix export member but using ES6 syntax created more bugs
- v1.0.0 initial release 