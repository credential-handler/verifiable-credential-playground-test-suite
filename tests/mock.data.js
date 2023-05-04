/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import {createRequire} from 'node:module';
import {klona} from 'klona';
import {nanoid} from 'nanoid';
const require = createRequire(import.meta.url);
const validVc = require('./credential.json');
const VPs = [
  require('../fixtures/vp-1.json'),
  require('../fixtures/vp-2.json'),
  require('../fixtures/vp-3.json'),
  require('../fixtures/vp-4.json')
];

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

export const createPresentationRequestBody = num => {
  if(VPs.length < num) {
    throw new Error(`VP number must be between 1 and ${VPs.length}`);
  }
  const vp = klona(VPs[num - 1]);
  return {
    verifiablePresentation: vp,
    options: {
      domain: vp.proof.domain,
      challenge: vp.proof.challenge,
      checks: ['proof']
    }
  };
};
