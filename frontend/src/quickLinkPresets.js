/**
 * Quick-action bar: user enters a short value; we prepend the platform base URL.
 */

export const QUICK_PRESET_IDS = [
  'facebook',
  'youtube',
  'instagram',
  'pinterest',
  'tiktok',
  'twitter',
  'location'
];

/** Strip @ and trim; used for social handles */
export function normalizeSocialHandle(raw) {
  if (raw == null || typeof raw !== 'string') return '';
  return raw.trim().replace(/@+/g, '').replace(/\s+/g, '');
}

export function getQuickFieldMeta(presetId) {
  switch (presetId) {
    case 'facebook':
      return {
        stepHeading: 'Facebook profile or page',
        key: 'socialHandle',
        label: 'Username or page name',
        placeholder: 'zuck or your.page',
        hint: 'QR opens: https://www.facebook.com/…'
      };
    case 'youtube':
      return {
        stepHeading: 'YouTube channel',
        key: 'socialHandle',
        label: 'Channel @handle (without @)',
        placeholder: 'YourChannelName',
        hint: 'QR opens: https://www.youtube.com/@…'
      };
    case 'instagram':
      return {
        stepHeading: 'Instagram profile',
        key: 'socialHandle',
        label: 'Username only',
        placeholder: 'instagram',
        hint: 'QR opens: https://www.instagram.com/…'
      };
    case 'pinterest':
      return {
        stepHeading: 'Pinterest profile',
        key: 'socialHandle',
        label: 'Username',
        placeholder: 'username',
        hint: 'QR opens: https://www.pinterest.com/…'
      };
    case 'tiktok':
      return {
        stepHeading: 'TikTok profile',
        key: 'socialHandle',
        label: 'Username (without @)',
        placeholder: 'username',
        hint: 'QR opens: https://www.tiktok.com/@…'
      };
    case 'twitter':
      return {
        stepHeading: 'X (Twitter) profile',
        key: 'socialHandle',
        label: 'Username (without @)',
        placeholder: 'username',
        hint: 'QR opens: https://x.com/…'
      };
    case 'location':
      return {
        stepHeading: 'Location on Google Maps',
        key: 'locationQuery',
        label: 'Address or place name',
        placeholder: '1600 Amphitheatre Parkway, Mountain View',
        hint: 'Opens Google Maps search for this place'
      };
    default:
      return null;
  }
}

/**
 * Build final QR payload URL for a quick preset + user input.
 */
function looksLikeHttpUrl(s) {
  return /^https?:\/\//i.test((s || '').trim());
}

export function buildQuickPresetUrl(presetId, data) {
  const meta = getQuickFieldMeta(presetId);
  if (!meta) return 'https://smartqr.io';

  if (presetId === 'location') {
    const q = (data.locationQuery || '').trim();
    if (!q) return 'https://www.google.com/maps';
    if (looksLikeHttpUrl(q)) return q;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }

  const rawInput = (data.socialHandle || '').trim();
  if (looksLikeHttpUrl(rawInput)) return rawInput;

  const h = normalizeSocialHandle(data.socialHandle || '');
  switch (presetId) {
    case 'facebook':
      return h ? `https://www.facebook.com/${encodeURIComponent(h)}` : 'https://www.facebook.com/';
    case 'youtube':
      return h ? `https://www.youtube.com/@${encodeURIComponent(h)}` : 'https://www.youtube.com/';
    case 'instagram':
      return h ? `https://www.instagram.com/${encodeURIComponent(h)}/` : 'https://www.instagram.com/';
    case 'pinterest':
      return h ? `https://www.pinterest.com/${encodeURIComponent(h)}/` : 'https://www.pinterest.com/';
    case 'tiktok':
      return h ? `https://www.tiktok.com/@${encodeURIComponent(h)}` : 'https://www.tiktok.com/';
    case 'twitter':
      return h ? `https://x.com/${encodeURIComponent(h)}` : 'https://x.com/';
    default:
      return 'https://smartqr.io';
  }
}
