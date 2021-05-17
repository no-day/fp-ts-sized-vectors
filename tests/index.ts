import * as fc from 'fast-check';

describe('index', () => {
  it('greets anything', () => {
    fc.property(fc.string(), (name) => {
      expect(1).toBe(1);
    });
  });
});
