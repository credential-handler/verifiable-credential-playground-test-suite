/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {
  shouldBeValidVerification,
  shouldBeVerifiedVP,
  shouldReturnResult,
  shouldThrowInvalidInput
} from './assertions.js';
import configs from '../configs/index.cjs';
import {createPresentationRequestBody} from './mock.data.js';
import {Verifier} from '../lib/verifier.js';

describe('Verify Presentation - Data Integrity', function() {
  for(const [name, config] of Object.entries(configs)) {
    const verifier = new Verifier({config: config.verifier});
    describe(`Verifier: ${name}`, function() {
      it(`MUST verify a Verifiable Presentation where the presentation's holder
          and the credential's subject are different.`,
      async function() {
        const body = createPresentationRequestBody('vp-different');
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it(`MUST verify a Verifiable Presentation where the presentation's holder
          and the credential's subject are the same.`,
      async function() {
        const body = createPresentationRequestBody('vp-same');
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it(`MUST adhere to the proof verification format.`, async function() {
        const body = createPresentationRequestBody('vp-same');
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
        const body = createPresentationRequestBody('vp-same');
        delete body.verifiablePresentation;
        const {result, error} = await verifier.post({
          json: body
        });
        shouldThrowInvalidInput({result, error});
      });
      it(`MUST return a 400 response status code when the request fails
          verification.`, async function() {
        const body = createPresentationRequestBody('vp-same');
        body.verifiablePresentation.proof.proofValue = 'badSignatureValue';
        const {result, error} = await verifier.post({
          json: body
        });
        shouldThrowInvalidInput({result, error});
      });
      it(`MUST support the verification of a Data Integrity proof of type
          "Ed25519Signature2020".`, async function() {
        const body = createPresentationRequestBody('vp-same');
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it(`MUST support the verification of a Data Integrity proof of type
          "eddsa-2022".`, async function() {
        const body = createPresentationRequestBody('vp-eddsa-2022');
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
      it(`MUST support the verification of a Data Integrity proof of type
          "ecdsa-2019".`, async function() {
        const body = createPresentationRequestBody('vp-ecdsa-2019');
        const {result, data: verification, error} = await verifier.post({
          json: body
        });
        shouldReturnResult({result, error});
        result.status.should.equal(200, 'Expected statusCode 200.');
        shouldBeVerifiedVP({verification});
      });
    });
  }
});
