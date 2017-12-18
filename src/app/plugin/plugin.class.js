export default class plugin {
    constructor () {
        this._ready = false;
    }

    // load plugin file if html not load the file
    _loadPlugin (url, callback) {
        // Adding the script tag to the head as suggested before
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.addEventListener('load', () => { callback(this); });

        // Fire the loading
        head.appendChild(script);

        return url;
    }

    waitReady (callback) {
        function _callback (self) {
            if (self._ready) {
                callback();
                if (_timer !== null) clearInterval(_timer);
            } else if (_timer === null) {
                _timer = setInterval(() => {
                    _callback(self);
                }, 200);
            }
        }

        let _timer = null;

        _callback(this);

        return true;
    }

    get ready () { return this._ready; }
}
