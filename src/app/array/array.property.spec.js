import 'array/array.property';

describe('array.property.js', function() {
    describe('Array.shuffle', function() {
        it('should shuffle arr2 to not [1, 2, 3]', function() {
            let arr = [1, 2, 3],
                arr2 = [1, 2, 3],
                isShuffle = !(arr[0] === arr2[0] && arr[1] === arr2[1] && arr[2] === arr2[2]),
                count = 0;

            expect(isShuffle).toBe(false);

            do {
                arr2 = Array.shuffle(arr2);

                isShuffle = !(arr[0] === arr2[0] && arr[1] === arr2[1] && arr[2] === arr2[2]);

                count++;
            } while (!isShuffle || count < 10);

            expect(isShuffle).toBe(true);
        });
    })
  
});
