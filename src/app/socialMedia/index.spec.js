import 'jsdomSetup/jsdomSetup';
import SocialMedia from 'socialMedia/index';

describe('socialMedia/index.js', function () {
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
