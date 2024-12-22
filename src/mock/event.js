import {
  getRandomElementFromArray,
  getRandomNumberFromMinToMax,
  getRandomDate,
} from '../utils.js';

import { TYPES } from '../const.js';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '4b56e8bd-376d-47ea-8896-d1a272176d57',
        title: 'Upgrade to a business class',
        price: 177
      },
      {
        id: '680586b0-b676-4c8e-83c0-75875f25c567',
        title: 'Choose the radio station',
        price: 82
      },
      {
        id: '19d8166b-7eb7-40dd-9a88-ed8900edb666',
        title: 'Choose temperature',
        price: 128
      },
      {
        id: 'b2d8a850-ac27-4723-93b4-2687de1b9076',
        title: 'Drive quickly, I\'m in a hurry',
        price: 130
      },
      {
        id: 'd5fb834d-ad65-43ea-b23e-3e0014e5ca15',
        title: 'Drive slowly',
        price: 101
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '0d178c55-71a7-475a-ba44-d55693979940',
        title: 'Infotainment system',
        price: 83
      },
      {
        id: '3c4ce66e-ec56-4177-9511-f76ad9c1f09d',
        title: 'Order meal',
        price: 80
      },
      {
        id: 'ef26709e-75f1-4f48-89db-82d4fd8f5b11',
        title: 'Choose seats',
        price: 123
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'e71be41b-1bd7-42c0-9b86-7737ca95f2d6',
        title: 'Book a taxi at the arrival point',
        price: 40
      },
      {
        id: '614602b8-a42f-4ea7-87c2-85a138740953',
        title: 'Order a breakfast',
        price: 37
      },
      {
        id: '6f35e91a-1bc8-4b46-a50d-26d744612983',
        title: 'Wake up at a certain time',
        price: 180
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'ea32b3d3-5e85-4d0c-b6eb-8a9115745c79',
        title: 'Choose meal',
        price: 88
      },
      {
        id: 'a7b3183b-7ab1-4554-85bc-f05282adc53a',
        title: 'Choose seats',
        price: 195
      },
      {
        id: 'b955f72b-adeb-4c2e-a481-ad5a96daacf5',
        title: 'Upgrade to comfort class',
        price: 37
      },
      {
        id: '7a52475e-5603-4490-9dc2-03da79c15f51',
        title: 'Upgrade to business class',
        price: 169
      },
      {
        id: '486be9a2-5712-4a32-a556-41267a5709a6',
        title: 'Add luggage',
        price: 30
      },
      {
        id: '083e760c-7738-4d04-9c8b-c088f8b991ce',
        title: 'Business lounge',
        price: 114
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'aa1679c1-7bb7-4d40-83e1-7513eaa820b1',
        title: 'Choose the time of check-in',
        price: 76
      },
      {
        id: '695f0e62-bef2-42b8-aace-e646769f4094',
        title: 'Choose the time of check-out',
        price: 126
      },
      {
        id: 'eb3f92e5-9e65-4aec-ac87-0ba67e18bfb7',
        title: 'Add breakfast',
        price: 156
      },
      {
        id: '4e473640-3d8c-47e7-8aa6-ac47e6d3a2dc',
        title: 'Laundry',
        price: 171
      },
      {
        id: '9a3f616d-2370-40ec-bde3-a9b447ab9929',
        title: 'Order a meal from the restaurant',
        price: 125
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'ship',
    offers: [
      {
        id: '8903cd61-2e69-4cdd-ac41-3de7ea1e98f9',
        title: 'Choose meal',
        price: 35
      },
      {
        id: '5c0c4efc-3dc9-4110-ba83-0e8fce3ee017',
        title: 'Choose seats',
        price: 66
      },
      {
        id: '6e55a591-7e25-4587-ba96-ac98546fdc24',
        title: 'Upgrade to comfort class',
        price: 173
      },
      {
        id: 'a67f902a-e1aa-4dc6-8c17-a41f453d30a6',
        title: 'Upgrade to business class',
        price: 93
      },
      {
        id: 'b9ef62ea-68ef-47aa-9fe9-981a42f55872',
        title: 'Add luggage',
        price: 117
      },
      {
        id: 'bfd24eca-d799-4d49-a6e9-5a137dad62d9',
        title: 'Business lounge',
        price: 199
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'ef87eeec-ef33-4c7a-9f4c-cf5a4c146d16',
        title: 'With automatic transmission',
        price: 159
      },
      {
        id: '1d29c8cd-2fd4-4f8e-8dde-6839ae915ec0',
        title: 'With air conditioning',
        price: 78
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '3710a6b0-7eee-4aff-8dfd-c633d7b76b59',
        title: 'Choose live music',
        price: 123
      },
      {
        id: 'fdcccf78-a35f-426a-9573-dfd18af8bc67',
        title: 'Choose VIP area',
        price: 186
      }
    ]
  }
];

const mockDestination = [
  {
    description: 'Monaco - for those who value comfort and coziness',
    name: 'Monaco',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Monaco with crowded streets'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Monaco a perfect place to stay with a family'
      }
    ]
  },
  {
    id: '60e3fbc9-c3d9-4fdc-af59-af383a2582ec',
    description: 'Berlin - for those who value comfort and coziness',
    name: 'Berlin',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Berlin for those who value comfort and coziness'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        description: 'Berlin a perfect place to stay with a family'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/15.jpg',
        description: 'Berlin with an embankment of a mighty river as a centre of attraction'
      }
    ]
  },
  {
    id: 'e10f37a4-d0de-4c79-940c-eb946d4a8233',
    description: 'Helsinki - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Helsinki',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/17.jpg',
        description: 'Helsinki full of of cozy canteens where you can try the best coffee in the Middle East'
      }
    ]
  }
];


const mockEvents = [
  {
    type: TYPES[0],
    basePrice: getRandomNumberFromMinToMax(1000, 5000),
    dateFrom: getRandomDate(new Date(2024, 0, 1), new Date(2024, 0, 2)),
    dateTo: getRandomDate(new Date(2024, 0, 3), new Date(2024, 0, 4)),
    destination: mockDestination[0],
    isFavorite: false,
    offers: mockOffers[0].offers,
  },
  {
    type: TYPES[1],
    basePrice: getRandomNumberFromMinToMax(1000, 5000),
    dateFrom: getRandomDate(new Date(2024, 0, 3), new Date(2024, 0, 4)),
    dateTo: getRandomDate(new Date(2024, 0, 3), new Date(2024, 0, 4)),
    destination: mockDestination[1],
    isFavorite: true,
    offers: mockOffers[1].offers,
  },
  {
    type: TYPES[2],
    basePrice: getRandomNumberFromMinToMax(1000, 5000),
    dateFrom: getRandomDate(new Date(2024, 0, 5), new Date(2024, 0, 6)),
    dateTo: getRandomDate(new Date(2024, 0, 3), new Date(2024, 0, 4)),
    destination: mockDestination[2],
    isFavorite: false,
    offers: mockOffers[2].offers,
  }
];


const getRandomEvent = () => getRandomElementFromArray(mockEvents);


export { getRandomEvent };
