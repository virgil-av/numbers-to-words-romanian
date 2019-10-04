import {generateWords} from "../lib";


test('should return o sută for number 100', () => {
    expect(generateWords(100)).toBe('o sută');
});

test('should return două sute for number 200', () => {
    expect(generateWords(200)).toBe('două sute');
});

test('should return trei sute for number 300', () => {
    expect(generateWords(300)).toBe('trei sute');
});