# chapi-playground-test-suite

Test Suite for implementers of the VC-API that would like to integrate into the
CHAPI Playground.

## Table of Contents

- [Background](#background)
- [Usage](#usage)
- [Implementation](#implementation)
- [Community Participation](#community-participation)

## Background

This is a test suite for the VC-API that allows implementers looking to
integrate with the CHAPI Playground to test their implementation independently
before integration.

For more information about Verifiable Credentials and the VC API, please see the
following specifications:

- [VC API]
- [Verifiable Credentials]
- [Verifiable Presentation Request]

## Usage

### Install

This project requires Node.js >= v18.

The required dependencies to run the test suite locally can be installed as
follows

```js
npm i
```

### Configuration

The tests are run off one or more configuration files located in the `/configs`
directory. Each configuration file added to this folder should correspond to an
implementation being tested. If many configurations are found in this folder,
they will all be included as part of the testing run.

See the [readme](/configs/README.md) included in `/configs` for more information
on how to write config files for your issuers.

### Running the test

Once your configs files are written, the test suite can be started with

```
npm test
```

## Implementation

To create an issuer or verifier that passes this test suite an HTTP API must be
created that exposes two endpoints:

- `/credentials/issue`
- `/presentations/verify`

To implement this API, a backend server with a compatible programming language
like Python, JavaScript (Node.js), or Java is required. In addition, a library
or SDK that can handle the creation, signing, and verification of VCs and VPs is
necessary. The specific details of the implementation will vary depending on the
chosen language and libraries.

### Issuer API

The Issuer API, as specified in section 3.2.1 of the VC-API standard, includes
an endpoint for issuing a credential. This API endpoint is `/credentials/issue`.

When a `POST` request is made to this endpoint, it issues a credential and
returns it in the response body. The request body for this endpoint must follow
a specific JSON schema that includes properties like `credential`, `options`,
and `credentialStatus`.

Successful responses from this endpoint will have a 201 HTTP status code and
include a `verifiableCredential` object in the response body, which represents
the issued credential. Other possible responses include 400 for invalid input
and 500 for server errors.

### Verifier API

The Verifier API, as specified in section 3.3.2 of the VC-API standard, includes
an endpoint for verifying a presentation. This API endpoint is
`/presentations/verify`.

When a `POST` request is made to this endpoint, it verifies a Presentation with
or without proofs attached and returns a `verificationResult` in the response
body. The request body for this endpoint must include either a
`verifiablePresentation` object with a proof or a `presentation` object without
a proof.

Successful responses from this endpoint will have a 200 HTTP status code and
include a `checks` array in the response body, which lists the checks performed
during verification. Other possible responses include 400 for invalid input, 413
for a payload that's too large, 429 for exceeding the rate limit, and 500 for
server errors.

## Community Participation

You're encouraged to participate in the W3C's VC API Issuer Test Matrix! The W3C
Credentials Community Group maintains an [Issuer Interoperability Report] and
[Verifier Interoperability Report] listing issuers and verifiers that meet the
VC API spec.

Once you've confirmed your issuer or verifier is working, you can add your
configuration files to the [vc-api-test-suite-implementations repo]. Just post a
Pull Request to be added to the test matrix and shown on the Interoperability
Report.

[VC API]: https://w3c-ccg.github.io/vc-api/
[Verifiable Credentials]: https://www.w3.org/TR/vc-data-model/
[Verifiable Presentation Request]: https://w3c-ccg.github.io/vp-request-spec/
[Issuer Interoperability Report]:
  https://w3c-ccg.github.io/vc-api-issuer-test-suite/
[Verifier Interoperability Report]:
  https://w3c-ccg.github.io/vc-api-verifier-test-suite/
[vc-api-test-suite-implementations repo]:
  https://github.com/w3c-ccg/vc-api-test-suite-implementations
