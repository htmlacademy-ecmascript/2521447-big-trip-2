import { getRandomElementFromArray } from '../utils.js';


const points = [
  {
    'id': '5270ace2-fba1-40fb-aa64-b31f829bad0c',
    'basePrice': 8581,
    'dateFrom': '2024-11-14T19:13:11.060Z',
    'dateTo': '2024-12-16T01:45:11.060Z',
    'destination': 'c8eab9ce-c072-4114-9412-76f8023ba638',
    'isFavorite': false,
    'offers': [
      '1e7ab78b-3faa-48b3-aab7-266373f30cde'
    ],
    'type': 'taxi'
  },
  {
    'id': 'd3e97e36-688d-40b0-8a08-5a440b369845',
    'basePrice': 1120,
    'dateFrom': '2024-12-18T01:25:11.060Z',
    'dateTo': '2024-12-19T16:44:11.060Z',
    'destination': '7d2cc347-4428-45cb-b406-ef07ed787acc',
    'isFavorite': false,
    'offers': [
      '1e7ab78b-3faa-48b3-aab7-266373f30cde'
    ],
    'type': 'taxi'
  },
  {
    'id': '73afb53e-2c93-460b-b301-5f0291ca85d2',
    'basePrice': 3339,
    'dateFrom': '2024-12-21T11:35:11.060Z',
    'dateTo': '2024-12-22T05:23:11.060Z',
    'destination': '9bbe4200-020c-4f3c-9640-81648421f209',
    'isFavorite': true,
    'offers': [
      '7f58bdd5-9809-4722-83c2-bcaa9e092e54',
      '8309542d-7494-4299-a93c-32a2b4c982c2',
      'f0d18307-8693-4c1a-b25b-043b3c1b9ed1',
      'f9e6902f-48b3-4f5b-9755-2cf03531e149'
    ],
    'type': 'ship'
  },
  {
    'id': 'bc6d365a-7ff3-41f6-a2b7-ce03f40cb32f',
    'basePrice': 9946,
    'dateFrom': '2024-10-23T10:58:11.060Z',
    'dateTo': '2024-12-24T09:13:11.060Z',
    'destination': '97ba1bc6-b161-4015-b0a5-e1f31a3b972d',
    'isFavorite': true,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': 'c4a6bfb9-738c-4ff3-a678-5dd8e97eadea',
    'basePrice': 2632,
    'dateFrom': '2024-12-21T16:40:11.060Z',
    'dateTo': '2024-12-25T20:17:11.060Z',
    'destination': '124c439f-1764-4bd2-917e-50973a77f227',
    'isFavorite': true,
    'offers': [
      'f9cba921-201c-46e3-9f9c-181669310fc7',
      '266854a6-32ce-43c2-afad-25fa2d1cff1f'
    ],
    'type': 'restaurant'
  },
  {
    'id': '80800bd0-6c2a-4b04-b5da-ddd5555d3e08',
    'basePrice': 9375,
    'dateFrom': '2024-12-21T14:02:11.060Z',
    'dateTo': '2024-12-27T18:52:11.060Z',
    'destination': '124c439f-1764-4bd2-917e-50973a77f227',
    'isFavorite': true,
    'offers': [],
    'type': 'train'
  },
  {
    'id': 'e41a8867-7a91-4adb-912c-4b69abd4e2fb',
    'basePrice': 8216,
    'dateFrom': '2024-12-20T11:46:11.060Z',
    'dateTo': '2024-12-29T01:40:11.060Z',
    'destination': '21a059e3-af4a-4881-a3cc-40a381484c44',
    'isFavorite': false,
    'offers': [
      'df563b88-4847-4a3c-ac72-e28a01d65345',
      'df51a087-0baf-4b2b-8cd2-0d3da21acc53',
      '1e7ab78b-3faa-48b3-aab7-266373f30cde'
    ],
    'type': 'taxi'
  },
  {
    'id': 'd615183c-3c37-496d-b01a-d8dcc35a200d',
    'basePrice': 7099,
    'dateFrom': '2024-12-23T12:03:11.060Z',
    'dateTo': '2024-12-30T06:27:11.060Z',
    'destination': 'c8eab9ce-c072-4114-9412-76f8023ba638',
    'isFavorite': true,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': 'fadad7ed-b03d-47c0-9639-501e0d8df8df',
    'basePrice': 7453,
    'dateFrom': '2024-11-30T14:34:11.060Z',
    'dateTo': '2024-12-31T05:45:11.060Z',
    'destination': '53b6b366-1de8-447a-93ae-e71dc7d59aa7',
    'isFavorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'db8cce34-d120-470f-b045-154aff3c5e61',
    'basePrice': 7777,
    'dateFrom': '2024-12-31T20:52:11.060Z',
    'dateTo': '2025-01-02T09:09:11.060Z',
    'destination': '7d2cc347-4428-45cb-b406-ef07ed787acc',
    'isFavorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '4ac1ffac-78ee-4619-9db6-a0b593c196c8',
    'basePrice': 5293,
    'dateFrom': '2025-01-02T06:19:11.060Z',
    'dateTo': '2025-01-03T14:36:11.060Z',
    'destination': '53b6b366-1de8-447a-93ae-e71dc7d59aa7',
    'isFavorite': false,
    'offers': [
      'c2ae2b1c-afc4-43be-8163-f88ed2cd1137',
      'cae3afff-8cb2-4490-b611-a0c25baac039'
    ],
    'type': 'drive'
  },
  {
    'id': 'dfbddd29-2b28-4c84-b767-6911d98d5d3d',
    'basePrice': 9581,
    'dateFrom': '2025-01-04T07:52:11.060Z',
    'dateTo': '2025-01-05T01:21:11.060Z',
    'destination': 'c8eab9ce-c072-4114-9412-76f8023ba638',
    'isFavorite': false,
    'offers': [
      '8309542d-7494-4299-a93c-32a2b4c982c2',
      'f0d18307-8693-4c1a-b25b-043b3c1b9ed1',
      'f9e6902f-48b3-4f5b-9755-2cf03531e149'
    ],
    'type': 'ship'
  },
  {
    'id': 'd6709170-e324-41f3-a86b-6cc995bac937',
    'basePrice': 8613,
    'dateFrom': '2025-01-05T20:40:11.060Z',
    'dateTo': '2025-01-07T14:35:11.060Z',
    'destination': '496bf9c6-7644-4068-baa0-8b1577df8854',
    'isFavorite': false,
    'offers': [
      '6a7e124a-0c0f-439d-b6e0-f98633920612'
    ],
    'type': 'train'
  },
  {
    'id': '9a365ed8-1a26-4992-876a-df248a2dd853',
    'basePrice': 9898,
    'dateFrom': '2024-01-08T05:16:11.060Z',
    'dateTo': '2025-01-08T22:20:11.060Z',
    'destination': '2d1ec240-1e78-4183-b27e-7023f2ce9320',
    'isFavorite': false,
    'offers': [
      'df563b88-4847-4a3c-ac72-e28a01d65345',
      'df51a087-0baf-4b2b-8cd2-0d3da21acc53',
      '1e7ab78b-3faa-48b3-aab7-266373f30cde'
    ],
    'type': 'taxi'
  },
  {
    'id': 'a03d20aa-983e-4a0a-874f-5dc949d8347a',
    'basePrice': 6171,
    'dateFrom': '2025-01-09T14:23:11.060Z',
    'dateTo': '2025-01-10T13:29:11.060Z',
    'destination': '496bf9c6-7644-4068-baa0-8b1577df8854',
    'isFavorite': true,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': '7f1e7ba5-1b8d-4813-81df-b61165ff6dc7',
    'basePrice': 9467,
    'dateFrom': '2025-01-11T22:35:11.060Z',
    'dateTo': '2025-01-12T15:33:11.060Z',
    'destination': 'c8eab9ce-c072-4114-9412-76f8023ba638',
    'isFavorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': '237c1a9c-130c-48fa-b64f-f79e2bd7f8fc',
    'basePrice': 761,
    'dateFrom': '2025-01-13T18:04:11.060Z',
    'dateTo': '2025-01-15T14:35:11.060Z',
    'destination': '9bbe4200-020c-4f3c-9640-81648421f209',
    'isFavorite': true,
    'offers': [
      '04f9d7a2-5515-4404-8f46-720eed54bde7',
      '9cfa4298-4ac7-4e98-ab73-adbbc3eba2e2'
    ],
    'type': 'flight'
  },
  {
    'id': 'f69be339-f197-49a0-89ae-d4ee92391387',
    'basePrice': 748,
    'dateFrom': '2025-01-17T04:29:11.060Z',
    'dateTo': '2025-01-18T13:56:11.060Z',
    'destination': '53b6b366-1de8-447a-93ae-e71dc7d59aa7',
    'isFavorite': true,
    'offers': [
      'f671947a-8b29-4c39-99fc-d56adfb34ef5'
    ],
    'type': 'bus'
  },
  {
    'id': '2a728b50-42da-4742-a5e0-99e53d7a4076',
    'basePrice': 6737,
    'dateFrom': '2025-01-19T00:29:11.060Z',
    'dateTo': '2025-01-19T20:50:11.060Z',
    'destination': '9bbe4200-020c-4f3c-9640-81648421f209',
    'isFavorite': false,
    'offers': [
      '319d74a8-a921-4fe0-8af7-9d04025028e6',
      'ebe35193-f40b-4980-8534-d3ccf5bb00a0',
      'c22f8e91-8517-4e7c-bca7-c317eb0427ed',
      'b661a95e-82fe-407c-b3e6-0494959e8270'
    ],
    'type': 'check-in'
  },
  {
    'id': '1723d80e-fd6d-4aba-862e-2e607a653e0a',
    'basePrice': 2088,
    'dateFrom': '2025-01-21T01:54:11.060Z',
    'dateTo': '2025-01-22T13:27:11.060Z',
    'destination': 'c8eab9ce-c072-4114-9412-76f8023ba638',
    'isFavorite': false,
    'offers': [
      '4f826ce7-b60e-4feb-a6a6-5fba9ad65c68',
      'dd5a0d0e-d1ae-4afc-bc8a-a68eb2e4c54b',
      'df563b88-4847-4a3c-ac72-e28a01d65345',
      'df51a087-0baf-4b2b-8cd2-0d3da21acc53',
      '1e7ab78b-3faa-48b3-aab7-266373f30cde'
    ],
    'type': 'taxi'
  },
  {
    'id': '434efe33-5994-4dd0-96e8-889d04b6ced6',
    'basePrice': 2317,
    'dateFrom': '2025-01-24T12:51:11.060Z',
    'dateTo': '2025-01-25T22:33:11.060Z',
    'destination': '496bf9c6-7644-4068-baa0-8b1577df8854',
    'isFavorite': false,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': '36eb6444-8e5d-431b-8162-12cfc55c1334',
    'basePrice': 3593,
    'dateFrom': '2025-01-26T19:09:11.060Z',
    'dateTo': '2025-01-27T19:49:11.060Z',
    'destination': '7d2cc347-4428-45cb-b406-ef07ed787acc',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '42dca210-3e77-4401-8140-0176dfe7606b',
    'basePrice': 748,
    'dateFrom': '2025-01-29T06:54:11.060Z',
    'dateTo': '2025-01-30T11:59:11.060Z',
    'destination': '496bf9c6-7644-4068-baa0-8b1577df8854',
    'isFavorite': true,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': 'f75c7b2c-c858-4c94-aabb-e818a69580f9',
    'basePrice': 7669,
    'dateFrom': '2025-01-31T14:21:11.060Z',
    'dateTo': '2025-02-02T05:12:11.060Z',
    'destination': 'c8eab9ce-c072-4114-9412-76f8023ba638',
    'isFavorite': true,
    'offers': [
      'a679fab7-7434-49e8-8ba3-ba810a5e7724',
      '6a7e124a-0c0f-439d-b6e0-f98633920612'
    ],
    'type': 'train'
  },
  {
    'id': '23427b2e-4417-42ec-a20d-bb2ed32180ba',
    'basePrice': 8686,
    'dateFrom': '2025-02-02T12:04:11.060Z',
    'dateTo': '2025-02-03T10:52:11.060Z',
    'destination': '2d1ec240-1e78-4183-b27e-7023f2ce9320',
    'isFavorite': true,
    'offers': [
      'b661a95e-82fe-407c-b3e6-0494959e8270'
    ],
    'type': 'check-in'
  }
];


const getRandomPoint = () => getRandomElementFromArray(points);

export { getRandomPoint };
