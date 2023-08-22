export const siteConfig = {
  name: "oppa",
  header: {
    long: "oppaplay",
    medium: "oppa",
    short: "ob",
  },
  url: process.env.NEXT_PUBLIC_APP_URL,
  ogImage: "/og.jpg",
  keywords: [
    "Casino",
    "Multiplayer Games",
    "Fast Payouts",
  ],
  description:
    "Bet4k",
  links: {
    twitter: "https://twitter.com/bet4k",
    github: "https://github.com/bet4k",
  },
}

export type SiteConfig = typeof siteConfig

export const vipLevels = [
  {
    vip_id: "0",
    vip_rank: "Fresh Resident",
    vip_points: 0,
    vip_img: "/assets/bonus/vip-0.png",
    vip_short_desc: "Loyalty Rank you start at as newly registered player.",
    vip_freespins: false,
  },
  {
    vip_id: "1",
    vip_rank: "Rock Climber",
    vip_points: 500,
    vip_img: "/assets/bonus/vip-1.png",
    vip_short_desc: "Receive free spins and gain access to use Loyalty promocodes.",
    vip_freespins: 10,
    vip_freespins_slot: [
      "/thumb/s3/softswiss/PennyPelican.png",
      "Penny Pelican Tucan",
      "BGaming",
      "softswiss/PennyPelican",
    ],
  },
  {
    vip_id: "2",
    vip_rank: "All-Star",
    vip_points: 2500,
    vip_img: "/assets/bonus/vip-2.png",
    vip_short_desc: "Receive free spins and a cash gift.",
    vip_freespins: 25,
    vip_freespins_slot: [
      "/thumb/s3/softswiss/PennyPelican.png",
      "Penny Pelican Tucan",
      "BGaming",
      "softswiss/PennyPelican",
    ],
  },
  {
    vip_id: "3",
    vip_rank: "Magic Dust",
    vip_points: 10000,
    vip_img: "/assets/bonus/vip-3.png",
    vip_short_desc: "Receive free spins, cash gift and dedicated VIP host.",
    vip_freespins: 50,
    vip_freespins_slot: [
      "/thumb/s3/softswiss/PennyPelican.png",
      "Penny Pelican Tucan",
      "BGaming",
      "softswiss/PennyPelican",
    ],
  },
  {
    vip_id: "4",
    vip_rank: "Loco Malonie",
    vip_points: 50000,
    vip_img: "/assets/bonus/vip-4.png",
    vip_short_desc: "Get a personal handshake or sneeze from a Malone IRL.",
    vip_freespins: 200,
    vip_freespins_slot: [
      "/thumb/s3/softswiss/PennyPelican.png",
      "Penny Pelican Tucan",
      "BGaming",
      "softswiss/PennyPelican",
    ],
  },
  {
    vip_id: "5",
    vip_rank: "Big Tucan",
    vip_points: 200000,
    vip_img: "/assets/bonus/vip-5.png",
    vip_short_desc: "Full expenses covered hotel for 1 night, in any hotel within Europe (of choice), including the Tucan starting pack: cigs, drone, water pistol, strepsil, headphones, barometer",
    vip_freespins: 400,
    vip_freespins_slot: [
      "/thumb/s3/softswiss/WildCash.png",
      "Wild Cash",
      "BGaming",
      "softswiss/WildCash",
    ],
  },
]




export type VipLevels = typeof vipLevels

export const gameRows = [
  {
    gameKey: "popular",
    header: "Popular Games",
    imageType: "s3",
    subHeader: "Our most popular games.",
  },
  {
    gameKey: "new",
    header: "New Games",
    imageType: "s3",
    subHeader: "Our newest games.",
  },
  {
    gameKey: "provider_amatic",
    header: "Amatic",
    imageType: "s3",
    subHeader: "Gaping hole.",
  },
  {
    gameKey: "provider_novomatic",
    header: "Novomatic",
    imageType: "s3",
    subHeader: "Anthony Novak's favorites.",
  },
  {
    gameKey: "provider_pragmatic",
    header: "Pragmatic Play",
    imageType: "s3",
    subHeader: "Play some Pragmatic Play.",
  },
  {
    gameKey: "provider_wazdan",
    header: "Wazdan",
    imageType: "s3",
    subHeader: "Wazzup Dan.",
  },
  {
    gameKey: "provider_netent",
    header: "Netent",
    imageType: "s3",
    subHeader: "Betent etc.",
  },
  {
    gameKey: "provider_egt",
    header: "EGT",
    imageType: "s3",
    subHeader: "Play the world's worst to appreciate the others.",
  },
  {
    gameKey: "provider_bgaming",
    header: "Bgaming",
    imageType: "s3",
    subHeader: "Some of Bgaming's best bangers.",
  },
]

export type GameRows = typeof gameRows