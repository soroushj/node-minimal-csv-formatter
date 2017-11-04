const csv = require('.');

const tests = [
  {
    input: undefined,
    expected: ''
  },
  {
    input: null,
    expected: ''
  },
  {
    input: [],
    expected: ''
  },
  {
    input: [
      undefined,
      null,
      [],
    ],
    expected: ''
  },
  {
    input: ['ab', 'a,b', 'a"b', 'a\rb', 'a\nb', 'a\r\nb', 0, false, '', undefined, null],
    expected: 'ab,"a,b","a""b","a\rb","a\nb","a\r\nb",0,false,,,\n'
  },
  {
    input: [
      ['a','b'],
      [1, 2],
      [undefined, null],
      undefined,
      null,
      [],
    ],
    expected: 'a,b\n1,2\n,\n'
  },
];

let exitCode = 0;
tests.forEach((test, i) => {
  let output = csv(test.input);
  if (output !== test.expected) {
    exitCode = 1;
    console.log(`Test #${i} failed`);
    console.log('For:', JSON.stringify(test.input));
    console.log('Expected:', JSON.stringify(test.expected));
    console.log('Got:', JSON.stringify(output));
    console.log();
  }
});

process.exit(exitCode);
