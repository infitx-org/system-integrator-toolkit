# Making Use of ISO20022 Optional Fields

The core connector template supports the implementation of ISO20022 optional fields to enhance payment processing and provide additional transaction metadata. This documentation describes how to leverage ISO20022 extensibility features for various payment scenarios and KYC requirements.

## Payment Type Configuration
Different payment scenarios can be handled by configuring the appropriate ISO20022 fields and payment type parameters. The core connector uses the `amountType` attribute in the request body to differentiate between payment types when calling the Mojaloop connector's outbound API:

- `SEND`: Standard outbound transfers (e.g., P2P payments)
- `RECEIVE`: Inbound payment scenarios (e.g., merchant payments, bill payments)

The aggregate functions have been designed to accept parameterized `amountType` values, allowing for flexible implementation of different payment use cases while reusing core functionality.

The core connector uses the POST `/transfers` api resource of the mojaloop connector's outbound api to trigger dfsp outbound transfers. In the request body there is a required amountType attribute which can take on either of 2 values
- `SEND`: this is for send money
- `RECEIVE`: this is for merchant payments.

The aggregate functions used for handling send-money were refactored to allow for a parameterized `amountType` which allowed for function reuse for both usecases.

## ISO20022 KYC Support in core connectors
This documentation provides the approach that was taken for implementing ISO 20022 Support in the already implemented core connectors as well as the core connector template. 

### Incoming Payments
For incoming payments , ISO 20022 support is implemented by passing data into the extensionLists of the response bodies of each of the requests involved in execution of incoming payments.

#### GET /parties/{IdType}/{Id}  - Discovery
Configuration.
- Add an environment variable to store the LEI (Legal Entity Identify) for the DFSP.

Response body 

The response body of 
```json
{
  ...
  "extensionList": [
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Agt.FinInstnId.LEI",
      "value": "123456" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.AdrTp.Cd",
      "value": "0020" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.Dept",
      "value": "PstlAdr.Dept" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.SubDept",
      "value": "PstlAdr.SubDept" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.StrtNm",
      "value": "PstlAdr.StrtNm" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.BldgNb",
      "value": "PstlAdr.BldgNb" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.BldgNm",
      "value": "PstlAdr.BldgNm" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.Flr",
      "value": "PstlAdr.Flr" 
    },
     {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.PstBx",
      "value": "PstlAdr.PstBx" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.Room",
      "value": "PstlAdr.Room" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.PstCd",
      "value": "PstlAdr.PstCd" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.TwnNm",
      "value": "PstlAdr.TwnNm" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.TwnLctnNm",
      "value": "PstlAdr.TwnLctnNm" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.DstrctNm",
      "value": "PstlAdr.DstrctNm" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.CtrySubDvsn",
      "value": "PstlAdr.CtrySubDvsn" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.Ctry",
      "value": "PstlAdr.Ctry"
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.AdrLine",
      "value": "PstlAdr.AdrLine" 
    },
    {
      "key": "Rpt.UpdtdPtyAndAcctId.Pty.CtryOfRes",
      "value": "Uganda"
    }
  ],
  ...
}
```
#### POST /quoterequests - Agreement
Implementation

- Return the extensionList entries that were received in the request.

- Check whether the correct level of information has been provided about the payer.

- Check that the payee’s information is ok to be able to accept the transfer.

>TODO: Which extensionList should be passed to the response of quoterequests

#### POST /transfers - Transfers
Implementation

- Check to see that all information about payee and payer is present in the extensionLists
- Check that the same level of information is available about the payer in the transfer request body
> What exactly needs to be checked since some data may not have been returned

#### PUT / PATCH Notification - Notification
remains as is currently implemented

### Outgoing Payments
For outgoing payments, ISO 20022 support is implemented by passing data into the extensionLists of the request bodies of each of the requests involved in execution of outgoing payments.

There are 2 kinds of outgoing payments that can be executed in instant payment systems.

- Send Money P2P
- Merchant Payment P2B

The ISO 20022 requirements are similar for both use cases.

#### Send Money
POST /send-money

> The attributes that have an asterisk (*) are required. 

This request body is the one that is sent in the POST /send-money request. Let’s call it 

```
sendMoneyRequestPayload
```
```json
{
  "homeTransactionId*": "HTX123456789",  
  "payeeId*": "16135551212",
  "payeeIdType*": "MSISDN",
  "sendAmount*": "150.00", 
  "sendCurrency*": "UGX", 
  "receiveCurrency*": "KES",
  "transactionDescription": "Payment for services",
  "transactionType*": "TRANSFER",
  "payer*" : { 
    "name*": "John Doe",
    "payerId*": "9876543210",
    "DateAndPlaceOfBirth":{
      "BirthDt*":"20-09-2001",
      "PrvcOfBirth":"ProvinceOfBirth",
      "CityOfBirth*":"Kampala",
      "CtryOfBirth*": "Uganda"
    }
  }
}
```
After the data is received by the core connector, it will be passed into the POST /transfer request body as extensionLists of the from attribute

```
transferResquest.from.extensionList
```
The extensionList will contain entries like this.
```json
transferResquest.from.extensionList 
[
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.BirthDt",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.BirthDt"
  },
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.PrvcOfBirth",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.PrvcOfBirth"
  },
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.CityOfBirth",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.CityOfBirth"
  },
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.CtryOfBirth",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.CtryOfBirth"
  }
]
```
#### Merchant Payments 
POST /merchant-payments

>The attributes that have an asterisk (*) are required. 

This request body is the one that is sent in the POST /merchant-payment request. Let’s call it 

```
merchantPaymentPayload
```
```json
{
  "homeTransactionId*": "HTX123456789",  
  "payeeId*": "16135551212",
  "payeeIdType*": "MSISDN",
  "sendAmount*": "150.00", 
  "sendCurrency*": "UGX", 
  "receiveCurrency*": "KES",
  "transactionDescription": "Payment for services",
  "transactionType*": "TRANSFER",
  "payer*" : { 
    "name*": "John Doe",
    "payerId*": "9876543210",
    "DateAndPlaceOfBirth":{
      "BirthDt*":"20-09-2001",
      "PrvcOfBirth":"ProvinceOfBirth",
      "CityOfBirth*":"Kampala",
      "CtryOfBirth*": "Uganda"
    }
  }
}
```
After the data is received by the core connector, it will be passed into the POST /transfer request body as extensionLists of the from attribute

```
transferResquest.from.extensionList
```
The extensionList will contain entries like this.
```json
transferResquest.from.extensionList 
[
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.BirthDt",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.BirthDt"
  },
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.PrvcOfBirth",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.PrvcOfBirth"
  },
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.CityOfBirth",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.CityOfBirth"
  },
  {
    "key":"CdtTrfTxInf.Dbtr.PrvtId.DtAndPlcOfBirth.CtryOfBirth",
    "value": "sendMoneyRequestPayload.payer.DateAndPlaceOfBirth.CtryOfBirth"
  }
]
```
