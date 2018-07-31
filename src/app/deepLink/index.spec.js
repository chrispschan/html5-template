import 'jsdomSetup/jsdomSetup';
import DeepLink from 'deepLink/index';

describe('deepLink/index.js', function () {
    describe(`ios`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="deepLinkIOS" href="index.html"></a>`;

            navigator.__defineGetter__('userAgent', function () {
                return 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
            });
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('deepLinkIOS'));
        });

        describe(`new DeepLink - deepLink: 'deepLink.html'`, function () {
            it(`should create deepLink: deepLink.html`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkIOS', deepLink: 'deepLink.html'});

                expect(deepLink.os).toBe('ios');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('deepLink.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - data-deep-link="deepLink.html"`, function () {
            it(`should create deepLink: deepLink.html`, function () {
                document.getElementById('deepLinkIOS').setAttribute('data-deep-link', 'deepLink.html');

                let deepLink = new DeepLink({ele: '#deepLinkIOS'});

                expect(deepLink.os).toBe('ios');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('deepLink.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - ios: {deepLink: 'ios.html'}`, function () {
            it(`should create deepLink: ios.html`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkIOS', deepLink: 'deepLink.html', ios: {deepLink: 'ios.html'}});

                expect(deepLink.os).toBe('ios');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('ios.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - data-ios-link: "ios.html"`, function () {
            it(`should create deepLink: ios.html`, function () {
                document.getElementById('deepLinkIOS').setAttribute('data-deep-link', 'deepLink.html');
                document.getElementById('deepLinkIOS').setAttribute('data-ios-link', 'ios.html');

                let deepLink = new DeepLink({ele: '#deepLinkIOS'});

                expect(deepLink.os).toBe('ios');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('ios.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - appName: 'twitter',ios: {deepLink: 'ios.html', id: '333903271'}`, function () {
            it(`should create deepLink: ios.html, store: itms-apps://itunes.apple.com/hk/app/twitter/id333903271`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkIOS', deepLink: 'deepLink.html', appName: 'twitter', ios: {deepLink: 'ios.html', id: '333903271'}});

                expect(deepLink.os).toBe('ios');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('ios.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('itms-apps://itunes.apple.com/hk/app/twitter/id333903271');
            });
        });

        describe(`new DeepLink - data-app-name="twitter" data-ios-link: "ios.html" data-ios-id="333903271"`, function () {
            it(`should create deepLink: ios.html, store: itms-apps://itunes.apple.com/hk/app/twitter/id333903271`, function () {
                document.getElementById('deepLinkIOS').setAttribute('data-deep-link', 'deepLink.html');
                document.getElementById('deepLinkIOS').setAttribute('data-ios-link', 'ios.html');
                document.getElementById('deepLinkIOS').setAttribute('data-ios-id', '333903271');
                document.getElementById('deepLinkIOS').setAttribute('data-app-name', 'twitter');

                let deepLink = new DeepLink({ele: '#deepLinkIOS'});

                expect(deepLink.os).toBe('ios');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('ios.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('itms-apps://itunes.apple.com/hk/app/twitter/id333903271');
            });
        });

        describe(`new DeepLink - ios: {support: false}`, function () {
            it(`should not create deepLink`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkIOS', deepLink: 'deepLink.html', ios: {support: false}});

                expect(deepLink.os).toBe('ios');
                expect(deepLink.deepLink.length).toBe(0);
            });
        });
    });

    describe(`android`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="deepLinkAndroid" href="index.html"></a>`;

            navigator.__defineGetter__('userAgent', function () {
                return 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Mobile Safari/537.36';
            });
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('deepLinkAndroid'));
        });

        describe(`new DeepLink - deepLink: 'deepLink.html'`, function () {
            it(`should create deepLink: deepLink.html`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkAndroid', deepLink: 'deepLink.html'});

                expect(deepLink.os).toBe('android');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('deepLink.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - data-deep-link="deepLink.html"`, function () {
            it(`should create deepLink: deepLink.html`, function () {
                document.getElementById('deepLinkAndroid').setAttribute('data-deep-link', 'deepLink.html');

                let deepLink = new DeepLink({ele: '#deepLinkAndroid'});

                expect(deepLink.os).toBe('android');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('deepLink.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - android: {deepLink: 'android.html'}`, function () {
            it(`should create deepLink: android.html`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkAndroid', deepLink: 'deepLink.html', android: {deepLink: 'android.html'}});

                expect(deepLink.os).toBe('android');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('android.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - data-android-link: "android.html"`, function () {
            it(`should create deepLink: android.html`, function () {
                document.getElementById('deepLinkAndroid').setAttribute('data-deep-link', 'deepLink.html');
                document.getElementById('deepLinkAndroid').setAttribute('data-android-link', 'android.html');

                let deepLink = new DeepLink({ele: '#deepLinkAndroid'});

                expect(deepLink.os).toBe('android');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('android.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - appName: 'twitter',android: {deepLink: 'android.html', id: 'com.twitter.android'}`, function () {
            it(`should create deepLink: android.html, store: market://details?id=com.twitter.android`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkAndroid', deepLink: 'deepLink.html', appName: 'twitter', android: {deepLink: 'android.html', id: 'com.twitter.android'}});

                expect(deepLink.os).toBe('android');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('android.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('market://details?id=com.twitter.android');
            });
        });

        describe(`new DeepLink - data-app-name="twitter" data-android-link: "android.html" data-android-id="com.twitter.android"`, function () {
            it(`should create deepLink: android.html, store: market://details?id=com.twitter.android`, function () {
                document.getElementById('deepLinkAndroid').setAttribute('data-deep-link', 'deepLink.html');
                document.getElementById('deepLinkAndroid').setAttribute('data-android-link', 'android.html');
                document.getElementById('deepLinkAndroid').setAttribute('data-android-id', 'com.twitter.android');
                document.getElementById('deepLinkAndroid').setAttribute('data-app-name', 'twitter');

                let deepLink = new DeepLink({ele: '#deepLinkAndroid'});

                expect(deepLink.os).toBe('android');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('android.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('market://details?id=com.twitter.android');
            });
        });

        describe(`new DeepLink - android: {support: false}`, function () {
            it(`should not create deepLink`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkAndroid', deepLink: 'deepLink.html', android: {support: false}});

                expect(deepLink.os).toBe('android');
                expect(deepLink.deepLink.length).toBe(0);
            });
        });
    });

    describe(`windows phone`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="deepLinkWindows" href="index.html"></a>`;

            navigator.__defineGetter__('userAgent', function () {
                return 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263';
            });
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('deepLinkWindows'));
        });

        describe(`new DeepLink - deepLink: 'deepLink.html'`, function () {
            it(`should not create deepLink, windows.support: false (default)`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkWindows', deepLink: 'deepLink.html'});

                expect(deepLink.os).toBe('windows');
                expect(deepLink.deepLink.length).toBe(0);
            });
        });

        describe(`new DeepLink - deepLink: 'deepLink.html', windows: {support: true}`, function () {
            it(`should create deepLink: deepLink.html`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkWindows', deepLink: 'deepLink.html', windows: {support: true}});

                expect(deepLink.os).toBe('windows');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('deepLink.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - data-deep-link="deepLink.html"`, function () {
            it(`should create deepLink: deepLink.html`, function () {
                document.getElementById('deepLinkWindows').setAttribute('data-deep-link', 'deepLink.html');

                let deepLink = new DeepLink({ele: '#deepLinkWindows', windows: {support: true}});

                expect(deepLink.os).toBe('windows');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('deepLink.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - windows: {deepLink: 'windows.html'}`, function () {
            it(`should create deepLink: windows.html`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkWindows', deepLink: 'deepLink.html', windows: {deepLink: 'windows.html', support: true}});

                expect(deepLink.os).toBe('windows');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('windows.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - data-windows-link: "windows.html"`, function () {
            it(`should create deepLink: windows.html`, function () {
                document.getElementById('deepLinkWindows').setAttribute('data-deep-link', 'deepLink.html');
                document.getElementById('deepLinkWindows').setAttribute('data-windows-link', 'windows.html');

                let deepLink = new DeepLink({ele: '#deepLinkWindows', windows: {support: true}});

                expect(deepLink.os).toBe('windows');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('windows.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('index.html');
            });
        });

        describe(`new DeepLink - appName: 'twitter',windows: {deepLink: 'windows.html', id: 'com.twitter.windows'}`, function () {
            it(`should create deepLink: windows.html, store: zune:navigate?appid=9wzdncrfj140`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkWindows', deepLink: 'deepLink.html', appName: 'twitter', windows: {deepLink: 'windows.html', support: true, id: '9wzdncrfj140'}});

                expect(deepLink.os).toBe('windows');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('windows.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('zune:navigate?appid=9wzdncrfj140');
            });
        });

        describe(`new DeepLink - data-app-name="twitter" data-windows-link: "windows.html" data-windows-id="9wzdncrfj140"`, function () {
            it(`should create deepLink: windows.html, store: zune:navigate?appid=9wzdncrfj140`, function () {
                document.getElementById('deepLinkWindows').setAttribute('data-deep-link', 'deepLink.html');
                document.getElementById('deepLinkWindows').setAttribute('data-windows-link', 'windows.html');
                document.getElementById('deepLinkWindows').setAttribute('data-windows-id', '9wzdncrfj140');
                document.getElementById('deepLinkWindows').setAttribute('data-app-name', 'twitter');

                let deepLink = new DeepLink({ele: '#deepLinkWindows', windows: {support: true}});

                expect(deepLink.os).toBe('windows');
                expect(deepLink.deepLink.length).toBe(1);
                expect(deepLink.deepLink[0].deepLinkOptions.deepLink).toBe('windows.html');
                expect(deepLink.deepLink[0].deepLinkOptions.store).toBe('zune:navigate?appid=9wzdncrfj140');
            });
        });
    });

    describe(`other`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="deepLinkOther" href="index.html"></a>`;

            navigator.__defineGetter__('userAgent', function () {
                return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36';
            });
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('deepLinkOther'));
        });

        describe(`new DeepLink`, function () {
            it(`should not create deepLink`, function () {
                let deepLink = new DeepLink({ele: '#deepLinkOther', deepLink: 'deepLink.html'});

                expect(deepLink.os).toBe('other');
                expect(deepLink.deepLink.length).toBe(0);

                document.body.removeChild(document.getElementById('deepLinkOther'));

                document.body.innerHTML += `<a id="deepLinkOther" href="index.html" data-deep-link="deepLink.html"></a>`;

                deepLink = new DeepLink({ele: '#deepLinkOther'});
                
                expect(deepLink.deepLink.length).toBe(0);
            });
        });
    });
});
