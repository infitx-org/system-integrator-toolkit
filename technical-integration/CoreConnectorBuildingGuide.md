
# Development guide for building core-connectors
## Integration Development Steps
Here are the typical steps that need to be taken to building an integration:
1. Download the [**testing harness**](/deployment-guide/CoreConnectorTestingHarness.md) with an example core connector to try.<br>
Understand the scope of the requirement and the API flows, by reviewing the core-connector golden path test collection that is used to illustrate the quality and adherence to the requirements.
2. Work with the Business / Product Expert at the DFSP to determine and get sign off on the **funding and liquidity design** that must be implemented in the integration.<br>
The pre-funded [**liquidity design documents**](/business-integration/BusinessOperations.md#liquidity-design) can help this process.
3. Investigate the core-connector API and **design an integration solution**. <br>
The [**IIPS Design Patterns**](/technical-reference/IIPSDesignPatterns.md) for Payer and Payee DFSP integration is a good guide for this work.
4. Build the integration against a Core Banking Solution Sandbox. This solution can be tested at any time by deploying/connecting it into the testing harness and running all or parts of the golden path test collection.<br>
The core-connector template can be useful as a starting point for building custom integrations.<br>
5. **Submit the core-connector for review** and approval by the Scheme. The scheme will have final say as to whether the integration solution is adequate for their scheme and use case.
6. Perform **User Acceptance Testing** for the scheme by deploying into Payment manager / or other deployment solution connected to a fully secured Environment.<br>
Run end-to-end testing, that include sending and receiving funds between connected organizations.<br>
Run a Settlement test.

## Open API references

- [FSPIOP v2.0 specification](https://mojaloop.github.io/api-snippets/?urls.primaryName=v2.0) - [Open Api definition](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/v2.0-document-set/fspiop-v2.0-openapi3-implementation-draft.yaml).
- [FSPIOP v2.0 ISO 20022 specification](https://mojaloop.github.io/api-snippets/?urls.primaryName=v2.0_ISO20022) - [Open Api definition](https://github.com/mojaloop/api-snippets/blob/main/docs/fspiop-rest-v2.0-ISO20022-openapi3-snippets.yaml).
- [API Snippets Open Api definition](https://github.com/mojaloop/api-snippets/blob/main/docs/fspiop-rest-v2.0-openapi3-snippets.yaml)
- [Mojaloop Connector backend](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0) - [Open Api definition](https://github.com/mojaloop/api-snippets/blob/main/docs/sdk-scheme-adapter-backend-v2_1_0-openapi3-snippets.yaml)
- [Mojaloop Connector outbound](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Outbound%20v2.1.0) - [Open Api definition](https://github.com/mojaloop/api-snippets/blob/main/docs/sdk-scheme-adapter-outbound-v2_1_0-openapi3-snippets.yaml)
