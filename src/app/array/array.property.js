// shuffle array value
Array.shuffle = function (arr) {
    if (Array.isArray(arr)) {
        let _index, _temp;

        for (let i = arr.length - 1; i > 0; i--) {
            _index = Math.floor(Math.random() * (i + 1));
            _temp = arr[i];
            arr[i] = arr[_index];
            arr[_index] = _temp;
        }

        return arr;
    } else return false;
};
