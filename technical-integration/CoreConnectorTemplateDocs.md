# Core Connector Template
Core Connector template to be adapted for rapid core connector development.

> For full forms check the glossary section

## Introduction
A core connector is a middleware that facilitates a connection between the DFSP and the mojaloop connector.

### Prerequisites
Before you start building a core connector, there are some requirements that need to be in place before implementation starts. These are important because they affect the success of the integration

- Core Banking Solution Sandbox API
- Access credentials to the API 
- Typescript knowledge
- Docker knowledge 
- Git knowledge
- Mojaloop Knowledge
- For Windows users you will need WSL (Ubuntu)

If you need to get knowledge on how Mojaloop works, consider taking the [Mojaloop Training Program](https://mojaloop.io/mojaloop-training-program/).

## Start Here.

Clone this repository or fork it and clone.

```bash
git clone https://github.com/mojaloop/ml-reference-connectors.git
```

Change into the cloned directory
```bash
cd ml-reference-connectors
```

Create a new core connector by running this command

```bash
./create.sh -c zm -n airtel
```

Once you have run this command, it will created a folder named `airtel-zm-core-connector`

This command also creates a new branch for the core connector. For this connector, it will be called `ft/airtel-zm-core-connector`. It will install npm dependencies, build and start the server. To stop the server from running, press `CTRL + C`

Once you have setup your local development environment, follow the instructions in the next sections to learn how to customize the new connector.

## Core Connector Structure
Core connectors expose two servers. One to handle requests from the mojaloop connector i.e the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0). This api supports incoming payments. The other server will handle requests from the DFSP to send money to a beneficiary in another DFSP. This is called the [send money api](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/api-spec/core-connector-api-spec-dfsp.yml).  This api supports outgoing payments.

By default the core connector exposes port 3003 for incoming payments and port 3004 for outgoing payments. For more information about the core connector networking, [learn more](../technical-reference/Networking.md)

If you look at the newly created connecotr, it has 3 main structural components located in the `src` folder.

- `api-sepc`: This folder contains the api specification files that specify the api formats, request and response payloads. [learn more](./RoutingAndApiSpecifications.md)
- `core-connector-svc`: This folder contains code that handles the way the api is exposed over a RESTFUL interface.[learn more](../technical-reference/Service.md)
- `domain`: This folder contains the business logic of the core connector and all client classes used to communicate with the [DFSP](../technical-reference/CBSClient.md) and [Mojaloop Connector](./SDKClient.md).  
- `infra`: This layer contains implementations for an http client, logger and plugins that are used by the service. This does not need refactoring.

All function examples given in this document are in the [coreConnectorAgg.ts](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/src/domain/coreConnectorAgg.ts) file that contains all the business logic

## Payee Integration  (Incoming Payments)
![Incoming Payments](/images/IncomingPayments.png)
The payee integration is required to support incoming payments into the DFSP being integrated. It will setup the required facilities to support account holders of a DFSP receive funds from a payer in another DFSP.

### Implementing Get Parties

Get Parties is the function of the core connector that supports account discovery. The way it is implemented is by exposing a route on the core connector that will receive requests from the Mojaloop Connector. The get parties function is exposed by this route.

For more information about the process flow of account discovery, please look through this [sequence diagram](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/docs/payee-get-parties.md)

`GET` `/parties/{IdType}/{IdValue}`

For more information about this route, please refer to the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0)

When the core connector receives this request, it retrieves information about the party `IdValue` from the DFSPs core banking api. It then prepares a response payload that is structurally compliant with the mojaloop connector backend api and returns it to the mojaloop connector.

To implement this function in the newly created connector. A few things need to be refactored.
- Implement a client for the core banking api. [learn more](../technical-reference/CBSClient.md)
- Refactor the aggregate function for `getParties` prepare a response for the mojaloop connector based on the data received from the DFSP core banking api. [learn more](../technical-reference/CoreConnectorAggregate.md#get-parties)
- Write unit and integration tests to verify the functionality

The core connector template already has code that implements the request handling logic. The core connector template has route handler functions that receive request that match the get parties url. The route handler functions then call the respective function for account discovery in the domain.

Here is an example of how you would refactor the aggregate function for Get Parties.

```typescript
async getParties(id: string, IdType: string): Promise<Party> {
    this.logger.info(`Getting party information for ${id}`);
    if (!(IdType === this.cbsConfig.SUPPORTED_ID_TYPE)) {
        throw ValidationError.unsupportedIdTypeError();
    }
    const res = await this.cbsClient.getKyc({ msisdn: id });
    return this.getPartiesResponse(res);
}
```

For more information ,[learn more](https://github.com/mojaloop/ml-reference-connectors/blob/078d77b9181f40481847e1e8fb3e563f9adb8103/core-connector-template/src/domain/coreConnectorAgg.ts#L80)

### Implementing Quote Requests
Quote requests is the function of the core connector that supports agreement of transfer terms. It is implemented by exposing a route on the core connector that will receive requests from the Mojaloop Connector. It also serves as route to help the mojaloop connector determine whether a transfer of the amount specified in the request body can happen. This means checking if the account of the beneficiary is blocked or whether a payment may fail for whatever reason. The route to be exposed is this.

To understand in detail the process flow for the transfer agreement phase, [learn more](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/docs/payee-quoterequests.md) in this sequence diagram.

`POST /quotetrequests`

For more information about this route, please refer to the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0)

When the core connector receives a request that matches this route it is supposed to do the following;
- Calculate how much the transfer will cost
- Check if the destination beneficiary can receive the funds of the amount specified in the request body.
- Check the request body has the correct currency as supported by the core connector. The supported currency is configured in the core connector environment variables. [Learn more](../technical-reference/Configuration.md) about configuration management.
- Return a response payload containing transfer fees and amount the destination beneficiary will receive. [Learn more](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0#/Quotes/BackendQuoteRequest) about the request and response payloads

To implement this functionality in the newly created connector, A few things need to be refactored.
- Implement a client for the core banking api. [learn more](../technical-reference/CBSClient.md)
- Refactor the aggregate function for `quoteRequests` to perform the tasks as listed above and prepare a response for the mojaloop connector as specified in the mojaloop connector backend api. [learn more](../technical-reference/CoreConnectorAggregate.md#quote-requests)
- Write unit and integration tests to verify the functionality

Here is an example of how you would refactor the aggregate function for quoting.

```typescript
async quoteRequest(quoteRequest: TQuoteRequest): Promise<TQuoteResponse> {
    this.logger.info(`Calculating quote for ${quoteRequest.to.idValue} and amount ${quoteRequest.amount}`);
    if (quoteRequest.to.idType !== this.cbsConfig.SUPPORTED_ID_TYPE) {
        throw ValidationError.unsupportedIdTypeError();
    }
    if (quoteRequest.currency !== this.cbsConfig.X_CURRENCY) {
        throw ValidationError.unsupportedCurrencyError();
    }
    const res = await this.cbsClient.getKyc({ msisdn: quoteRequest.to.idValue });
    const fees = (Number(this.cbsConfig.SENDING_SERVICE_CHARGE) / 100) * Number(quoteRequest.amount)
    // check if account is blocked if possible
    const quoteExpiration = this.cbsConfig.EXPIRATION_DURATION;
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + Number(quoteExpiration));
    const expirationJSON = expiration.toJSON();
    return this.getQuoteResponse({
        res: res,
        fees: fees,
        expiration: expirationJSON,
        quoteRequest: quoteRequest
    });
}
```
For more information, [learn more](https://github.com/mojaloop/ml-reference-connectors/blob/078d77b9181f40481847e1e8fb3e563f9adb8103/core-connector-template/src/domain/coreConnectorAgg.ts#L102)

### Implementing Transfers
Transfers is the function of the core connector that supports the actual crediting of funds on to the destination beneficiary's account. The transfers function happens in two requests. The first is a reservation step and the second is a funds committing step.

The first endpoint that the core connector needs to expose for the funds reservation step is the `POST /transfers` and the second endpoint that needs to be exposed is `PUT /transfers/{transferId}`

For more information about this routes, please refer to the [mojaloop connector backend api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Backend%20v2.1.0#/Transfers)

When the core connector receives a `POST /transfers` request, it is supposed to perform the following;
- Reserve the funds from the prefunded float account
- Respond to the mojaloop connector with a RESERVED status 

The process flow for the POST `/transfers` and PUT `/transfers/{transferId}` endpoint is documented in this [sequence diagram](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/docs/payee-transfers.md)

To implement this functionality in the core connector, some refactoring is needed i.e;
- Implement a client for the core banking api. [learn more](../technical-reference/CBSClient.md)
- Refactor the aggregate function for `transfers` to perform the tasks as listed above and prepare a response for the mojaloop connector as specified in the mojaloop connector backend api [learn more](../technical-reference/CoreConnectorAggregate.md#transfers)
- Write unit and integration tests to verify the functionality

The second endpoint that needs to be implemented is the `PUT /transfers/{transferId}`. When the core connector receives a `PUT /transfers/{transfersId}` request, it is supposed to perform the following tasks.
- Check that the transfer `currentState` is in state `COMPLETED`
- If it is state `COMPLETED`
- Credit the reserved funds into the destination beneficiary's account 

To implement this functionality in the core connector, the following need to be done;
- Implement the client for the core banking api and make sure it supports transfering funds to the customer's account. [learn more](../technical-reference/CBSClient.md)
- Refactor the aggregate function for the `putNotification` to perform the task of checking transfer state and crediting funds into the customer's account. [learn more](../technical-reference/CoreConnectorAggregate.md#put-transfer-notification)
- Write unit and integration tests to verify the functionality.

Here is an example implementation of POST `/transfers` aggregate function.
```typescript
async receiveTransfer(transfer: TtransferRequest): Promise<TtransferResponse> {
    this.logger.info(`Received transfer request for ${transfer.to.idValue}`);
    if (transfer.to.idType != this.IdType) {
        throw ValidationError.unsupportedIdTypeError();
    }
    if (transfer.currency !== this.cbsConfig.X_CURRENCY) {
        throw ValidationError.unsupportedCurrencyError();
    }
    if (!this.validateQuote(transfer)) {
        throw ValidationError.invalidQuoteError();
    }
    this.checkAccountBarred(transfer.to.idValue);
    // RESERVE FUNDS
    return {
        completedTimestamp: new Date().toJSON(),
        homeTransactionId: transfer.transferId,
        transferState: 'RESERVED',
    };
}
```

Here is an example implementation of PUT `/transfers/{transferId}`
```typescript
async updateTransfer(updateTransferPayload: TtransferPatchNotificationRequest, transferId: string): Promise<void> {
    this.logger.info(`Committing transfer on patch notification for ${updateTransferPayload.quoteRequest?.body.payee.partyIdInfo.partyIdentifier} and transfer id ${transferId}`);
    if (updateTransferPayload.currentState !== 'COMPLETED') {
        await this.initiateCompensationAction();
        throw ValidationError.transferNotCompletedError();
    }
    const makePaymentRequest: TCbsDisbursementRequestBody = this.getMakePaymentRequestBody(updateTransferPayload);
    await this.cbsClient.sendMoney(makePaymentRequest);
}
```

## Payer Integration  (Outgoing Payments)
![Outgoing Payments](/images/OutgoingPayments.png)
This section describes how to implement payer integrations to support payer operations to the Mojaloop Connector

### Implementing Send Money
![Mojaloop](https://img.shields.io/badge/Already-Implemented-green)

Send money is the function of the core connector that supports a customer of a DFSP sending money from their account to another customer in another DFSP possibly in another country. The core connector exposes an api that the DFSP will call to perform a send money opertation. This function is the first phase in an outgoing transaction. The request is a `POST /send-money` and it is received on a separate server than the incoming payments. By default DFSP requests are received on port 3004 but this can be changed via configuration. 

The process flow for POST `/send-money` is documented in this [sequence diagram](https://github.com/mojaloop/ml-reference-connectors/blob/main/core-connector-template/docs/payer-send-money.md) 

This function performs the following tasks.
- Receive the send money request and validate the request body parameters
- Initiate a transfer through the mojaloop connector by calling `POST /transfers` on the [mojaloop connector outbound api](https://mojaloop.github.io/api-snippets/?urls.primaryName=SDK%20Outbound%20v2.1.0#/Transfers).
- If there is need to accept currency conversion terms, it checks them and returns a response to accept or reject it.
- After receiving a response from the mojaloop connector, this function should prepare a response for the DFSP containing name of the beneficiary as returned in the response of `POST /transfers` and the fees assocaited with the transfer.

Once the details of the beneficiary, the transction fees and receive amount of the destination beneficiary have been returned to the DFSP, the details are supposed to be shown to the customer. The customer can then choose to abort or proceed with the transfer.

The request to capture the customer's choice is explained in the [next](#implementing-update-send-money) section.

To implement this functionality in the core connector, the following need to be done;
- Read through the [mojaloop connector client](./SDKClient.md) to understand how to use it.
- Read through the aggregate function that executes this function. [learn more](../technical-reference/CoreConnectorAggregate.md#send-money)

> This functionality is already implemented in the template because it will be the same for all integrations. This documentation is merely for information purposes.

Here is the implementation of this function as it is in the template.

```typescript
async sendMoney(transfer: TCbsSendMoneyRequest): Promise<TCbsSendMoneyResponse> {
    this.logger.info(`Received send money request for payer with ID ${transfer.payerAccount}`);
    const res = await this.sdkClient.initiateTransfer(await this.getTSDKOutboundTransferRequest(transfer));
    if (res.data.currentState === "WAITING_FOR_CONVERSION_ACCEPTANCE") {
        return await this.checkAndRespondToConversionTerms(res);
    }
    if (!this.validateReturnedQuote(res.data)) {
        throw ValidationError.invalidReturnedQuoteError();
    }
    return this.getTCbsSendMoneyResponse(res.data);
}
```
For more information. [Learn more](https://github.com/mojaloop/ml-reference-connectors/blob/078d77b9181f40481847e1e8fb3e563f9adb8103/core-connector-template/src/domain/coreConnectorAgg.ts#L266)

### Implementing Update Send Money
The Update Send Money is the function of the core connector that allows the DFSP customer's choice of whether to proceed with the transfer or not to be captured. The core connector exposes an api endpoint `PUT /send-money/{transferId}` on port 3004 to handle transfer continuation requests. A transferId is sent as part of the URL to allow use trace the exact transfer the customer is responding to. This step of the transfer is the one that involves debiting funds from the sender's account and sending a `PUT /transfers/{transferId}` request to the mojaloop connector to confirm or abort the transfer in the mojaloop switch.

There is a difference in the implementation of this function in the core connector depending on the DFSP that is being integrated. Based on our integration experience some DFSPs especially banks prefer to debit the funds from the customer's account prior to sending the `PUT /send-money/{transferId}` while other DFSPs especially MNOs expect the core connector to perform the debit action on the customer's account.

For Banks, here are the functions that the core connector should perform.
- Check the customer has accepted the quote or not by checking the `acceptQuote` attribute in the request body.
- If the customer accepted the quote, it means the funds were debited from their account. A `PUT /transfers/{transferId}` should be sent to the mojaloop connector with `{acceptQuote: true}` and vice versa if they rejected the quote.

For MNOs, here are the functions that the core connector should perform
- Check the customer has accepted the quote or not by checking the `acceptQuote` attribute in the request body.
- If the customer accepted the quote,funds should be debited from their account by sending a USSD Invoice to the customer's phone.
- Once a callback is received from the MNO, we can then send the `PUT /transfers/{transferId}` to the mojaloop connector. Depending on what the callback payload contains, we will either send an `acceptQuote: true` or `acceptQuote: false`. Most MNOs have different callback payload structures so some researcg must be made in their api documentation to determing the structure of the callback payload and which attribute can be used to reliably determine that a request to pay was successful or not.

Here is an example of the implementation of this functionality.
Update Send Money Function
```typescript
async updateSendMoney(updateSendMoneyDeps: TCBSUpdateSendMoneyRequest, transferId: string): Promise<TCbsCollectMoneyResponse> {
    this.logger.info(`Updating transfer for id ${updateSendMoneyDeps.msisdn} and transfer id ${transferId}`);

    if (!(updateSendMoneyDeps.acceptQuote)) {
        throw ValidationError.quoteNotAcceptedError();
    }
    return await this.cbsClient.collectMoney(this.getTCbsCollectMoneyRequest(updateSendMoneyDeps, transferId));
}
```

Callback Function
```typescript
async handleCallback(payload: TCallbackRequest): Promise<void> {
    this.logger.info(`Handling callback for transaction with id ${payload.transaction.id}`);
    try {
        if (payload.transaction.status_code === "TS") {
            await this.sdkClient.updateTransfer({ acceptQuote: true }, payload.transaction.id);
        } else {
            await this.sdkClient.updateTransfer({ acceptQuote: false }, payload.transaction.id);
        }
    } catch (error: unknown) {
        if (error instanceof SDKClientError) {
            // perform refund or rollback
            // const rollbackRes = await this.cbsClient.refundMoney();
        }
    }
}
```
> Core Connector Aggregate for MNO.

For Banks all you would need to do is this.
```typescript
async updateSendMoney(updateSendMoneyDeps: TCBSUpdateSendMoneyRequest, transferId: string): Promise<void> {
    this.logger.info(`Handling Update Send money for transaction with id ${payload.transaction.id}`);
    if (!(updateSendMoneyDeps.acceptQuote)) { // acceptQuote: false
        await this.sdkClient.updateTransfer({ acceptQuote: false }, updateSendMoneyDeps.transaction.id);
        throw ValidationError.quoteNotAcceptedError();
    }else{ // acceptQuote: true
        await this.sdkClient.updateTransfer({ acceptQuote: true }, updateSendMoneyDeps.transaction.id);
    }
}
```
## Glossary
- CC : Core Connector
- DFSP : Digital Financial Service Provider
- CBS: Core Banking Solution
- API: Application Programming Interface
- WSL: Windows Sub-System For Linux
- KYC: Know Your Customer
- MNO: Mobile Network Operators
