const stories = [
  {
    name: 'Ava Keller',
    location: 'Germany',
    quote:
      'I am a content creator from Germany. I used smartQR to share links through social media, and it helped me grow followers from around the world.'
  },
  {
    name: 'Noah Brown',
    location: 'United States',
    quote:
      'We switched our event flyers to QR codes and saw faster registrations within days. The setup was simple and reliable.'
  },
  {
    name: 'Lucia Romano',
    location: 'Italy',
    quote:
      'Our cafe added QR menus and customers love the clean look. Updates are instant and the experience feels premium.'
  },
  {
    name: 'Ethan Patel',
    location: 'India',
    quote:
      'I use smartQR to share portfolio links with clients. The tracking insights help me understand what gets the most attention.'
  },
  {
    name: 'Maya Nguyen',
    location: 'Vietnam',
    quote:
      'The QR landing pages are beautiful and easy to customize. It makes our campaigns feel professional without extra design work.'
  },
  {
    name: 'Oliver Wright',
    location: 'United Kingdom',
    quote:
      'Our retail team prints QR codes on shelf tags and customers scan for detailed specs. It has improved in-store engagement.'
  },
  {
    name: 'Sofia Alvarez',
    location: 'Spain',
    quote:
      'I use smartQR for workshop signups. It is quick to generate and the scans bring consistent traffic to my signup page.'
  },
  {
    name: 'Paulo Salim Maluf',
    location: 'Brazil',
    quote:
      'We attached QR codes to packaging so people can watch product videos. The feedback has been amazing.'
  },
  {
    name: 'Amina Hassan',
    location: 'Egypt',
    quote:
      'The dynamic QR option lets us update links without reprinting. That flexibility saved us time and money.'
  },
  {
    name: 'Hiro Tanaka',
    location: 'Japan',
    quote:
      'I am a photographer and use QR codes on prints to link galleries. Clients love the extra details.'
  }
];

const avatarColors = ['#f06292', '#ef5350', '#ffd54f', '#66bb6a', '#ab47bc'];
const lightAvatars = new Set(['#ffd54f']);

const getAvatarStyle = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 2147483647;
  }
  const bg = avatarColors[hash % avatarColors.length];
  return {
    backgroundColor: bg,
    color: lightAvatars.has(bg) ? '#1f2a44' : '#ffffff'
  };
};

export default function CustomerStories() {
  return (
    <section className="stories" id="customer-stories">
      <div className="stories__header">
        <h1>Customer Success Stories</h1>
        <p>Real feedback from teams using smartQR every day.</p>
      </div>
      <div className="stories__grid">
        {stories.map((story) => (
          <article className="stories__card" key={story.name}>
            <div className="stories__avatar" style={getAvatarStyle(story.name)} aria-hidden="true">
              {story.name.slice(0, 1)}
            </div>
            <div className="stories__meta">
              <h3 className="stories__name">{story.name}</h3>
              <p className="stories__location">{story.location}</p>
            </div>
            <p className="stories__quote">"{story.quote}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}
