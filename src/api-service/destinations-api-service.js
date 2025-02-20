import { Route } from '../api.js';
import ApiService from '../framework/api-service.js';


export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({ route: Route.DESTINATIONS }).then(ApiService.parseResponse);
  }
}
