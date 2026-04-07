/**
 * Center QR logos: user-provided PNGs in /public/logos/*.png + matched dot/eye colors.
 */
const base = import.meta.env.BASE_URL || '/';
const logoSrc = (file) => `${base}logos/${file}`.replace(/([^:]\/)\/+/g, '$1');

export const BRAND_CENTER_LOGOS = [
  {
    id: 'instagram',
    label: 'Instagram',
    src: logoSrc('instagram.png'),
    matchDots: '#E1306C',
    matchEye: '#C13584',
    btnBg: '#ffffff',
    border: true
  },
  {
    id: 'camera',
    label: 'Camera',
    src: logoSrc('camera.png'),
    matchDots: '#1f4bd8',
    matchEye: '#1565c0',
    btnBg: '#ffffff',
    border: true
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    src: logoSrc('pinterest.png'),
    matchDots: '#E60023',
    matchEye: '#bd081c',
    btnBg: '#ffffff',
    border: true
  },
  {
    id: 'x-twitter',
    label: 'X',
    src: logoSrc('x-twitter.png'),
    matchDots: '#000000',
    matchEye: '#000000',
    btnBg: '#ffffff',
    border: true
  },
  {
    id: 'youtube',
    label: 'YouTube',
    src: logoSrc('youtube.png'),
    matchDots: '#FF0000',
    matchEye: '#cc0000',
    btnBg: '#ffffff',
    border: true
  },
  {
    id: 'snapchat',
    label: 'Snapchat',
    src: logoSrc('snapchat.png'),
    matchDots: '#000000',
    matchEye: '#212121',
    btnBg: '#ffffff',
    border: true
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    src: logoSrc('tiktok.png'),
    matchDots: '#25f4ee',
    matchEye: '#fe2c55',
    btnBg: '#ffffff',
    border: true
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    src: logoSrc('linkedin.png'),
    matchDots: '#0A66C2',
    matchEye: '#004182',
    btnBg: '#ffffff',
    border: true
  }
];
