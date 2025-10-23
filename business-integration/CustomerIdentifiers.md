# Customer Identifiers
In the context of the Digital Retail Payment Platform (DRPP), customer identifiers play a critical role in enabling accurate and efficient routing of cross-border, real-time payments. Each Digital Financial Services Provider (DFSP) is responsible for managing and registering customer identifiers as part of their integration with the DRPP.

DFSP Responsibilities:
1. **Identifier Selection**<br>Each DFSP must determine the type of customer payment identifier to be used within their systems (e.g., mobile number, national ID, email address, etc.).
1. **Customer Communication**<br>DFSPs are required to clearly inform their customers of the selected identifier type. Customers must understand what identifier to share with others who intend to send payments to them.
1. **Registration with DRPP** <br>DFSPs must register each customer identifier with the DRPP. This enables the platform to correctly route incoming payments to the appropriate DFSP and end-customer account.

Each DFSP must evaluate which identifier types align with their customer base and systems, and ensure accurate registration with the DRPP.

## Identifier Selection

In the Digital Retail Payment Platform (DRPP), customer identifiers are central to ensuring payments are correctly routed across borders and currencies. These identifiers allow the DRPP to associate a payment with the correct recipient—whether an individual, merchant, business, or account.

### Types of Identifiers

Broadly, identifiers fall into two categories:

1. **Person or Merchant Identifiers** – These are preferred as they are generally stable and easily communicated by customers. They refer to the identity of a participant rather than a specific account.
2. **Account Identifiers** – These directly reference specific financial accounts. While supported, they are more sensitive to changes and less user-friendly for customer communication.

The DRPP supports both categories, providing flexibility to DFSPs based on their customer needs and integration approach.

### Identifier Structure

All identifiers consist of the following components:

- **Identifier Type** (Required): Defines the nature of the identifier (e.g., MSISDN, EMAIL, IBAN).
- **Identifier** (Required): The actual value used to identify the participant.
- **Sub-Identifier** (Optional): Used to further disambiguate the identifier, ensuring uniqueness across the platform where necessary. For example, it may include the country code and DFSP identifier.

### Supported Person or Merchant Identifiers Types

| Type           | Description |
|----------------|-------------|
| `MSISDN`       | Mobile phone number in international format (ITU-T E.164). May be prefixed with a plus (+). |
| `EMAIL`        | Email address in standard format as per RFC 3696. |
| `PERSONAL_ID`  | Government-issued or national personal identification number. Type specified in `PartySubIdOrType`. |
| `BUSINESS`     | Identifier representing a business or organization. May include `PartySubIdOrType` for internal references like invoice or customer ID. |
| `DEVICE`       | Device ID such as POS terminal or ATM under a business. Use `PartySubIdOrType` for device-specific references. |
| `ALIAS`        | Alternative reference such as a username. Flexible format, `PartySubIdOrType` can be used for sub-account reference. |

### Supported Account Identifiers Types

| Type           | Description |
|----------------|-------------|
| `ACCOUNT_ID`   | Account number or ID within a financial service provider. Format is flexible. |
| `IBAN`         | International Bank Account Number (up to 34 alphanumeric characters, no spaces). |
| `ALIAS`        | Alternative reference similar to an IBAN that represents the account uniquely withing the DRPP |

## Best Practices for Identifier Selection

Selecting the appropriate identifier type is essential for usability, reliability, and long-term maintainability. DFSPs should consider the context in which identifiers will be used and the needs of their customer base when making this decision.

### 1. Retail Customers (Person-to-Person Payments)
- **Recommended Identifiers**: `MSISDN`, `EMAIL`, `PERSONAL_ID`, `ALIAS`
- **Rationale**: These identifiers are easy for individuals to remember and share. `MSISDN` and `EMAIL` are widely used and generally stable. `ALIAS` provides flexibility where users want privacy or branded usernames.
- **Notes**: Encourage customers to register identifiers that are unlikely to change frequently (e.g., avoid temporary email addresses).

### 2. Merchants and Small Businesses
- **Recommended Identifiers**: `BUSINESS`, `DEVICE`, `ALIAS`
- **Rationale**: `BUSINESS` identifiers support organization-level payments, while `DEVICE` is useful for location-specific transaction routing (e.g., POS terminals). `ALIAS` can be used for branded payment handles.
- **Notes**: Clearly communicate to merchants how their identifier will be presented to customers.

### 3. Corporate or Enterprise Customers
- **Recommended Identifiers**: `BUSINESS`, `ACCOUNT_ID`, `IBAN`
- **Rationale**: For precise account-level routing and compliance, financial identifiers like `ACCOUNT_ID` or `IBAN` are preferred. `BUSINESS` allows routing at the organization level, with optional `PartySubIdOrType` for department-level granularity.
- **Notes**: Ensure account identifiers are validated and comply with country-specific formatting rules.

### 4. Government Disbursements or High-Trust Services
- **Recommended Identifiers**: `PERSONAL_ID`, `MSISDN`
- **Rationale**: These identifiers support identity verification and traceability. Useful for social payments, benefits, or regulated transfers.
- **Notes**: Be aware of data protection requirements; sensitive identifiers should be securely handled and stored.

### 5. Agent Networks and Financial Devices
- **Recommended Identifiers**: `DEVICE`, `ACCOUNT_ID`
- **Rationale**: When payments need to be routed to a specific terminal or cash-out point, `DEVICE` provides traceability. `ACCOUNT_ID` ensures funds are credited to the correct back-end account.
- **Notes**: Use `PartySubIdOrType` to differentiate devices within the same organization if needed.

## Typical Identifier Examples

The following examples illustrate common approaches to identifier selection and formatting within the DRPP. Each approach has specific benefits and trade-offs depending on the use case, customer experience, and technical implementation.

---

### MSISDN (e.g., `+256771234567`)
A mobile phone number in international format.

- **Pros**:
  - Familiar and easy for customers to remember and share.
  - Typically unique and widely adopted in mobile-first markets.
  - Low barrier to adoption, especially for retail customers.

- **Cons**:
  - Can change due to number portability or SIM replacement.
  - May not be suitable for business or multi-account use cases.
  - Regulatory or privacy concerns in some jurisdictions.
  - May result in conflicts or duplication if both banks and mobile money operators register the same MSISDN for different accounts, potentially leading to ambiguity or incorrect routing.
---

### ACCOUNT_ID with Sub-Identifier (e.g., `1234567890` with sub-ID `UG-ORG001`)
The account number identifies the customer, while the sub-ID encodes routing metadata such as country and organization.

- **Pros**:
  - Enables precise routing to specific financial accounts.
  - Useful for DFSPs with complex account hierarchies.
  - Sub-ID adds disambiguation and avoids global collisions.

- **Cons**:
  - Less user-friendly—customers are unlikely to remember or share it easily.
  - Tightly coupled to internal DFSP systems; harder to abstract or change.
  - Requires careful design of the sub-ID schema to avoid conflicts.

---

### ALIAS with IBAN-like Format (e.g., `UG-ORG001-123456`)
An alias prefixed with a country code and organization ID to resemble an IBAN structure.

- **Pros**:
  - Standardized and predictable format that supports interoperability.
  - Familiar to users in markets where IBANs are common.
  - Easier to validate or parse programmatically.

- **Cons**:
  - Customers may require guidance to understand and use it correctly.
  - May imply regulatory or formatting expectations not enforced by DRPP.
  - Risk of format collisions if not governed consistently by the DFSP.

---

### ALIAS using Merchant Code with Sub-Identifier (e.g., `12345` with sub-ID `UG-ORG001`)
An alias structure based on merchant code, while the sub-ID encodes routing metadata such as country and organization.

- **Pros**:
  - Suitable for business or merchant payment scenarios.
  - Enables structured routing across countries and organizations.
  - Supports scalability and decentralization in merchant onboarding.

- **Cons**:
  - May be opaque to end users unless explained well.
  - Requires a consistent format and merchant code governance.
  - Can increase complexity in validation and lookup processes.

---

DFSPs should select identifier strategies based on their customer segments, operational model, and long-term scalability considerations.

### Customer Communication

Each DFSP maintains direct interaction with its own customers and is best positioned to determine how to communicate service details, including the use of payment identifiers.

The DRPP does not define or mandate how this communication should be carried out. However, for the platform to function effectively, it is important that customers are made aware of the identifier they should use when receiving payments via the DRPP.

The key requirement is that customers understand which identifier to share with others, ensuring payments can be correctly routed and received through the platform.

### Registration with DRPP

To enable routing of payments through the Digital Retail Payment Platform (DRPP), customer identifiers must be registered with the platform. This registration is treated as an **opt-in/opt-out process**, allowing flexibility for both individual and bulk onboarding of customers.

#### Registration Approaches

There are two supported approaches for registering customer identifiers:

1. **Individual Opt-In**  
   A customer is registered on the DRPP individually, typically through a customer-driven action such as a consent flow, digital channel, or in-person onboarding.

2. **Bulk Opt-In**  
   Multiple customer identifiers are registered with the DRPP as part of a batch or pre-approved process. This is often used for onboarding existing customer bases or enterprise clients.

#### Integration Requirements

The DRPP provides a unified integration endpoint that supports both individual and bulk registration workflows, including opt-in and opt-out operations.

DFSPs must design and implement appropriate integration mechanisms to:
- Facilitate customer opt-in and opt-out actions,
- Manage registration lifecycle events (e.g., updates, removals),
- Ensure that only active and authorized identifiers are registered on the platform.

The DRPP relies on this registration process to route payments accurately. DFSPs are encouraged to ensure registration flows are reliable, secure, and aligned with their internal customer management practices.

