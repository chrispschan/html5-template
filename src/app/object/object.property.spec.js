import 'object/object.property';

describe('object.property.js', function () {
    describe('Object.deepAssign', function () {
        describe('Object.deepAssign({a: 1}, {b: 2})', function () {
            it(`should return {a: 1, b: 2} and deep clone`, function () {
                let obj1 = {a: 1},
                    obj2 = {b: 2},
                    obj3 = Object.deepAssign(obj1, obj2);

                expect(obj3.a).toBe(1);
                expect(obj3.b).toBe(2);
                expect(obj1.b).toBe(undefined);
                expect(obj2.a).toBe(undefined);

                // check deep clone
                obj3.a = 3;
                obj3.b = 4;

                expect(obj3.a).toBe(3);
                expect(obj3.b).toBe(4);
                expect(obj1.a).toBe(1);
                expect(obj2.b).toBe(2);
            });
        });

        describe('Object.deepAssign({a: 1, b: 2}, {b: 4, c: 5}, {b: 10})', function () {
            it(`should return {a: 1, b: 10, c: 5} and deep clone`, function () {
                let obj1 = {a: 1, b: 2},
                    obj2 = {b: 4, c: 5},
                    obj3 = {b: 10},
                    obj4 = Object.deepAssign(obj1, obj2, obj3);

                expect(obj4.a).toBe(1);
                expect(obj4.b).toBe(10);
                expect(obj4.c).toBe(5);

                // check deep clone
                obj4.b = 6;
                
                expect(obj4.b).toBe(6);
                expect(obj1.b).toBe(2);
                expect(obj2.b).toBe(4);
                expect(obj3.b).toBe(10);
            });
        });

        describe('Object.deepAssign({a: 1, b: {a: 2, b: 3}}, {b: {b: 4, c: 5}, c: 6})', function () {
            it(`should return {a: 1, b: {a: 2, b: 4, c: 5}, c: 6} and deep clone`, function () {
                let obj1 = {a: 1, b: {a: 2, b: 3}},
                    obj2 = {b: {b: 4, c: 5}, c: 6},
                    obj3 = Object.deepAssign(obj1, obj2);

                expect(obj3.a).toBe(1);
                expect(obj3.b.a).toBe(2);
                expect(obj3.b.b).toBe(4);
                expect(obj3.b.c).toBe(5);
                expect(obj3.c).toBe(6);

                // check deep clone
                obj3.b.b = 7;

                expect(obj3.b.b).toBe(7);
                expect(obj1.b.b).toBe(3);
                expect(obj2.b.b).toBe(4);
            });
        });

        describe('Object.deepAssign({a: 1, b: [2]}, {b: [3, 4], c: 5})', function () {
            it(`should return {a: 1, b: [3, 4], c: 6} and deep clone`, function () {
                let obj1 = {a: 1, b: [2]},
                    obj2 = {b: [3, 4], c: 5},
                    obj3 = Object.deepAssign(obj1, obj2);

                expect(obj3.a).toBe(1);
                expect(obj3.b[0]).toBe(3);
                expect(obj3.b[1]).toBe(4);
                expect(obj3.c).toBe(5);

                // check deep clone
                obj3.b[0] = 6;

                expect(obj3.b[0]).toBe(6);
                expect(obj1.b[0]).toBe(2);
                expect(obj2.b[0]).toBe(3);
            });
        });

        describe('Object.deepAssign({a: 1, b: {a: 2}}, {b: [{a: 3}, {b: 4}], c: 5})', function () {
            it(`should return {a: 1, b: [{a: 3}, {b: 4}], c: 6} and deep clone`, function () {
                let obj1 = {a: 1, b: {a: 2}},
                    obj2 = {b: [{a: 3}, {b: 4}], c: 5},
                    obj3 = Object.deepAssign(obj1, obj2);

                expect(obj3.a).toBe(1);
                expect(obj3.b[0].a).toBe(3);
                expect(obj3.b[1].b).toBe(4);
                expect(obj3.c).toBe(5);

                // check deep clone
                obj3.b[0].a = 6;

                expect(obj3.b[0].a).toBe(6);
                expect(obj1.b.a).toBe(2);
                expect(obj2.b[0].a).toBe(3);
            });
        });
    });
});
