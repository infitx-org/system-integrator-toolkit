# Payment Manager
This is a tool developed to support connectivity between the DFSP and the DRPP. The 2 components of concern from the DFSP perspective are the core connector and the mojaloop connector.

## Core Connector
The core connector is a custom built middleware that provides an integration between the DFSP API and the mojaloop Connector. 

Part of the work that must be done during an integration is the development of a core connector specifically for the DFSP being integrated. This is because DFSP APIs vary across different financial institutions.

## Mojaloop Connector
The mojaloop connector is the middleware that brokers communication between the custom built core connector and the DRPP.

It is already built and will only need to be deployed as part of the Payment Manager services for it to be able to work for the DFSP being integrated.


For the Early Adopter Program, the Payment Managers will be hosted for the DFSPs in a managed environment. But when going into production, deployment tools will be provided to support the DFSPs in deploying the solution in their environments.
