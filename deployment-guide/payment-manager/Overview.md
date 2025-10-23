# Payment Manager Deployment Guide

This guide provides a comprehensive, end-to-end approach for deploying and securing the **Payment Manager**, a core component that facilitates integration between Digital Financial Service Providers (DFSPs) and the **Mojaloop payment hub**. The Payment Manager handles critical transaction workflows and cryptographic operations that uniquely identify the DFSP within the **instant payment system**. As such, it must always be deployed **within the DFSP's administrative boundary** and remain fully under the control of the DFSP.

To accommodate diverse technical environments, the Payment Manager is packaged as a **modern containerized application**, supporting multiple deployment models including **cloud-based** and **on-premise** infrastructure.

#### Supported Deployment Options

Two primary deployment stacks are currently supported by the Mojaloop community:

1. **Kubernetes Deployment**  
   This option leverages Kubernetes, a production-grade orchestration platform that supports horizontal scaling, high availability, and declarative configuration. A Kubernetes-based version of the Payment Manager is included in the Mojaloop **Infrastructure-as-Code (IaC)** GitOps repository. This option is ideal for DFSPs with existing Kubernetes expertise and operational maturity.

2. [**Docker Compose Deployment**](./Guide.md) *(Detailed in this guide)*  
   Docker Compose offers a lightweight, straightforward approach for managing containerized services using a simple YAML-based configuration. This guide focuses on deploying the Payment Manager using Docker Compose and is particularly suited for development environments, pilot phases, or DFSPs seeking a simplified deployment pathway. It can also serve as a reference for adapting to other Docker-based hosting solutions such as **Docker Swarm**.

