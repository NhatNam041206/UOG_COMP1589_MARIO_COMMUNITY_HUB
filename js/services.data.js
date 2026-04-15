(function () {
  'use strict';

  /* Service modal data contract:
     - title: modal heading
     - gallery: image slides
     - content: ordered blocks (paragraph, heading, list, tip) */

  window.SERVICE_MODAL_CONTENT = {
    // Karting details for track logistics and race guidance.
    karting: {
      title: 'Karting Logistics: Your Track Guide',
      // Carousel media shown at the top of the modal.
      gallery: [
        {
          src: 'imgs/karting/start-outdoor-karting.jpg',
          alt: 'Starting grid with community racers getting ready for a karting session'
        },
        {
          src: 'imgs/karting/karting-race.jpg',
          alt: 'Karts racing through a curved track section during a friendly event'
        }
      ],
      // Content blocks rendered in order under the gallery.
      content: [
        // Intro context.
        {
          type: 'paragraph',
          text: 'Getting behind the wheel is a thrill, and we want to make sure you have the best time possible.'
        },
        // Pricing section header.
        {
          type: 'heading',
          text: 'Racing Prices'
        },
        // Pricing overview.
        {
          type: 'paragraph',
          text: 'We have a racing level for everyone, from first-timers to seasoned pros. Here is what you can expect to pay for a 10-15 minute session:'
        },
        // Pricing tiers.
        {
          type: 'list',
          items: [
            { lead: 'Beginners and Kids', text: '$13.00 to $25.00' },
            { lead: 'Standard Fun', text: '$28.00 to $35.00' },
            { lead: 'Expert Racing', text: '$40.00 to $110.00 (depending on kart power)' }
          ]
        },
        // Promotional tip.
        {
          type: 'tip',
          lead: 'Top Tip',
          text: 'Join us mid-week for Lappy Hour to save $5.00 or get extra time on the track.'
        },
        // Driving section header.
        {
          type: 'heading',
          text: 'How to Drive Like a Pro'
        },
        // Driving guidance intro.
        {
          type: 'paragraph',
          text: 'Do not worry if it is your first time. Follow these steps to master the track:'
        },
        // Driving techniques.
        {
          type: 'list',
          items: [
            { lead: 'The Racing Line', text: 'The smoothest path through a turn so you can stay fast.' },
            { lead: 'The Late Turn', text: 'On long straights, turn in a little later to carry better exit speed.' },
            { lead: 'Easy Braking', text: 'Brake in three steps: light pressure, firm slowdown, then gently release as you turn.' }
          ]
        },
        // Safety section header.
        {
          type: 'heading',
          text: 'Staying Safe'
        },
        // Safety guidance intro.
        {
          type: 'paragraph',
          text: 'Your safety is our number one priority. Before you race, please remember:'
        },
        // Safety checklist.
        {
          type: 'list',
          items: [
            { lead: 'What to Wear', text: 'We provide professional helmets and protective suits.' },
            { lead: 'Height and Age', text: 'Adult karts require at least 140 cm (about 4.6 feet). Junior karts start from age 9.' },
            { lead: 'Health First', text: 'Guests with heart or back concerns, or those who are pregnant, should skip racing for now.' }
          ]
        }
      ]
    },

    // Fan socials details for meetups and networking activities.
    'fan-socials': {
      title: 'Fan Meetings: The Social Guide',
      // Carousel media shown at the top of the modal.
      gallery: [
        {
          src: 'imgs/events/fan_meeting_feature.jpg',
          alt: 'Community members chatting in a Mario-themed social area'
        },
        {
          src: 'imgs/events/interactive-activities-pic1.jpg',
          alt: 'Fans joining an interactive event activity with a Super Mario-themed backdrop'
        },
        {
          src: 'imgs/events/interactive-activities-pic2.jpg',
          alt: 'A visitor playing on a large screen while other fans watch and cheer'
        },
        {
          src: 'imgs/events/stage-meeting-pic2.jpg',
          alt: 'Stage-led fan session with audience participation and photo moments'
        }
      ],
      // Content blocks rendered in order under the gallery.
      content: [
        // Intro context.
        {
          type: 'paragraph',
          text: 'Our hub is the perfect place to celebrate your favorite hobbies with people who love them just as much as you do.'
        },
        // Expectations section header.
        {
          type: 'heading',
          text: 'What to Expect'
        },
        // Expectations overview.
        {
          type: 'paragraph',
          text: 'When you come to an event, we make everything easy for you. You will find:'
        },
        // Venue and event features.
        {
          type: 'list',
          items: [
            { lead: 'Digital Schedules', text: 'Check your phone for real-time updates on what is happening and where to go.' },
            { lead: 'Comfortable Spaces', text: 'Rooms are kept cool and fully accessible with ramps and elevators.' },
            { lead: 'Great Tech', text: 'Big, clear screens and fast Wi-Fi so you can share moments instantly.' }
          ]
        },
        // Community section header.
        {
          type: 'heading',
          text: 'The Community Spirit'
        },
        // Community value overview.
        {
          type: 'paragraph',
          text: 'These meetings are about more than fun. They are about building friendships:'
        },
        // Social and growth outcomes.
        {
          type: 'list',
          items: [
            { lead: 'Make New Friends', text: 'Meet people who share your passion for racing and gaming.' },
            { lead: 'Learn and Grow', text: 'Exchange hobby tips or connect with leaders who can support your career path.' }
          ]
        }
      ]
    },

    // Merch details for collector-focused products and drops.
    merch: {
      title: 'Premium Merch: The Item Shop',
      // Carousel media shown at the top of the modal.
      gallery: [
        {
          src: 'imgs/merchs/merch_fan_meeting.jpeg',
          alt: 'Main merch table with collector-focused community items'
        },
        {
          src: 'imgs/merchs/1_merch.jpg',
          alt: 'Close-up of limited-edition event merch packaging'
        },
        {
          src: 'imgs/merchs/2_merch.jpg',
          alt: 'Collector gift box prepared for Mario Community Hub members'
        },
        {
          src: 'imgs/merchs/3_merch.jpg',
          alt: 'Collector pin and card set arranged on display'
        },
        {
          src: 'imgs/merchs/5_merch.jpg',
          alt: 'Special edition merch case with themed details'
        },
        {
          src: 'imgs/merchs/4_merch.jpg',
          alt: 'Fan-favorite collectible merch pieces arranged for display'
        }
      ],
      // Content blocks rendered in order under the gallery.
      content: [
        // Intro context.
        {
          type: 'paragraph',
          text: 'Looking for something special to remember your visit? Our Special Collector Coins are the ultimate treasure for dedicated members.'
        },
        // Product value highlights.
        {
          type: 'list',
          items: [
            { lead: 'Beautiful Craftsmanship', text: 'Each coin features a 3D effect that makes the artwork stand out.' },
            { lead: 'A High-Quality Glow', text: 'Premium gold finish built to stay bright and shiny for years.' },
            { lead: 'Perfect Protection', text: 'Comes in a clear protective case and a soft, velvet-lined display box.' },
            { lead: 'Rare Finds', text: 'Produced in small batches, making each release extra special.' }
          ]
        }
      ]
    }
  };
})();
