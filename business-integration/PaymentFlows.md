## Payment Manager
This is a tool developed to support connectivity between the DFSP and the DRPP. The 2 components of concern from the DFSP perspective are the core connector and the mojaloop connector.

### Core Connector
The core connector is a custom built middleware that provides an integration between the DFSP API and the mojaloop Connector. 

Part of the work that must be done during an integration is the development of a core connector specifically for the DFSP being integrated. This is because DFSP APIs vary across different financial institutions.

### Mojaloop Connector
The mojaloop connector is the middleware that brokers communication between the custom built core connector and the DRPP.

It is already built and will only need to be deployed as part of the Payment Manager services for it to be able to work for the DFSP being integrated.


For the Early Adopter Program, the Payment Managers will be hosted for the DFSPs in a managed environment. But when going into production, deployment tools will be provided to support the DFSPs in deploying the solution in their environments.

# Payment Flows
An integration for a specific DFSP is supposed to support both incoming and outgoing payments.

## Incoming Payments
Incoming payments from the perspective of a DFSP are payments that are destined for a specific customer account. They are intended for customers who will be receiving payments from other customers in the DRPP.

The core connector is built to support incoming payments. From the DFSP API, it requires the following information
- How to get account information especially the name of the customer for a specific account number
- How to validate that a specific account can receive a payment prior to committing funds
- How to determine the cost of a transfer into a customer’s account
- How to request a reservation of a funds for a customer before crediting to the account
- How to send a disbursement request to credit a customer’s account with the reserved funds

Additional information required by the integration team is information from the DFSP about what we call “Working Capital Accounts”. From an incoming payments perspective, this is an account from which money will be disbursed to the beneficiary. It is held inside the DFSP and it is specifically for DRPP integration. More discussions can be held to talk about what this account will look like for incoming payments.

## Outgoing Payments
Outgoing payments from the perspective of the DFSP are payments that are originating from the DFSP’s customers destined for other beneficiaries in the DRPP scheme.

The core connector is built to support outgoing payments. During the implementation of the integration to support outgoing payments, there is an important consideration to make.

- DFSP Customer Application integration with core connector

From the DFSP API, the core connector needs to do the following to be able to support outgoing payments.
- How to perform a refund when an outgoing payment into the scheme fails.

Customers can trigger outgoing payments through a customer facing application. Either USSD , Mobile or Web Application. This DFSP Customer application needs to send outgoing payment requests to the core connector so that the core connector can send outbound transfer messages to the DRPP through the mojaloop connector.

To review the core connector send money api, please [click here](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml) to learn more

The DRPP supports two payment use cases. They include 
- P2P Normal Send Money
- P2B Merchant Payment

### Customer Journey
There are 2 use cases the DRPP intends to support and offer to customers. P2P and P2B. Here is a generic customer journey.

1. Customer Opens application or dials USSD code.
2. Customer enters payee identifier
3. Customer enters amount to send
4. Customer initiates the transfer by submitting the data
5. Application responds with transfer terms and name of the payee.
6. Customer reviews payment terms and payee details
7. Customer proceeds to abort or approve the transfer
8. If the customer approves, the funds are deducted from their account.

Step `4` represents the initial step of triggering the payment and step `7` represents the Confirm Send Money Step The approaches provided in the Confirm Send Money Approaches section address options for handling events from step 7 onwards.

### Initial Step
The send-money customer journey begins when the customer expresses interest to send funds by specifying details about the payee and amount to send. This initiation step applies to both approaches going to be presented in this documentation.

Here is a sequence diagram that describes the process.

In this sequence diagram the DFSP Customer Facing application (USSD or Mobile App) receives some data from the customer about the payment details and then sends the data to a Core Connector middleware that is designed to retrieve information about the payee and how much it will cost to execute the transfer.

This step corresponds to the following requests in the [api documentation](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml).

- POST /send-money
- POST /merchant-payment

![InitiateSendMoney](/images/InitiateSendMoney.png)

### Confirm Send Money Approaches
In reference to the customer journey, this section presents 2 ways of handling the series of events from step 7. This is the point where if the customer has approved of the payment, either DFSP or the core connector middleware will take the responsibility of debiting funds from the customer account. These are the approaches shared here.

### DFSP Handling Debit of Funds
In this approach, after the customer has reviewed the transfer terms, the name of the payee and has approved the transfer. DFSP Customer Application handles the debiting of funds from the customer account.

Here is a sequence diagram to show the steps from an DFSP and core connector perspective.

This step corresponds to the following requests in the [api documentation](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml)

- PUT /send-money/{transferId}
- PUT /merchant-payment/{transferId}

![DFSP Handled](/images/DFSPHandled.png)

### Core Connector Initiating Debit of Funds
In this approach, after the customer has reviewed the transfer terms, the name of the payee and has approved the transfer. The Core Connector Middleware initiates debit of funds from the customer account.

Here is a sequence diagram to show the steps from an DFSP and core connector perspective.

This step corresponds to the following requests in the [api documentation](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/mojaloop/ml-reference-connectors/refs/heads/dev/airtel-zm-core-connector/src/api-spec/core-connector-api-spec-dfsp.yml)

- PUT /send-money/{transferId}
- PUT /merchant-payment/{transferId}
- PUT /callback (This is a callback URL registered in DFSP Open API Portal)

![CoreConnector Handled](/images/CoreConnectorHandled.png)

