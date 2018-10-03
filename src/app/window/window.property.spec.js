import 'jsdomSetup/jsdomSetup';
import 'window/window.property';

describe('window.property.js', function () {
    describe('window.location.getParameter', function () {
        it(`should return {a: '1', b: '2', c: 'test-decode-url&=', d: 'test-multi-=-in-parameter'}`, function () {
            let parameter = window.location.getParameter('http://test.com?a=1&b=2&c=test-decode-url%26%3D&d=test-multi-=-in-parameter');

            expect(parameter.a).toBe('1');
            expect(parameter.b).toBe('2');
            expect(parameter.c).toBe('test-decode-url&=');
            expect(parameter.d).toBe('test-multi-=-in-parameter');
        });
    });

    describe('window.location.setParameter', function () {
        describe(`window.location.setParameter({a: '1', b: '2', c: 'test-encode-url&='}, 'http://test.com')`, function () {
            it(`should return 'http://test.com?a=1&b=2&c=test-eecode-url%26%3D'`, function () {
                let url = window.location.setParameter({a: '1', b: '2', c: 'test-eecode-url&='}, 'http://test.com');

                expect(url).toBe('http://test.com?a=1&b=2&c=test-eecode-url%26%3D');
            });
        });
        
        describe(`window.location.setParameter({a: '1', b: '2'}, 'http://test.com?c=abc')`, function () {
            it(`should return 'http://test.com?c=abc&a=1&b=2'`, function () {
                let url = window.location.setParameter({a: '1', b: '2'}, 'http://test.com?c=abc');

                expect(url).toBe('http://test.com?c=abc&a=1&b=2');
            });
        });
        
        describe(`window.location.setParameter({a: '1', b: '2'}, 'http://test.com?a=abc')`, function () {
            it(`should return 'http://test.com?a=1&b=2'`, function () {
                let url = window.location.setParameter({a: '1', b: '2'}, 'http://test.com?a=abc');

                expect(url).toBe('http://test.com?a=1&b=2');
            });
        });
    });
});
