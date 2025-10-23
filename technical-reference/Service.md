# API Service

The api service is the component of the core connector that exposes all the functionality of the connector over a RESTFUL interface.

Service code is located in the `src/core-connector-svc` and it contains the following files.
- [BaseRoutes.ts](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/core-connector-svc/BaseRoutes.ts): Contains shared functions for responding to requests.
- [Service.ts](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/core-connector-svc/Service.ts)
- [dfspCoreConnectorRoutes.ts](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/core-connector-svc/dfspCoreConnectorRoutes.ts): Contains request handlers for outgoing payments functionality
- [sdkCoreConnectorRoutes.ts](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/core-connector-svc/sdkCoreConnectorRoutes.ts): Contains request handlers for incoming payments functionality
- [index.ts](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/core-connector-svc/index.ts): Exports `Service` class

The files that need no changing are Service.ts, index.ts, sdkCoreConnectorRoutes.ts and BaseRoutes.ts because they will always be the same for all connectors.

Inside Service.ts is where the servers are actually run.

```typescript
static async setupAndStartUpServer() {
    ...
    await this.sdkServer.start();
    logger.info(`SDK Core Connector Server running at ${this.sdkServer.info.uri}`);
    await this.dfspServer.start();
    logger.info(`DFSP Core Connector Server running at ${this.dfspServer.info.uri}`);
}
```
[Learn more](https://github.com/mojaloop/ml-reference-connectors/blob/078d77b9181f40481847e1e8fb3e563f9adb8103/core-connector-template/src/core-connector-svc/Service.ts#L70)
