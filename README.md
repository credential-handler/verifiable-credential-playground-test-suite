# vc-api-issuer-test-suite
Test Suite for Issuers that implement the VC HTTP API and are looking to integrate into the CHAPI Playground.

## Table of Contents

- [Background](#background)
- [Usage](#usage)


## Background

This is a stripped down and simplified version of the W3C [VC API Issuer Test Suite](https://github.com/w3c-ccg/vc-api-issuer-test-suite).
 
 This allows you to run the same set of tests with a locally defined configuration(s), allowing you to test your issuer independently.

## Usage
### Install
The required dependencies to run the test suite locally can be installed as follows

```js
npm i
```
### Configuration
The tests are run off one or more configuration files located in the `/configs` directory. Each configuration file added to this folder should correspond to an issuer being tested. If many configurations are found in this folder, they will all be included as part of the testing run.

See the [readme](/configs/README.md) included in `/configs` for more information on how to write config files for your issuers.

### Running the test
Once your configs files are written, the test suite can be started with
```
npm test
```

