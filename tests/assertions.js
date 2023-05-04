/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';

const should = chai.should();

export function shouldThrowInvalidInput({result, error}) {
  should.not.exist(result, 'Expected no result from issuer/verifier.');
  should.exist(error, 'Expected issuer/verifier to Error.');
  should.exist(error.status, 'Expected an HTTP error response code.');
  error.status.should.not.equal(401,
    'Should not get an Authorization Error.');
  error.status.should.equal(400,
    'Expected status code 400 invalid input!');
}

export function shouldReturnResult({result, error}) {
  if(error) {
    console.error(JSON.stringify(error.data));
    should.not.exist(error, `Expected no error, got ${error.message}}`);
  }
  should.exist(result, 'Expected a result');
}

export function shouldBeIssuedVc({issuedVc}) {
  issuedVc.should.be.an(
    'object',
    'Expected the issued Verifiable Credential to be an object.'
  );
  issuedVc.should.have.property('@context');
  issuedVc.should.have.property('type');
  issuedVc.type.should.contain(
    'VerifiableCredential',
    'Expected `type` to contain "VerifiableCredential".'
  );
  issuedVc.should.have.property('id');
  issuedVc.id.should.be.a(
    'string',
    'Expected `id` to be a string.'
  );
  issuedVc.should.have.property('credentialSubject');
  _shouldBeValidCredentialSubject(
    {credentialSubject: issuedVc.credentialSubject});
  issuedVc.should.have.property('issuer');
  const issuerType = typeof(issuedVc.issuer);
  issuerType.should.be.oneOf(
    ['string', 'object'],
    'Expected `issuer` to be a string or an object.'
  );
  issuedVc.should.have.property('proof');
  issuedVc.proof.should.be.an(
    'object',
    'Expected `proof` to be an object.'
  );
  if(issuerType === 'object') {
    should.exist(issuedVc.issuer.id,
      'Expected issuer object to have property id');
  }
}

function _shouldBeValidCredentialSubject({credentialSubject}) {
  // credentialSubject should not be null or undefined
  should.exist(credentialSubject, 'Expected credentialSubject to exist.');
  // if only one claim is being made just check it
  if(!Array.isArray(credentialSubject)) {
    return _shouldHaveClaims({subject: credentialSubject});
  }
  // a credentialSubject can be an Array of objects
  credentialSubject.length.should.be.gt(
    0,
    'Expected credentialSubject to make a claim on at least one subject.'
  );
  for(const subject of credentialSubject) {
    _shouldHaveClaims({subject});
  }
}

function _shouldHaveClaims({subject}) {
  subject.should.be.an(
    'object',
    'Expected credentialSubject to be an object.'
  );
  Object.keys(subject).length.should.be.gt(
    0,
    'Expected credentialSubject to have at least one claim.'
  );
}

export function shouldBeValidVerification({verification}) {
  verification.should.be.an(
    'object',
    'Expected the verification result to be an object.'
  );
  verification.should.have.property('presentationResult');
  verification.presentationResult.should.have.property('verified');
  verification.should.have.property('checks');
  verification.should.have.property('credentialResults');
  verification.credentialResults.should.be.a(
    'array',
    'Expected `credentialResults` to be an array.'
  );
  verification.credentialResults.forEach(c => {
    c.should.be.a(
      'object',
      'Expected `credentialResults` items to be objects.'
    );
    c.should.have.property('verified');
  });
}

export function shouldBeVerifiedVP({verification}) {
  shouldBeValidVerification({verification});
  verification.should.have.property('verified');
  verification.verified.should.equal(
    true,
    'Expected `verified` to be true.'
  );
  verification.presentationResult.verified.should.equal(
    true,
    'Expected `presentationResult.verified` to be true.'
  );
  verification.checks.should.contain(
    'proof',
    'Expected `checks` to contain "proof".'
  );
  verification.credentialResults.forEach(c => {
    c.verified.should.equal(
      true,
      'Expected credentialResults `verified` to be true'
    );
  });
}
