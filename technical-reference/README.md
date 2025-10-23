
# Technical Reference

This section provides comprehensive technical reference materials, API documentation, and advanced integration patterns for developers and system architects working with Mojaloop integration.

## Who Should Use This Section

- **Developers** seeking detailed API specifications and technical references
- **System Architects** needing comprehensive component documentation  
- **Integration Teams** requiring specification details and standards
- **Technical Writers** creating implementation documentation
- **Support Teams** troubleshooting and resolving technical issues

## Cross-Currency Payments

- [Currency Conversion Design](./currency-conversion/Cross-border%20\(FX\)%20Design.md) - Comprehensive guide to foreign exchange integration patterns and cross-border payment implementation

## Inter-scheme Payments

- [Inter-scheme Integration](./inter-scheme/Readme.md) - Patterns and implementations for inter-scheme payment processing

## Integration Patterns & Architecture

- [IIPS Design Patterns](./IIPSDesignPatterns.md) - Integration design patterns with detailed sequence diagrams for Payer and Payee DFSP scenarios

## API & Request Handling

- [Request Handling](./RequestHandling.md) - Advanced request processing and handling patterns
- [Error Handling](./ErrorHandling.md) - Error handling patterns, recovery mechanisms, and resilience strategies  
- [Service Architecture](./Service.md) - Core service architecture and component design patterns
- [Core Connector Aggregate](./CoreConnectorAggregate.md) - Advanced aggregation patterns and implementation

## Configuration & Setup

- [Configuration](./Configuration.md) - System configuration parameters and settings
- [Networking](./Networking.md) - Network configuration and connectivity requirements
- [CBS Client Integration](./CBSClient.md) - Connecting to Core Banking Systems
- [Upload Identifiers](./UploadIdentifiers.md) - Identifier management and upload processes

## Quick Access Reference

This section serves as both advanced implementation guidance and quick reference for experienced developers working with Mojaloop integration patterns.

## Mojaloop Participation Tools Overview

The participation tools are an open-sourced collection of artifacts and software solutions to support organizational participation in a Mojaloop switch, including:
- Financial service providers (DFSPs) who provide account-related services
- Financial technology providers (PISPs) who initiate payments
- Foreign exchange providers who sell currency to support payments

Key participation tool artifacts include:

1. **Mojaloop Connector** - Main participation tool component providing FSPIOP API abstraction
2. **Payment Manager** - Deployment and configuration support for Mojaloop Connector
3. **DFSP Liquidity Design Guide** - Business operational design guidance
4. **Integration Design Patterns** - Detailed sequence diagrams and implementation patterns
5. **Core-Connector Testing Harness** - Testing and validation tools
6. **Core-Connector Template** - Development template and best practices




