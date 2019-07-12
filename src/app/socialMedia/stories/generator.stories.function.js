import SocialMedia from 'socialMedia';

const socialMedia = new SocialMedia({ele: '.socialMedia'});

const socials = document.getElementById('socials');
const shareUrl = document.getElementById('shareUrl');
const output = document.getElementById('output');

window.getUrl = () => {
  socialMedia.addSocialMedia('.socialMedia', {
    href: shareUrl.value,
    type: socials.options[socials.selectedIndex].value
  });

  output.value = socialMedia.socialMedia[0].socialMediaOptions.shareLink;
};
