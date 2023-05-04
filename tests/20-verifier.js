/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {
  shouldBeValidVerification,
  shouldBeVerifiedVP,
  shouldReturnResult,
  shouldThrowInvalidInput
} from './assertions.js';
import chai from 'chai';
import configs from '../configs/index.cjs';
import {createPresentationRequestBody} from './mock.data.js';
import {Verifier} from '../lib/verifier.js';
const should = chai.should();

describe('Verify Presentation - Data Integrity', function() {
  for(const [name, config] of Object.entries(configs)) {
    const verifier = new Verifier({config: config.verifier});
    describe(`Verifier: ${name}`, function() {
      it(`1. MUST verify a Verifiable Presentation where the credential's
          issuer, presentation's holder and credential's subject are all
          different.`,
      async function() {
        const body = createPresentationRequestBody(1);
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it.skip(`2. MUST verify a Verifiable Presentation where the credential's issuer
          and presentation's holder are the same while the credential's subject
          is different.`, async function() {
        const body = createPresentationRequestBody(2);
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it.skip(`3. MUST verify a Verifiable Presentation where the presentation's
          holder, and credential's subject are the same while the issuer is
          different.`,
      async function() {
        const body = createPresentationRequestBody(3);
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it.only(`4. MUST verify a Verifiable Presentation where the presentation's
          holder, credential's subject and issuer are all the same.`,
      async function() {
        const body = createPresentationRequestBody(4);
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it(`MUST adhere to the proof verification format.`, async function() {
        const body = createPresentationRequestBody(1);
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeValidVerification({verification});
      });
      it(`MUST return a 400 response status code when the request is rejected
          with bad input.`,
      async function() {
        const body = createPresentationRequestBody();
        delete body.verifiablePresentation;
        const {result, error} = await verifier.post({
          json: body
        });
        shouldThrowInvalidInput({result, error});
      });
      it(`MUST return a 400 response status code when the request fails
          verification.`, async function() {
        const body = createPresentationRequestBody();
        body.verifiablePresentation.proof.jws = 'badSignatureValue';
        const {result, error} = await verifier.post({
          json: body
        });
        shouldThrowInvalidInput({result, error});
      });
      it(`MUST support the verification of a Data Integrity proof of type
          "Ed25519Signature2020".`, async function() {
        const body = createPresentationRequestBody();
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
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
