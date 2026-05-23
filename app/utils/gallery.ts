export interface GalleryComment { author: string; text: string; time: string }
export interface GalleryItem { src: string; uploader: string; comments: GalleryComment[] }

export const demoGalleryItems: GalleryItem[] = [
  {
    src: 'https://af-pull.b-cdn.net/Outside/00-3.jpg',
    uploader: 'j.walsh',
    comments: [
      { author: 'maya.r', text: 'The grain in this frame is everything. You can feel the film stock aging in real time.', time: '2h ago' },
      { author: 'sol.b', text: 'Took this right before the lights went down. The room was completely silent already.', time: '3h ago' },
      { author: 'felix.r', text: 'Shot from the back row during the opening credits. The projection throw at this venue is something else.', time: '4h ago' },
      { author: 'nadia.k', text: 'The way the light fell across the room — it felt like the film was already happening before it started.', time: '5h ago' },
      { author: 't.park', text: 'I\'ve been to a lot of screenings here and this was the quietest I\'ve ever seen it before the first frame.', time: '6h ago' },
      { author: 'c.osei', text: 'There\'s something about 35mm in a room this size that digital just can\'t replicate.', time: '7h ago' },
    ]
  },
  {
    src: 'https://af-pull.b-cdn.net/Outside/1760992553-rpettibon52wshow2025_live-wrestling-night-1_v191.jpg',
    uploader: 'maya.r',
    comments: [
      { author: 'felix.r', text: 'The energy in that room was unreal from start to finish.', time: '1h ago' },
      { author: 'c.osei', text: 'This one says everything about the night.', time: '2h ago' },
      { author: 'dan.w', text: 'The crowd had completely given itself over by this point. You can feel it even in a still.', time: '3h ago' },
      { author: 'alex.v', text: 'The lighting design was doing so much work here. Whoever was running it knew exactly when to push.', time: '4h ago' },
      { author: 'priya.s', text: 'I was three rows back and the bass was physical. This photo doesn\'t capture the low end at all but it gets everything else right.', time: '5h ago' },
      { author: 'mo.a', text: 'Sent this to three people who weren\'t there. They all asked if they could come next time.', time: '6h ago' },
      { author: 'j.walsh', text: 'The set was already an hour in here. Nobody had moved. Nobody was looking at their phone.', time: '7h ago' },
    ]
  },
  {
    src: 'https://af-pull.b-cdn.net/Outside/a6fa553ff7fd4182b6700b30828e068bc9037108-9907x7431.jpeg',
    uploader: 'sol.b',
    comments: [
      { author: 'nadia.k', text: 'This was during the long sequence. Nobody moved for twenty minutes.', time: '1h ago' },
      { author: 't.park', text: 'Extraordinary that a room that size could hold that much quiet.', time: '2h ago' },
      { author: 'c.osei', text: 'I keep coming back to this one.', time: '3h ago' },
      { author: 'maya.r', text: 'The scale here is deceptive. You don\'t realize until you\'ve been standing in front of it for a while.', time: '4h ago' },
      { author: 'sarah.lm', text: 'Second time seeing this work and it still hits the same way. That\'s rare.', time: '5h ago' },
    ]
  },
  {
    src: 'https://af-pull.b-cdn.net/Outside/house_shows_qcnnra.webp',
    uploader: 'nadia.k',
    comments: [
      { author: 'dan.w', text: 'The scale of this only hits you when you were there.', time: '5h ago' },
      { author: 'priya.s', text: 'Everyone crammed into that space and nobody complained. The room wanted to be there.', time: '6h ago' },
      { author: 'felix.r', text: 'House shows have a specific energy that bigger venues can\'t manufacture. This was a good one.', time: '7h ago' },
      { author: 'mo.a', text: 'Ended up talking to the band for an hour after. They were as surprised by the turnout as anyone.', time: '8h ago' },
      { author: 'alex.v', text: 'The PA was barely holding on but nobody cared. Half the room was singing along anyway.', time: '9h ago' },
      { author: 'sol.b', text: 'Sweaty and too loud and absolutely perfect.', time: '10h ago' },
    ]
  },
  {
    src: 'https://af-pull.b-cdn.net/Outside/iceage-live.jpg',
    uploader: 'felix.r',
    comments: [
      { author: 'alex.v', text: 'When it dropped into the extended section — everyone felt it.', time: '2h ago' },
      { author: 'priya.s', text: 'I\'ve been at a lot of shows. This is in the top five.', time: '3h ago' },
      { author: 'c.osei', text: 'The crowd was completely still during this part. The kind of stillness that means everyone is holding their breath.', time: '4h ago' },
      { author: 'nadia.k', text: 'Shot from the side of the stage. You can see the monitor wedge in the lower left — the mix from here was brutal in the best way.', time: '5h ago' },
      { author: 'dan.w', text: 'I\'ve followed this band for a long time and this was maybe the best I\'ve seen them. Something clicked.', time: '6h ago' },
    ]
  },
  {
    src: 'https://af-pull.b-cdn.net/Outside/microscope_gallery.jpg',
    uploader: 'c.osei',
    comments: [
      { author: 'sarah.lm', text: 'The natural light changes the works completely. Worth a second visit.', time: '1d ago' },
      { author: 't.park', text: 'I went back twice. The afternoon version is worth the extra trip.', time: '2d ago' },
      { author: 'j.walsh', text: 'Something about the scale of this installation relative to the room. It just fills it without overpowering it.', time: '3d ago' },
      { author: 'maya.r', text: 'Spent forty minutes in this room. Lost track of time completely.', time: '4d ago' },
      { author: 'felix.r', text: 'The relationship between the works here and the architecture of the space is doing a lot. Very deliberate placement.', time: '5d ago' },
      { author: 'alex.v', text: 'Got the catalogue. The essay in the back contextualizes everything.', time: '6d ago' },
    ]
  },
  {
    src: 'https://af-pull.b-cdn.net/Outside/Nam-June-Paik-TV-Garden-1974-video-installation-with-color-television-sets-and-live-plants-dimensions-vary-with-installation-5.jpg',
    uploader: 't.park',
    comments: [
      { author: 'mo.a', text: 'Stood here for fifteen minutes. The scale only hits you slowly.', time: '3d ago' },
      { author: 'j.walsh', text: 'They positioned this so you come around a corner. Nothing prepares you.', time: '4d ago' },
      { author: 'priya.s', text: 'The combination of the CRT glow and the living plants is somehow both completely dated and completely contemporary.', time: '5d ago' },
      { author: 'nadia.k', text: 'It was warmer in this corner of the gallery. The screens give off heat. That detail mattered.', time: '6d ago' },
      { author: 'sol.b', text: 'I kept thinking about how different this must have read in 1974 versus now. The context has inverted completely.', time: '7d ago' },
      { author: 'c.osei', text: 'The plants look different each time. They\'re actually growing. The work changes every day.', time: '8d ago' },
    ]
  },
  {
    src: 'https://af-pull.b-cdn.net/Outside/wl6lj4zycimb1.jpg',
    uploader: 'alex.v',
    comments: [
      { author: 'dan.w', text: 'After the call. Nobody left their seats.', time: '1h ago' },
      { author: 'priya.s', text: 'Stayed for the full dark. You\'d be surprised how many did.', time: '2h ago' },
      { author: 'mo.a', text: 'The dirt on stage during the curtain call. The company was standing in what they\'d just performed in.', time: '3h ago' },
      { author: 'sarah.lm', text: 'Three standing ovations. The third one surprised even them — you could see it in their faces.', time: '4h ago' },
      { author: 'felix.r', text: 'Stayed for forty minutes after just sitting with it. Didn\'t want to go back outside.', time: '5h ago' },
      { author: 'nadia.k', text: 'The lights came back up and nobody moved for a long time. That\'s when you know.', time: '6h ago' },
    ]
  },
]
