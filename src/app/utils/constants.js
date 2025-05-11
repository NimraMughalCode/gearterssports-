export const CategoryTitle = {
  BOXING: "Boxing",
  MMA: "MMA",
  WRESTLING: "Wrestling",
  KICKBOXING: "Kickboxing",
  JIUJITSU: "Jiu-Jitsu",
  MUAYTHAI: "Muay Thai",
  KARATE: "Karate",
  TAEKWONDO: "Taekwondo",
  JUDO: "Judo",
};

const imageUrl = "https://media.istockphoto.com/id/1250685727/vector/realistic-pairs-of-red-boxing-gloves.jpg?s=612x612&w=0&k=20&c=8_bpUgjGLFEy5WKkRMEaKmdpW9MRQFt6Z7wZ-Fq0MSY=";

export const categories = [
  {
    title: CategoryTitle.BOXING,
    image: imageUrl,
    subcategories: [
      "Training Gloves",
      "Sparring Gloves",
      "Competition Gloves",
      "Bag Gloves",
    ],
  },
  {
    title: CategoryTitle.MMA,
    image: imageUrl,
    subcategories: [
      "Grappling Gloves",
      "Competition Gloves",
      "Hybrid Gloves",
    ],
  },
  {
    title: CategoryTitle.WRESTLING,
    image: imageUrl,
    subcategories: [
      "Wrestling Shoes",
      "Headgear",
      "Singlets",
      "Knee Pads",
    ],
  },
  {
    title: CategoryTitle.KICKBOXING,
    image: imageUrl,
    subcategories: [
      "Kickboxing Gloves",
      "Shin Guards",
      "Shorts",
      "Hand Wraps",
    ],
  },
  {
    title: CategoryTitle.JIUJITSU,
    image: imageUrl,
    subcategories: [
      "Gis",
      "Belts",
      "Rash Guards",
      "Spats",
    ],
  },
  {
    title: CategoryTitle.MUAYTHAI,
    image: imageUrl,
    subcategories: [
      "Muay Thai Shorts",
      "Elbow Pads",
      "Shin Guards",
      "Ankle Supports",
    ],
  },
  {
    title: CategoryTitle.KARATE,
    image: imageUrl,
    subcategories: [
      "Karate Gi",
      "Belts",
      "Gloves",
      "Mouth Guards",
    ],
  },
  {
    title: CategoryTitle.TAEKWONDO,
    image: imageUrl,
    subcategories: [
      "Dobok",
      "Headgear",
      "Chest Protector",
      "Foot Guards",
    ],
  },
  {
    title: CategoryTitle.JUDO,
    image: imageUrl,
    subcategories: [
      "Judo Gi",
      "Belts",
      "Mats",
      "Grip Trainers",
    ],
  },
];
