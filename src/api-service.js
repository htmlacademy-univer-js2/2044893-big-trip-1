const Method = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
  };
  
  export default class ApiService {
    #endPoint = null;
    #authorization = null;
  
    constructor(endPoint, authorization) {
      this.#endPoint = endPoint;
      this.#authorization = authorization;
    }
  
    get points() {
      return this.#load({url: 'points'})
        .then(ApiService.parseResponse);
    }
  
    get offers() {
      return this.#load({url: 'offers'})
        .then(ApiService.parseResponse);
    }
  
    get destinations() {
      return this.#load({url: 'destinations'})
        .then(ApiService.parseResponse);
    }
  
    updatePoint = async (point) => {
      const response = await this.#load({
        url: `points/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(this.#adaptToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'}),
      });
  
      return await ApiService.parseResponse(response);
    }
  
    addPoint = async (point) => {
      const response = await this.#load({
        url: 'points',
        method: Method.POST,
        body: JSON.stringify(this.#adaptToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'}),
      });

      return await ApiService.parseResponse(response);
    }
  
    deletePoint = async (point) => {
      const response = await this.#load({
        url: `points/${point.id}`,
        method: Method.DELETE,
      });
  
      return response;
    }
  
    #load = async ({
      url,
      method = Method.GET,
      body = null,
      headers = new Headers(),
    }) => {
      headers.append('Authorization', this.#authorization);
  
      const response = await fetch(
        `${this.#endPoint}/${url}`,
        {method, body, headers},
      );
  
      try {
        ApiService.checkStatus(response);
        return response;
      } catch (err) {
        ApiService.catchError(err);
      }
    }
  
    #adaptToServer = (point) => {
      const adaptedPoint = {...point,
        'cost': point.cost,
        'date_from': point.dateFrom,
        'date_to': point.dateTo,
        'is_favorite': point.isFavorite,
      };
  
      delete adaptedPoint.cost;
      delete adaptedPoint.dateFrom;
      delete adaptedPoint.dateTo;
      delete adaptedPoint.isFavorite;
  
      return adaptedPoint;
    }
  
    static parseResponse = (response) => response.json();
  
    static checkStatus = (response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }
  
    static catchError = (err) => {
      throw err;
    }
  }
  