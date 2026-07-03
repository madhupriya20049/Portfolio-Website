const PROFILE = {
  name: "Anchor Sashikala",
  title: "TV & Event Anchor",
  tagline: "I don't just hold the mic — I bring the stage to life. Available for international Telugu Association events.",
  bio: `I bring over more than 700 events to life, from weddings to Celebrity events.I always connect with the audience and make every event memorable.When surprises happen, 
  I adapt quickly to keep the fun flowing.I turn simple gatherings into unforgettable celebrations.I am the perfect voice to make your special day shine.I give my best in every event and I love entertaining people.`,
  location: "Will host events across Telangana and Andhra Pradesh",
  email: "shashiganesh143@gmail.com",
  phone: "+91 9441552399", 
  photo: "assets/image copy.png", // put a file path like "assets/profile.jpg" once you have one
  socials: {
    instagram: "https://www.instagram.com/sashianchor143?igsh=MW5nOXM3aDFvNndveQ==",
    youtube: "https://youtube.com/@smileysashidreamsworld?si=Nbr8ipg1y5i0vLOb",
  },
  stats: [
    { number: "700+", label: "Shows Hosted" },
    { number: "35",  label: "Promotions" },
    { number: "5",   label: "Years Experience" },
    { number: "2",   label: "Languages: Telugu & English" }
  ],
  skills: ["Promotional events","Celebrity Events","Corporate Events", "Weddings", "Award Shows", "Product Launches", "Get together Events"]
};

const EVENTS = [
  {
    id: "ev-001",
    title: "Vivo-x-200 & OPPO Mobile Launch",
    category: "Launch & Promotional Events",
    venue: "Khammam,Telangana",
    media: [
      { type: "image", src: "assets/vivo1.jpeg", caption: "vivo-x-200" },
      { type: "image", src: "assets/vivo2.jpeg", caption: "vivo mobile" },
      { type: "video", src: "assets/vivo-1.mp4", caption: "OPPO Mobile Launch" }
    ]
  },
  {
    id: "ev-005",
    title: "Gowin Shopping Mall Opening",
    category: "Launch & Promotional Events",
    venue: "Khammam,Telangana",
    media: [
      { type: "image", src: "assets/Gowin1.jpeg", caption: "Gowin Shopping mall" },
      { type: "image", src: "assets/Gowin2.jpeg", caption: "Gowin shopping mall opening" },
      { type: "video", src: "assets/Gowin-video.mp4", caption: "Hyper Aadi garu at Gowin Shopping Mall" }
    ]
  },
  {
    id: "ev-006",
    title: "Vega Jewellery Promotion",
    category: "Launch & Promotional Events",
    venue: "Hyderabad,Telangana",
    media: [
      { type: "video", src: "assets/vega.mp4", caption: "Vega Jewellery Promotion" }
    ]
  },
  {
    id: "ev-002",
    title: "Haldi Ceremony",
    category: "Wedding",
    venue: "Manuguru,Telangana",
    media: [
      { type: "image", src: "assets/Haldi.jpeg", caption: "Haldi at manuguru" },
      { type: "video", src: "assets/Haldi-1.mp4", caption: "Highlights in Haldi Ceremony" },
      { type: "video", src: "assets/Haldi-2.mp4", caption: "Haldi Ceremony Highlights" }
    ]
  },
  {
    id: "ev-007",
    title: "Reception",
    category: "Wedding",
    venue: "Suryapet,Telangana",
    media: [
      { type: "video", src: "assets/reception.mp4", caption: "Reception Highlights" }
    ]
  },
  {
    id: "ev-003",
    title: "Talent Icon Award Show",
    category: "Award Show",
    venue: "Hyderabad",
    media: [
      { type: "image", src: "assets/award1.jpeg", caption: "Award presentation" },
      { type: "image", src: "assets/award2.jpeg", caption: "Great Evening" },
      { type: "image", src: "assets/award3.jpeg", caption: "Award Presentation" },
      { type: "video", src: "assets/award.mp4", caption: "My Falisitation" }
    ]
  },
  {
    id: "ev-004",
    title: "New Year Event",
    category: "TV & Celebrity Events",
    venue: "Warangal,Telanagana",
    media: [
      { type: "image", src: "assets/new-yr1.jpeg", caption: "Ramu Rathod garu at New Year Event" },
      { type: "image", src: "assets/new-yr2.jpeg", caption: "New Year Event Highlights" },
      { type: "video", src: "assets/new-year.mp4", caption: "Glance of New Year Event" }
    ]
  },
  {
    id: "ev-008",
    title: "Jabardasth Event",
    category: "TV & Celebrity Events",
    venue: "Sathupally,Telanagana",
    media: [
      { type: "image", src: "assets/jabardast2.jpeg", caption: "Shanthi swaroop garu" },
      { type: "image", src: "assets/jabardast3.jpeg", caption: "Dhorababu garu" },
      { type: "image", src: "assets/jabardast4.jpeg", caption: "Vinod Garu" },
      { type: "image", src: "assets/jabardast1.jpeg", caption: "Hyper Aadi garu" },
      { type: "video", src: "assets/jabardast.mp4", caption: "Glance of Jabardasth Event" }
    ]
  }
];
