# chapi-issuer-test-suite
Test Suite for Issuers that implement the VC HTTP API and are looking to
integrate into the CHAPI Playground.

## Table of Contents

- [Background](#background)
- [Usage](#usage)


## Background

This is a stripped down and simplified version of the W3C
[VC API Issuer Test Suite].
 
This allows you to run the same set of tests with a locally defined
configuration(s), allowing you to test your issuer independently.

For more information about Verifiable Credentials and the VC API,
please see the following specifications:
 - [VC API]
 - [Verifiable Credentials]
 - [Verifiable Presentation Request]

## Usage

### Install
This project requires Node.js v16.

The required dependencies to run the test suite locally can be installed
as follows

```js
npm i
```

### Configuration
The tests are run off one or more configuration files located in the `/configs`
directory. Each configuration file added to this folder should correspond to an
issuer being tested. If many configurations are found in this folder, they will
all be included as part of the testing run.

See the [readme](/configs/README.md) included in `/configs` for more
information on how to write config files for your issuers.

### Running the test
Once your configs files are written, the test suite can be started with
```
npm test
```

## Community Participation
You're encouraged to participate in the W3C's VC API Issuer Test Matrix! 
The W3C Credentials Community Group maintains an [Interoperability Report]
listing issuers that meet the VC API spec.  

Once you've confirmed your issuer is working, you can add your configuration
files to the [vc-api-test-suite-implementations repo].  Just post a Pull
Request to be added to the test matrix and shown on the Interoperability
Report.


[VC API]: https://w3c-ccg.github.io/vc-api/
[Verifiable Credentials]: https://www.w3.org/TR/vc-data-model/
[Verifiable Presentation Request]: https://w3c-ccg.github.io/vp-request-spec/
[VC API Issuer Test Suite]: https://github.com/w3c-ccg/vc-api-issuer-test-suite
[Interoperability Report]: https://w3c-ccg.github.io/vc-api-issuer-test-suite/
[vc-api-test-suite-implementations repo]: https://github.com/w3c-ccg/vc-api-test-suite-implementations 