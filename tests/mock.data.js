/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import {createRequire} from 'node:module';
import {klona} from 'klona';
import {nanoid} from 'nanoid';
const require = createRequire(import.meta.url);
const validVc = require('./credential.json');

// copies a validVc and adds an id.
export const createRequestBody = ({issuer, vc = validVc}) => {
  const id = issuer.getIssuerId();
  const credential = klona(vc);
  // convert from millisecond to seconds precision
  credential.issuanceDate = createISOTimeStamp();
  credential.id = `urn:uuid:${nanoid()}`;
  credential.issuer = id;
  return {credential};
};

/**
 * Creates an ISO TimeStamp seconds precision.
 *
 * @param {number} [timeMs = Date.now()] - Milliseconds since epoch.
 *
 * @returns {string} An ISO Time Stamp.
 */
export function createISOTimeStamp(timeMs = Date.now()) {
  return new Date(timeMs).toISOString().replace(/\.\d+Z$/, 'Z');
}
