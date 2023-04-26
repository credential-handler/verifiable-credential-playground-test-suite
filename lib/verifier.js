/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {makeHttpsRequest, zcapRequest} from './requests.js';

/**
 * Provides common functionality between verifer backends for working with the
 * vc-api.
 *
 * @param {object} options - Options to use.
 * @param {object} options.config - Configuration for the backend.
 */
export class Verifier {
  constructor({config}) {
    this.config = config;
  }
  post({json, headers = {}, searchParams, url}) {
    const {headers: _headers = {}, endpoint, oauth2, zcap} = this.config;
    if(zcap) {
      return zcapRequest({
        endpoint: url || endpoint,
        zcap,
        json,
        headers
      });
    }
    return makeHttpsRequest({
      url: url || endpoint,
      method: 'POST',
      json,
      oauth2,
      searchParams,
      headers: {..._headers, ...headers}
    });
  }
  getVerifierId() {
    return this.config?.id ?? '';
  }
}
