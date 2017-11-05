const { expect } = require('chai');
const csv = require('.');

describe('minimal-csv-formatter', function () {
  it('should convert `undefined` to an empty string', function () {
    let result = csv(undefined);
    expect(result).to.equal('');
  });
  it('should convert `null` to an empty string', function () {
    let result = csv(null);
    expect(result).to.equal('');
  });
  it('should convert an empty array to an empty string', function () {
    let result = csv([]);
    expect(result).to.equal('');
  });
  it('should only and only quote fields containing commas, double quotes, and/or newlines', function () {
    let result = csv(['a;b', 'a\'b', 'a,b', 'a"b', 'a\rb', 'a\nb']);
    expect(result).to.equal('a;b,a\'b,"a,b","a""b","a\rb","a\nb"\n');
  });
  it('should work well with non-string values', function () {
    let result = csv([0, false]);
    expect(result).to.equal('0,false\n');
  });
  it('should treat undefined/null values as empty fields', function () {
    let result = csv([undefined, null]);
    expect(result).to.equal(',\n');
  });
  it('should treat an array of arrays as multiple rows', function () {
    let result = csv([
      ['a', 'b'],
      [1, 2],
    ]);
    expect(result).to.equal('a,b\n1,2\n');
  });
  it('should ignore empty arrays and undefined/null rows', function () {
    let result = csv([
      ['a', 'b'],
      undefined,
      null,
      [],
    ]);
    expect(result).to.equal('a,b\n');
  });
  it('should return an empty string for an array of empty rows', function () {
    let result = csv([
      undefined,
      null,
      [],
    ]);
    expect(result).to.equal('');
  });
});
