# Customer Journey

## 1 .Introduction
In digital payments and financial services, a customer journey refers to the complete series of interactions that a customer undertakes when engaging in a transaction or service. This journey maps out each step from the initial engagement, through the transaction process, to post-transaction support. It is used to understand and enhance the user experience at every touchpoint, ensuring that the process is efficient, intuitive, and satisfactory for the customer.

> <strong>"Empower Your Payments: Instant, Secure, Global." </strong>

> At the heart of instant payment systems is a commitment to streamline financial interactions, whether peer-to-peer or peer-to-business. With modern payment platforms, experience the convenience of instant transactions coupled with robust security features, all while crossing international borders with ease. These platforms ensure that every payment is not only fast but also seamlessly integrates with real-time currency conversion, providing transparent, competitive exchange rates. This guarantees that your money moves accurately and efficiently, no matter where you or your recipients are located.

> Choose a payment solution that supports your aspirations to connect and transact globally, reducing complexity and enhancing your financial empowerment.

## 2. Objective
To provide a seamless, secure, and quick transaction experience for both P2P (Person to Person) and P2B (Person-to-business) payments using an instant payment platform deployed on a Mojaloop Switch.

## 3. Scope 
|In Scope | Future Scope |
| -| -|
|P2P| E Commerce|
|P2B| |

## 4. Phases
- Discovery: The initial phase where the customer identifies the recipient (another individual or a business) for the payment. This phase includes finding and verifying the party's identity or account details via the Mojaloop Account Lookup Service (ALS).

- Agreement: The stage where the customer reviews the transaction details, including amounts, fees, and terms, and agrees to proceed with the transaction. This phase involves confirming the transaction details and authorizing the payment.

- Transfer: The final phase involves the actual processing and completion of the transaction through Mojaloop, ensuring that funds are transferred between the customer’s and recipient’s accounts accurately and instantaneously.

## 5. Touch Points
Mobile apps or digital interfaces where the customer interacts with their Financial  service.

Notifications and alerts that inform the customer about the status of their transaction.

Customer support channels available for queries or issues that arise during the transaction process

## 6. User Actions and Interactions
- Logging into the Existing app (As Provided by the DFSP), entering transaction details, scanning codes, and using security features like PINs or biometrics for authentication.

- Engaging with visual confirmations and digital receipts to verify and record transactions.

## 7. System Actions
- Discovery of account details through Mojaloop’s directory services.

- Processing and routing of transactions between financial institutions.

- Providing real-time updates and confirmations to both sender and recipient through end-user applications.

## 8. Outcome
- Enhanced customer satisfaction through a straightforward, reliable, and instant payment process.

- Increased trust and usage of digital financial services.

- International Quality: Simplify international payments to match the ease of domestic payments.


## 9. Use Cases and Corresponding Customer Journey’s

### Person to Person ( P2P)
P2P transactions are financial exchanges between two individuals:

Scenario: Alice in Malawi wants to send money instantly to her friend Bob in Zambia. Both countries have different currencies.

#### Phase 1: Discovery

1. Login and Initiate Transfer:

Alice logs into her mobile banking app.

She selects the option to send money internationally and enters Bob’s mobile number or account details.

2. Identify Recipient:

The app provided by Alice's Financial Institution (FI) (Bank, Sacco, Mobile Money Provider aka DFSP) connected to the payment hub uses Mojaloop's discovery service to identify Bob's bank and account details in Zambia.

Mojaloop confirms that Bob is registered under the provided details with a participating DFSP in the network.

3. Display Recipient Confirmation:

Alice receives a confirmation of Bob’s name, his DFSP, and the country, ensuring she has the correct recipient.

#### Phase 2: Agreement

1. Enter Amount and Currency Conversion:

Alice enters the amount she wishes to send in her local currency.

The app queries real-time FX rates through a service integrated with the Mojaloop payment hub, calculating the amount Bob will receive in his local currency.

The conversion rate, along with any FX fees, are clearly displayed to Alice.

2. Review and Confirm Transaction Details:

Alice reviews the payment amount, conversion details, recipient information, and the final amount that Bob will receive.

Terms related to the FX conversion, including the FX margin and fees, are shown.

3. Authorization and Authentication:

Alice authorizes the transaction, leveraging existing Authorization and verification mechanics.

#### Phase 3: Transfer

1. Initiate Transfer via Mojaloop:

Alice’s DFSP sends a request to DRPP to route the transaction to Bob’s DFSP, including details of the currency conversion.

DRPP through Mojaloop Switch coordinates with both banks and any FX service providers involved to ensure the correct handling and routing of the converted funds.

2. Processing the Transaction:

Bob’s DFSP receives the transaction in his local currency, processes it instantly, and credits his account.

Both DFSPs update their ledgers to reflect the international transfer and currency conversion.

DRPP Records obligations between FI for Settlement 

3. Confirmation and Notification:

Alice receives a confirmation that the funds have been sent and converted into Bob’s currency.

Bob receives a notification stating he has received money from Alice, including the converted amount and any message included.

### Person  to Business (P2B)
P2B transactions are financial exchanges where an individual makes payments directly to a business.

> Scenario: Clara in Zambia wants to make an instant payment for products purchased from Beauty Groceries, a business in Malawi. The currencies of the two countries differ.

 

#### Phase 1: Discovery

1. Login and Initiate Payment:

Clara logs into her mobile banking app.

She selects the option to  enter the merchant’s details manually.( Part of Phase 1), for future the option of QR Code may be incorporated

2. Identify Merchant and Currency:

The entered details allow the app to use Mojaloop’s discovery services to verify Beauty Groceries' bank and account details and currency in Malawi.

Mojaloop confirms the merchant is registered with a participating bank, displaying the business name and country.

3. Display Merchant Verification:

Clara sees Beauty Groceries’ name and other verified details on her app, confirming she is paying the correct business.

#### Phase 2: Agreement

1. Enter Payment Details and Currency Conversion:

Clara enters the total amount due as indicated on her invoice in Merchants local currency.

The app queries real-time FX rates, Transfer Fees, integrated via Mojaloop, to convert the amount into the currency of Zambia, where the business is located. 

Detailed information about the conversion rate, including any FX and transfer fees, is displayed to Clara.

2. Review and Confirm Transaction Details:

Clara reviews the converted payment amount, the recipient merchant’s details, and the final amount Beauty Groceries will receive.

The terms of the FX conversion, including fees and the FX margin, are clearly outlined.

3.Authorization and Authentication:

Clara authorizes the transaction 

#### Phase 3: Transfer

1. Initiate Payment via Mojaloop:

Clara’s bank sends a request to Mojaloop to process the transaction to Beauty Groceries' bank, incorporating all details of the currency conversion.

Mojaloop ensures the efficient routing and processing of the converted funds between the financial institutions.

2. Processing the Transaction:

The merchant’s bank in Malawi receives the transaction in its local currency, processes it instantly, and credits Beauty Groceries’ account.

Real-time updates occur on the ledgers of both banks reflecting the international transaction and currency exchange.

DRPP Records Obligations between DFSPs for eventual Settlement. 

3. Confirmation and Receipt:

Clara receives a confirmation on her app indicating the payment has been successfully processed and converted.

Beauty Groceries also receives a notification or update in their banking system that the payment has been received, including the exact amount in local currency.

#### Additional Features for Enhanced User Experience

- Transparent FX Rates: Ensure that users can view and compare real-time FX rates before committing to a transaction. 

- Multilingual Support: Provide support and documentation in multiple to facilitate clear understanding.

- Digital Receipts and Invoices: Ensure Customer and Merchant receive digital receipts and invoices for record-keeping and accounting purposes.
