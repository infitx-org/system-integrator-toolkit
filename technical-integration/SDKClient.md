# Mojaloop Connector Client (SDK Client)
The SDK Client is responsible for all communication between the core connector and the mojalooop connector's SDK Scheme Adapter Service. The SDK client is used to call the mojaloop connectors's outbound api. 

## Usage

To use the SDK Client, make sure the `SDK_BASE_URL` environment variable is set in the `.env` (PROD) or  `.env.example`(DEV)

### Instantiating 
```typescript
import { SDKClientFactory } from '../domain/SDKClient';

const sdkClient = SDKClientFactory.getSDKClientInstance(
        logger,
        httpClient,
        config.get('sdkSchemeAdapter.SDK_BASE_URL'),
    ); // creating an instance of the class
```
### POST /transfers
To execute this api call using the SDK Client , refer to this example

```typescript
const res =  await sdkClient.initiateTransfer(transferRequest);
```

This method call will make a POST `/transfers` request to the SDK Scheme Adapter to trigger an outbound transfer.


### PUT /transfers/{transferId}
To execute this api call using the SDK Client, refer to this example.

```typescript
const res = await sdkClient.updateTransfer({ acceptQuote: true }, crypto.randomUUID());
```

This method call will make a PUT `/transfers/{transferId}` request to the SDK Scheme Adapter to update an outbound transfer with quote acceptance status.

