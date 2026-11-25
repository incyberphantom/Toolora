import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeText,
  convertCase,
  generatePassword,
  evaluatePasswordStrength,
  calcPercentOf,
  calcWhatPercent,
  calcPercentageChange,
  calculateGst,
  calculateAge,
  buildWifiQrString,
  buildEmailQrString,
  buildPhoneQrString,
  formatBytes,
  calculateSavingsPercent,
} from './toolsLogic';

test('Word Counter: counts words, chars, sentences, paragraphs, and keywords accurately', () => {
  const empty = analyzeText('   ');
  assert.equal(empty.words, 0);
  assert.equal(empty.sentences, 0);
  assert.equal(empty.paragraphs, 0);

  const sample = 'Toolora builds fast tools. Toolora respects privacy!\n\nEvery tool works in your browser.';
  const stats = analyzeText(sample);
  assert.equal(stats.words, 13);
  assert.equal(stats.sentences, 3);
  assert.equal(stats.paragraphs, 2);
  assert.equal(stats.topKeywords[0].word, 'toolora');
  assert.equal(stats.topKeywords[0].count, 2);
});

test('Case Converter: handles all 10 transformations', () => {
  assert.equal(convertCase('hello world', 'upper'), 'HELLO WORLD');
  assert.equal(convertCase('HELLO WORLD', 'lower'), 'hello world');
  assert.equal(convertCase('hello world from toolora', 'title'), 'Hello World From Toolora');
  assert.equal(convertCase('HELLO WORLD. HOW ARE YOU?', 'sentence'), 'Hello world. How are you?');
  assert.equal(convertCase('hello world toolora', 'camel'), 'helloWorldToolora');
  assert.equal(convertCase('hello world toolora', 'pascal'), 'HelloWorldToolora');
  assert.equal(convertCase('helloWorld Toolora', 'snake'), 'hello_world_toolora');
  assert.equal(convertCase('helloWorld Toolora', 'kebab'), 'hello-world-toolora');
  assert.equal(convertCase('abcd', 'alternating'), 'aBcD');
  assert.equal(convertCase('AbCd', 'inverse'), 'aBcD');
});

test('Password Generator: enforces requested length and character sets', () => {
  const pwd = generatePassword({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: true,
  });
  assert.equal(pwd.length, 20);
  assert.match(pwd, /[A-Z]/);
  assert.match(pwd, /[a-z]/);
  assert.match(pwd, /[0-9]/);
  assert.match(pwd, /[^a-zA-Z0-9]/);
  assert.doesNotMatch(pwd, /[0Oo1lI]/);

  const strength = evaluatePasswordStrength(pwd);
  assert.equal(strength.level, 'very-strong');
  assert.ok(strength.entropyBits >= 95);
});

test('Percentage Calculator: computes all 3 modes and handles zero division', () => {
  assert.equal(calcPercentOf(15, 200).value, 30);
  assert.equal(calcWhatPercent(45, 90).value, 50);
  assert.equal(calcWhatPercent(10, 0).error, 'division-by-zero');
  const inc = calcPercentageChange(80, 100);
  assert.equal(inc.value, 25);
  assert.equal(inc.direction, 'increase');
  const dec = calcPercentageChange(100, 75);
  assert.equal(dec.value, -25);
  assert.equal(dec.direction, 'decrease');
});

test('GST Calculator: handles exclusive and inclusive Indian GST calculations', () => {
  const excl = calculateGst(10000, 18, 'exclusive');
  assert.equal(excl.baseAmount, 10000);
  assert.equal(excl.gstAmount, 1800);
  assert.equal(excl.cgstAmount, 900);
  assert.equal(excl.sgstAmount, 900);
  assert.equal(excl.totalAmount, 11800);

  const incl = calculateGst(11800, 18, 'inclusive');
  assert.equal(incl.baseAmount, 10000);
  assert.equal(incl.gstAmount, 1800);
  assert.equal(incl.totalAmount, 11800);
});

test('Age Calculator: handles exact calendar math, leap years, and future date guard', () => {
  const res = calculateAge('2000-02-29', '2026-11-24');
  assert.equal(res.valid, true);
  assert.equal(res.years, 26);
  assert.equal(res.months, 8);
  assert.equal(res.days, 26);

  const bday = calculateAge('1995-11-24', '2026-11-24');
  assert.equal(bday.valid, true);
  assert.equal(bday.years, 31);
  assert.equal(bday.isBirthdayToday, true);
  assert.equal(bday.nextBirthdayDaysTotal, 0);

  const future = calculateAge('2030-01-01', '2026-11-24');
  assert.equal(future.valid, false);
  assert.equal(future.error, 'dob-in-future');
});

test('QR payload builders & byte formatting utilities', () => {
  assert.equal(
    buildWifiQrString({ ssid: 'Home;WiFi', password: 'pass:123', encryption: 'WPA', hidden: false }),
    'WIFI:T:WPA;S:Home\\;WiFi;P:pass\\:123;H:false;;'
  );
  assert.equal(
    buildEmailQrString({ to: 'hello@toolora.app', subject: 'Hi', body: 'Test' }),
    'mailto:hello@toolora.app?subject=Hi&body=Test'
  );
  assert.equal(buildPhoneQrString('+91 98765-43210'), 'tel:+919876543210');
  assert.equal(formatBytes(1536), '1.50 KB');
  assert.equal(calculateSavingsPercent(1000, 400), 60);
});
