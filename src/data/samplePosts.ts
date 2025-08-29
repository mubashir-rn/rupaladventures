import { PostData } from '@/components/content/PostForm';

export const samplePosts: Omit<PostData, 'id' | 'createdAt' | 'author'>[] = [
  {
    title: "Nanga Parbat Base Camp Trek - Winter Edition",
    content: "Experience the majestic Nanga Parbat in its winter glory. This challenging trek takes you through snow-covered valleys and offers breathtaking views of the 'Killer Mountain'. Perfect for experienced trekkers looking for an adventure of a lifetime.",
    type: "expedition",
    category: "Mountain Climbing",
    location: "Nanga Parbat, Pakistan",
    duration: "12 days",
    difficulty: "expert",
    price: "$2500-3000",
    images: ["/src/assets/hero-mountain.jpg"],
    isPublished: true,
  },
  {
    title: "Laila Peak Climbing Expedition",
    content: "Join us for an unforgettable climbing experience on Laila Peak. This 6,096-meter peak offers a perfect blend of technical climbing and stunning Himalayan views. Suitable for intermediate to advanced climbers.",
    type: "expedition",
    category: "Mountain Climbing",
    location: "Laila Peak, Karakoram Range",
    duration: "18 days",
    difficulty: "challenging",
    price: "$3200-3800",
    images: ["/src/assets/laila-peak.jpg"],
    isPublished: true,
  },
  {
    title: "Fairy Meadows Adventure Trek",
    content: "Discover the magical Fairy Meadows, often called 'Heaven on Earth'. This moderate trek is perfect for nature lovers and photography enthusiasts. Experience the beauty of alpine meadows and panoramic mountain views.",
    type: "adventure",
    category: "Trekking",
    location: "Fairy Meadows, Nanga Parbat",
    duration: "5 days",
    difficulty: "moderate",
    price: "$800-1000",
    images: ["/src/assets/fairy-meadows.jpg"],
    isPublished: true,
  },
  {
    title: "K2 Base Camp Tour - The Ultimate Adventure",
    content: "Embark on a journey to the base of the world's second-highest peak. This tour combines cultural experiences with breathtaking mountain scenery. Visit local villages and learn about the rich history of mountaineering in the region.",
    type: "tour",
    category: "Cultural Tour",
    location: "K2 Base Camp, Baltoro Glacier",
    duration: "14 days",
    difficulty: "moderate",
    price: "$1800-2200",
    images: ["/src/assets/hero-mountain.jpg"],
    isPublished: true,
  },
  {
    title: "New Safety Guidelines for High-Altitude Expeditions",
    content: "Important updates regarding safety protocols for all high-altitude expeditions. New regulations include mandatory acclimatization periods, updated emergency response procedures, and enhanced communication protocols.",
    type: "news",
    category: "Safety Updates",
    location: "Pakistan",
    duration: "",
    difficulty: "",
    price: "",
    images: [],
    isPublished: true,
  },
  {
    title: "Weather Alert: Heavy Snowfall Expected in Karakoram",
    content: "Heavy snowfall is expected in the Karakoram region over the next 48 hours. All expeditions and treks in the area are advised to postpone or reroute. Safety first - conditions will be reassessed after the weather clears.",
    type: "alert",
    category: "Weather Warning",
    location: "Karakoram Range",
    duration: "",
    difficulty: "",
    price: "",
    images: [],
    isPublished: true,
  },
  {
    title: "Spring Climbing Season Preview",
    content: "Get ready for an exciting spring climbing season! We've planned several new routes and expeditions. Early bird discounts available for bookings made before March 1st. Don't miss out on these amazing opportunities.",
    type: "news",
    category: "Seasonal Updates",
    location: "Various Locations",
    duration: "",
    difficulty: "",
    price: "",
    images: [],
    isPublished: true,
  },
  {
    title: "Family-Friendly Trek to Deosai Plains",
    content: "Perfect for families with children aged 8 and above. This easy trek offers stunning views of the Deosai Plains, known as the 'Land of Giants'. Spot wildlife, enjoy wildflowers, and create lasting memories.",
    type: "tour",
    category: "Family Tours",
    location: "Deosai Plains, Gilgit-Baltistan",
    duration: "3 days",
    difficulty: "easy",
    price: "$400-500",
    images: ["/src/assets/fairy-meadows.jpg"],
    isPublished: true,
  },
];

// Function to initialize sample posts in localStorage
export const initializeSamplePosts = () => {
  const existingPosts = localStorage.getItem('rupal_posts');
  if (!existingPosts) {
    const postsWithIds = samplePosts.map((post, index) => ({
      ...post,
      id: `sample-${index + 1}`,
      author: 'sample-user',
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random dates within last 30 days
    }));
    localStorage.setItem('rupal_posts', JSON.stringify(postsWithIds));
  }
};

