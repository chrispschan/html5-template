import 'jsdomSetup/jsdomSetup';
import SocialMedia from 'socialMedia/index';

describe('socialMedia/index.js', function () {
    describe(`buffer`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaBuffer" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaBuffer'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaBuffer', type: 'buffer'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('https://bufferapp.com/add?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`digg`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaDigg" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaDigg'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaDigg', type: 'digg'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('http://www.digg.com/submit?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`facebook`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaFB" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaFB'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaFB', type: 'facebook'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`line`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaLine" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaLine'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaLine', type: 'line'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`linkedIn`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaLinkedIn" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaLinkedIn'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaLinkedIn', type: 'linkedIn'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('http://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`reddit`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaReddit" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaReddit'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaReddit', type: 'reddit'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('http://reddit.com/submit?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`stumbleUpon`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaStumbleUpon" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaStumbleUpon'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaStumbleUpon', type: 'stumbleUpon'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('http://www.stumbleupon.com/submit?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`tumblr`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaTumblr" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaTumblr'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaTumblr', type: 'tumblr'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('http://www.tumblr.com/share/link?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`twitter`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaTW" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaTW'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaTW', type: 'twitter'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('https://twitter.com/share?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`vk`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaVK" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaVK'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaVK', type: 'vk'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('http://vkontakte.ru/share.php?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`whatsapp`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaWhatsapp" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaWhatsapp'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaWhatsapp', type: 'whatsapp'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('https://wa.me/?text=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`yummly`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaYummly" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaYummly'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaYummly', type: 'yummly'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('http://www.yummly.com/urb/verify?url=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });

    describe(`other`, function () {
        beforeEach(function () {
            document.body.innerHTML += `<a id="socialMediaOther" href="https://chrispschan.github.io/index.html"></a>`;
        });

        afterEach(function () {
            document.body.removeChild(document.getElementById('socialMediaOther'));
        });

        describe(`new SocialMedia`, function () {
            it(`should create socialMedia`, function () {
                let socialMedia = new SocialMedia({ele: '#socialMediaOther', type: 'wechat'});

                expect(socialMedia.socialMedia[0].socialMediaOptions.shareLink).toBe('https://www.addtoany.com/add_to/wechat?linkurl=https%3A%2F%2Fchrispschan.github.io%2Findex.html');
            });
        });
    });
});
