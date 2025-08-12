export interface Expedition {
  id: string;
  name: string;
  altitude: string;
  duration: string;
  difficulty: string;
  bestTime: string;
  shortDescription: string;
  details: string;
  itinerary: Array<{
    day: string;
    description: string;
  }>;
  dailyWalking?: string;
  grade?: string;
  maxAltitude?: string;
}

export const expeditions: Expedition[] = [
  {
    id: "nanga-parbat-peak",
    name: "Nanga Parbat (8126m) Peak Expedition",
    altitude: "8,126m",
    duration: "47 Days",
    difficulty: "Extreme",
    bestTime: "June - September",
    shortDescription: "Conquer the ninth highest mountain in the world, the legendary 'Killer Mountain' of the western Himalayas.",
    details: `Nanga Parbat (literally in Sanskrit: Naked Mountain; is the ninth highest mountain in the world at 8,126 meters (26,660 ft) above sea level.
    
It is the western anchor of the Himalayas around which the Indus river skirts into the plains of Pakistan. It is located in the disputed region of Kashmir with India and in Gilgit-Baltistan autonomous region of Pakistan and is locally known as 'Deo Mir' 'Deo' meaning 'huge') ('mir' meaning 'mountain').

Nanga Parbat is one of the eight-thousanders, with a summit elevation of 8,126 meters (26,660 ft). An immense, dramatic peak rising far above its surrounding terrain, Nanga Parbat is also a notoriously difficult climb. Numerous mountaineering deaths in the mid and early 20th century lent it the nickname "killer mountain".

Climbing attempts started very early on Nanga Parbat. In 1895 Albert F. Mummery led an expedition to the peak and reached almost 6,100 m (20,000 ft) on the Diamir (West) Face, but Mummery and two Gurkha companions later died reconnoitering the Rakhiot Face.

In the 1930s, Nanga Parbat became the focus of German interest in the Himalayas. The German mountaineers were unable to attempt Mount Everest, as only the British had access to Tibet. Initially, German efforts focused on Kanchenjunga, to which Paul Bauer led two expeditions in 1930 and 1931, but with its long ridges and steep faces Kanchenjunga was more difficult than Everest and neither expedition made much progress. K2 was known to be harder still, and its remoteness meant that even reaching its base would be a major undertaking. Nanga Parbat was, therefore, the highest mountain accessible to Germans and also deemed possible by climbers at the time.

Nanga Parbat was first climbed, via the Rakhiot Flank (East Ridge), on July 3, 1953, by Austrian climber Hermann Buhl, a member of a German-Austrian team. The expedition was organized by the half-brother of Willy Merkl, Karl Herrligkoffer from Munich, while the expedition leader was Peter Aschenbrenner from Kufstein, who had participated in the 1932 and 1934 attempts. By the time of this expedition, 31 people had already died on the mountain.

The final push for the summit was dramatic: Buhl continued alone for the final 1300 meters after his companions had turned back. Under the influence of the drugs pervitin (based on the stimulant methamphetamine used by soldiers during World War II), padutin, and tea from coca leaves, he reached the summit dangerously late, at 7 p.m., the climbing harder and more time-consuming than he had anticipated. His descent was slowed when he lost a crampon. Caught by darkness, he was forced to bivouac standing upright on a narrow ledge, holding a small handheld with one hand. Exhausted, he dozed occasionally but managed to maintain his balance. He was also very fortunate to have a calm night, so he was not subjected to wind chill. He finally reached his high camp at 7 p.m. the next day, 40 hours after setting out. The ascent was made without oxygen, and Buhl is the only man to have made the first ascent of an 8000 m peak alone.`,
    itinerary: [
      { day: "Day 01", description: "ISLAMABAD: ✈ Arrival at Islamabad." },
      { day: "Day 02", description: "ISLAMABAD: Welcome reception or Briefing at Ministry of Tourism." },
      { day: "Day 03", description: "ISLAMABAD – CHLIAS: Fly to Skardu or drive to Chilas" },
      { day: "Day 04", description: "CHILAS – ZANGOT: Jeep drive + Easy walk." },
      { day: "Day 05", description: "ZANGOT – NANGA PARBAT BC: Trek to Nanga Parbat Base Camp." },
      { day: "Day 06-42", description: "CLIMBING: days reserved for climbing" },
      { day: "Day 43", description: "NANGA PARBAT BC – ZANGOT: Return back to Zangot." },
      { day: "Day 44", description: "ZANGOT – CHILAS: Drive back to Chilas" },
      { day: "Day 45", description: "CHILAS – ISLAMABAD: Drive to Islamabad." },
      { day: "Day 46", description: "ISLAMABAD: Debriefing/Farewell at Ministry of Tourism." },
      { day: "Day 47", description: "FLY BACK: ✈ Embark your international flight." }
    ]
  },
  {
    id: "laila-peak",
    name: "Laila Peak (6096M) Expedition",
    altitude: "6,096m",
    duration: "30 Days",
    difficulty: "Very Difficult",
    bestTime: "June - September",
    shortDescription: "Scale the distinctive spear-like peak in the heart of the Karakoram range.",
    details: `Laila Peak in Hushe Valley near Gondogoro Glacier is in Karakoram range and is 6,096 meters (20,000 ft) high. It has a distinctive spear-like shape. Its northwest face has a slope of 45 degrees in more than 1500 vertical meters.

It has been climbed by Simon Yates among others. According to the local people in Hushe, Laila peak has been climbed only twice, a total of only seven people have submitted.

The height of the Laila peak in Hushe Valley is controversial. Some believe it to be 6200 meters whereas some mention it as 6614 meters. In a Japanese mountaineering map by Tsuneo Miyamori (published in 2003), the height of Laila Peak is mentioned as 6096 meters.

In the summer of 2005, the first ever ski attempts on Laila Peak were made by Fredrik Ericsson and Joren Aamot from Scandinavian countries. Although they could not reach the summit, they skied down the North-West face of the peak. They described it as "one of the most amazing mountains they have ever seen, like a needle it points straight up in the sky".

Frederik and Jörgen reached the base camp of Laila Peak (4150 meters) on June 18, 2005, and they were at Camp1 (5000 meters) on June 22. They made their first attempt to summit on Friday, June 24. They started climbing from 5000 meters at 2:30 am and after seven hours of climbing when they were only 100 meters from the summit, they realized that it was too icy to continue, and started skiing down on the North-West face of Laila Peak towards Gondogoro Glacier.`,
    itinerary: [
      { day: "Day 01", description: "✈ ISLAMABAD: Arrival at Islamabad." },
      { day: "Day 02", description: "ISLAMABAD: Welcome reception or Briefing at Ministry of Tourism." },
      { day: "Day 03", description: "ISLAMABAD – CHLIAS: Fly to Skardu or drive to Chilas" },
      { day: "Day 04", description: "SKARDU OR CHILAS – SKARDU (2500m): Day free at Skardu or drive to Skardu." },
      { day: "Day 05", description: "SKARDU: Preparations (porters hiring & local purchasing)." },
      { day: "Day 06", description: "SKARDU – HUSHE: jeep drive to Hushe" },
      { day: "Day 07", description: "HUSHE – SAITCHO: Trek to Saitcho" },
      { day: "Day 08", description: "SAITCHO – BASE CAMP: Trek to base camp." },
      { day: "Day 09-23", description: "Base Camp: days reserved for climbing Laila peak." },
      { day: "Day 24", description: "BASE CAMP – HUSHE: trek back to Hushe." },
      { day: "Day 26", description: "HUSHE – SKARDU: By jeeps drive to Skardu." },
      { day: "Day 27", description: "SKARDU – CHILAS: Drive to Chilas" },
      { day: "Day 28", description: "CHILAS – ISLAMABAD: Drive to Islamabad." },
      { day: "Day 29", description: "ISLAMABAD: Debriefing/Farewell at Ministry of Tourism." },
      { day: "Day 30", description: "FLY BACK✈: Embark your international flight." }
    ]
  },
  {
    id: "nanga-parbat-mazeno-pass",
    name: "Nanga Parbat & Mazeno Pass Trek",
    altitude: "5,399m",
    duration: "8-14 Days",
    difficulty: "Moderate to Difficult",
    bestTime: "Mid June – September",
    shortDescription: "Experience the southern panorama of Nanga Parbat while crossing the challenging Mazeno Pass.",
    dailyWalking: "5-7 HRS except Longer Days While Crossing Pass",
    grade: "Moderate to Difficult",
    maxAltitude: "5399m",
    details: `Nanga Parbat is the second highest mountain of Pakistan and ninth highest in the world. It is not part of the Karakoram as it is the western extremity of the mighty Himalaya. It is separated from the Karakoram by the mighty Indus River. Since the first disastrous British expedition led by A. F. Mummery in 1895, mountaineers have tried to ascent its summit through different routes but few lucky ones have succeeded.`,
    itinerary: [
      { day: "Day 01", description: "RAWALPINDI – ISLAMABAD: ✈ Arrival at Islamabad International airport and transferred to comfortable centrally located the hotel. A reminder of the day is free for you to relax and recover from the long flight to Pakistan. in the afternoon, for those who desire there will be a tour of Pakistan's capital Islamabad and bustling bazaar of Rawalpindi. In the evening we have a welcome dinner where you will have the opportunity to meet your guide and another member of the group. Overnight stay at the hotel." },
      { day: "Day 02", description: "RAWALPINDI – CHLIAS: (Drive & Hotel). The morning after breakfast drive 11-12 hrs on famous Karakorum Highway. En route we will stop for photography, toilet break and lunch at Chatar or Besham. O/N stay in a hotel." },
      { day: "Day 03", description: "CHLIAS – TARASHING: Drive 6-7 hrs to Tarashing. The Rupal valley is accessed via Astor Valley which turns to the right side at the point of Juglot. O/N stay in camp/hotel." },
      { day: "Day 04", description: "TARASHING – HERILGKOFFER BC: 5-6 hrs trek from Tarashing. Rupal valley is less visited area than Fairy Meadows. A very Narrow jeep road goes up to Rupal Valley. O/N stay in camp." },
      { day: "Day 05", description: "HERILGKOFFER BC – MAZENO BC: 4-5 hrs treks to Mazeno BC. From Herligkoffer BC the trek goes towards Rupal Glacier. On the way, you will see several streams before reaching to camp. O/N stay in camp." },
      { day: "Day 06", description: "MAZENO BC – MAZENO HC: 4-6 hrs trek steeply towards the Mazeno La (5399m). The high camp (4700m) is along the east margin of the glacier, overnight stay in camp." },
      { day: "Day 07", description: "MAZENO HC – LOIBAH MEADOWS: 7-8 hrs trek to Upper Loibah. Ascending towards the top is about 4 hrs and descend from the top to Loibah Meadows is very steep and requires techniques to reach till Upper Loibah Meadows (4200m). O/N stay in camp." }
    ]
  },
  {
    id: "fairy-meadows-base-camp",
    name: "Fairy Meadows & Nanga Parbat Base Camp Trek",
    altitude: "5,245m",
    duration: "8-14 Days",
    difficulty: "Moderate to Difficult",
    bestTime: "Mid May – Mid of October",
    shortDescription: "Explore the mysteries of the Killer Mountain from the north with optional peak climbing.",
    dailyWalking: "3-5 HRS except Longer Days while driving Pass",
    grade: "Moderate to Difficult",
    maxAltitude: "5245m",
    details: `Explore the mysteries of the Killer Mountain from the north and polish your skill climbing either of the spectacular Jilliper Peak North (5245m), south (5206m) and have a close view of the challenging Nanga Parbat (8126m).

Visit memorial of German climbers killed in 1937 and explore around the base camp full of marmots, flowers, and rare mountain views. The approach trek of two days passes through the lush green alpine Fairy Meadows with superb views of the north face of Nanga Parbat. Drive to Gilgit and Hunza valley on famous Karakorum Highway, providing close views of the Karakorum giants, like Rakaposhi (7788m), Diran (7237m) Ultar (7388m), Golden Peak (7027m and many more above 7000m.`,
    itinerary: [
      { day: "Day 01", description: "✈ RAWALPINDI – ISLAMABAD: You will be greeted at airport and transferred to comfortable centrally located hotel. Reminder of the day is free for you to relax and recovered from long flight to Pakistan. In the after noon, for those who desire there will be a tour of Pakistan's capital Islamabad and bustling bazaar of Rawalpindi. In the evening we have a welcome dinner where you will have the opportunity to meet your guide and other member of group. Overnight stay at hotel." },
      { day: "Day 02", description: "RAWALPINDI – CHLIAS: (Drive & Hotel). Morning after break fast drive 11-12 hrs on famous Karakorum Highway. En route we will stop for photography, toilet break and lunch at Chatar or Besham. O/N stay in hotel." },
      { day: "Day 03", description: "CHLIAS – FAIRY MEADOWS: (Drive, trek & Hotel). After Break fast drive by van/coaster to Raikot Bridge about 45 miles south of Gilgit. At Raikot, you will be transferred to jeep for drive till Tato. From Tato we will start our first day trek 3-4 hrs uphill till fairy meadows. O/N Stay in camp/hotel." },
      { day: "Day 04", description: "FAIRY MEADOWS: Rest day/relax day. Now the surrounding affords a great deal of pleasure. True to its name, fairy meadows hold lush green meadows, gushing crystal clear spring water and towering pine trees which generously provide cool shade. About all, the majestic Nanga Parbat – the naked killer mountain stands tall and proud for you to behold. Snore panorama of the pasture, can sit and watch the sky scarping peak Nanga Parbat with having sip of tea/coffee. O/N stay in camp." },
      { day: "Day 05", description: "FAIRY MEADOWS – BEYAL – Nanga Parbat BC – BEYAL CAMP: Full day excursion to the base camp of ninth highest peak in the world Nanga Parbat Base Camp. This is an easy and pleasant three miles walk. At base camp, we will explore nature and as well as memorials of climber who died during climbing. Around latenoon, we will get down to Beyal campsite for accommodation." }
    ]
  },
  {
    id: "rupal-face-shaigiri",
    name: "Nanga Parbat Rupal Face Trek & Shaigiri Peak Climbing",
    altitude: "5,584m",
    duration: "15 Days",
    difficulty: "Moderate to Difficult",
    bestTime: "June - September",
    shortDescription: "Explore the beautiful southern panorama of Nanga Parbat and climb Shaigiri Peak.",
    details: `Explore the beautiful southern panorama of Nanga Parbat. Walking through the scenic Rupal Valley and meeting people in the summer settlements with fresh water, firewood and superb views of the Rupal Face of Nanga Parbat.

Two days walk from the jump-off point at Tarashing, takes you to the beautiful camp of Shaigiri (5584m) provide magnificent views across the valley of Nanga Parbat. Return jeep drive through the narrow Astore gorge is a very interesting and road journey to the beautiful Hunza Valley takes you close to the Karakorum giants like Rakaposhi (7788m), Diran (7237m), unclimbed Ultar (7388m) and many other above 7000 meters.`,
    itinerary: [
      { day: "Day 01", description: "✈ Arrival at Islamabad" },
      { day: "Day 02", description: "Drive to Besham." },
      { day: "Day 03", description: "Drive to Hunza" },
      { day: "Day 04", description: "Day free at Hunza." },
      { day: "Day 05", description: "Drive to Gilgit." },
      { day: "Day 06", description: "Jeep drive to Tarashing" },
      { day: "Day 07", description: "Cross Bahzin Glacier to Shaigiri Base Camp." },
      { day: "Day 08-10", description: "Day free to explore and climbing of Shaigiri Peak (5584m)." },
      { day: "Day 11", description: "Return Drive to Chilas" },
      { day: "Day 12", description: "Drive to Naran via Babussar Pass" },
      { day: "Day 13", description: "Day free at Naran." },
      { day: "Day 14", description: "Drive to Islamabad" },
      { day: "Day 15", description: "✈ Fly to home." }
    ]
  }
];