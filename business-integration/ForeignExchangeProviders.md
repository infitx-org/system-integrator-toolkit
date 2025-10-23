# Foreign Exchange Providers (FXPs)
Foreign exchange providers will be the financial institutions in the scheme that provide foreign exchange services to support cross border transactions involving a currency pair.

To integrate an FXP into the scheme, they would also need to run an instance of the payment manager in their environment. They will also require a core connector to be built to support the integration for the FXP.

The foreign exchange provider’s core connector needs some information and apis to be able to perform its task.

1. How to get a quote for exchange of an amount  in a currency to another currency.
2. How to confirm the transfer for a previously requested quote.

Here is the design for how the FXP core connector will interact with the FX API of the financial institution.
The component that needs to be developed or should be present in the financial institution participating as an FXP is the FXP API. 

## FX Quoting process design
This process shows the interaction between the FXP Core connector and the financial institution’s FXP api.

![fxQuoting](/images/fxQuoting.png)

## FX Transfer Confirmation
This process shows the interaction between the FXP core connector and FXP Api when confirming a transfer

![fxTransfers](/images/fxTransfers.png)
