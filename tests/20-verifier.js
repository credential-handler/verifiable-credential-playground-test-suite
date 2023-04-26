/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
import configs from '../configs/index.cjs';
import {Verifier} from '../lib/verifier.js';
const should = chai.should();

describe('Verify Presentation - Data Integrity', function() {
  for(const [name, config] of Object.entries(configs)) {
    const verifier = new Verifier({config: config.verifier});
    describe(`Verifier: ${name}`, function() {
      it(`MUST verify a Verifiable Presentation where the credential's issuer,
          presentation's holder and credential's subject are all different.`,
      async function() {
        should.equal(true, false);
      });
      it(`MUST verify a Verifiable Presentation where the credential's issuer
          and presentation's holder are the same while the credential's subject
          is different.`, async function() {
        should.equal(true, false);
      });
      it(`MUST verify a Verifiable Presentation where the credential's issuer
          and presentation's holder are the same while the credential's subject
          is different.`, async function() {
        should.equal(true, false);
      });
      it(`MUST verify a Verifiable Presentation where the presentation's holder,
          credential's subject and issuer are all different.`,
      async function() {
        should.equal(true, false);
      });
      it(`MUST verify a Verifiable Presentation where the presentation's holder,
          credential's subject and issuer are all the same.`,
      async function() {
        should.equal(true, false);
      });
      it(`MUST adhere to the proof verification format.`, async function() {
        should.equal(true, false);
      });
      it(`MUST return a 400 response status code when the request is rejected
          with bad input.`,
      async function() {
        should.equal(true, false);
      });
      it(`MUST return a 400 response status code when the request fails
          verification.`, async function() {
        should.equal(true, false);
      });
      it(`MUST support the verification of a Data Integrity proof of type
          "Ed25519Signature2020".`, async function() {
        should.equal(true, false);
      });
      it(`MUST support the verification of a Data Integrity proof of type
          "eddsa-2022".`, async function() {
        should.equal(true, false);
      });
      it(`MUST support the verification of a Data Integrity proof of type
          "ecdsa-2019".`, async function() {
        should.equal(true, false);
      });
    });
  }
});
