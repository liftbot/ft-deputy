'use strict';

const prettify = require('../../src/lib/prettify');

describe('prettify', () => {
  it('json prettify', done => {
    let content = `{"a":"1","b":"2","c":{"c1":"11"}}`;
    let formattedContent =
    `
    {
        "a": "1",
        "b": "2",
        "c": {
            "c1": "11"
        }
    }`.split("\n").slice(1).map(line => line.slice(4)).join("\n");

    expect(prettify(content, 'json')).to.equal(formattedContent);
    done();
  });
});
