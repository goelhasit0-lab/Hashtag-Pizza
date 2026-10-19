export interface RestaurantConfig {
  name: string;
  tagline: string;
  establishedYear: number;
  address: {
    complex: string;
    street: string;
    area: string;
    city: string;
    country: string;
    fullAddress: string;
  };
  phones: {
    primary: string;
    secondary: string;
    landline: string;
  };
  whatsapp: {
    number: string; // e.g. "9779861370721"
    display: string;
  };
  social: {
    facebookUrl: string;
    instagramUrl: string;
  };
  wifi: {
    networkName: string;
    printedPasswordNotice: string;
    passwordValue?: string;
  };
  reviewUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  plusCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const restaurantInfo: RestaurantConfig = {
  name: 'Hashtag Pizza',
  tagline: 'GOOD FOOD. GREAT MOOD.',
  establishedYear: 2022,
  address: {
    complex: 'RB Complex',
    street: 'Loharpati',
    area: 'Adarshnagar',
    city: 'Birgunj',
    country: 'Nepal',
    fullAddress: 'RB Complex, Loharpati, Adarshnagar, Birgunj, Nepal',
  },
  phones: {
    primary: '9861370721',
    secondary: '9828203930',
    landline: '051-591718',
  },
  whatsapp: {
    number: '9779861370721',
    display: '+977 9861370721',
  },
  social: {
    facebookUrl: 'https://www.facebook.com/search/top?q=Hashtag%20Pizza%20Birgunj',
    instagramUrl: 'https://www.instagram.com/explore/tags/hashtagpizzanepal/',
  },
  wifi: {
    networkName: 'Hashtag_Pizza_Guest',
    printedPasswordNotice: 'As printed on the in-store menu poster / Available to customers in dining area',
    passwordValue: 'hashtagpizza2022',
  },
  reviewUrl: 'https://www.google.com/maps/place/Hashtag+Pizza/@27.0101381,84.8761108,19z/data=!4m8!3m7!1s0x399355887845cf75:0x541e32f7a1c31907!8m2!3d27.0101381!4d84.8761108!9m1!1b1',
  googleMapsUrl: 'https://www.google.com/maps/place/Hashtag+Pizza/@27.0103207,84.8757971,19.78z/data=!4m14!1m7!3m6!1s0x39935446b21c98cb:0xc5b321fcbc6465a5!2s2V6G%2B498,+Birgunj,+Madhesh+Province,+Nepal!3b1!8m2!3d27.0102875!4d84.8759531!3m5!1s0x399355887845cf75:0x541e32f7a1c31907!8m2!3d27.0101381!4d84.8761108!16s%2Fg%2F11pkrwn80g',
  googleMapsEmbedQuery: 'Hashtag+Pizza+27.0101381,84.8761108',
  plusCode: '2V6G+498, Birgunj, Madhesh Province 44300, Nepal',
  coordinates: {
    lat: 27.0101381,
    lng: 84.8761108,
  },
};
