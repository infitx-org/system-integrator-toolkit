# Payment Manager Deployment Guide
This guide details all the steps required to host a docker compose deployment of Payment Manager.

### Scope of the Guide

This guide walks through the following key areas:

- Deploying the Payment Manager using Docker Compose
- Setting up and integrating a Core Connector
- Securing the deployment environment (Docker daemon, firewall, access control)
- Connecting the Payment Manager to a Mojaloop live hub
- Running test transfers to verify system readiness

## 1. Core Connector

The **Core Connector** is middleware between a DFSP’s core banking system and the Mojaloop platform. It is responsible for:

- Translating APIs and messages (e.g., ISO 20022)
- Routing transactions securely and efficiently
- Ensuring compliance and fault tolerance

The [Core Connector Guide](./CoreConnectorSetup.md) details the configuration and deployment of a Core Connector, a crucial middleware component that facilitates communication between a DFSP's Core Banking System and the Mojaloop platform.
#### **Key Concepts:**
- It explains the Core Connector's roles, including transaction processing and routing, API transformation, security and compliance, error handling, and performance optimization.

#### **Development Environment Setup:**
- The document provides step-by-step instructions for setting up a development environment, covering prerequisites like installing necessary tools (Docker, Node.js, TypeScript, Git), configuring environment variables, and running the Core Connector

## 2. Deploying Payment Manager

#### Purpose

Simplify deployment of the Payment Manager in a portable and consistent way across environments.

#### Deployment Guide
The [Deploying Docker Compose Payment Manager Guide](./DeployingDockerComposePayment.md) focuses on deploying a Payment Manager using Docker Compose, streamlining its integration with the Mojaloop system for secure payment processing.

#### Best Practices

- Use environment variables for sensitive configuration
- Use Docker volumes for data persistence

## 3. Deploying Core Connector
The default deployment includes a simulated backend. 
The [configuring a custom Core-Connector Guide](./ConfiguringACustomCoreConnector.md) describes how to replace the mock backend (`sim-backend`) with your DFSP’s Core Connector.

#### Steps

- Replace the `sim-backend` service in `docker-compose.yml`
- Define shared and DFSP-specific environment variables
- Use naming conventions (`FSP_ID`, `CONNECTOR_NAME`) for clarity and reusability
- Validate integration by running connectivity tests to Mojaloop

## 4: Securing the Docker Daemon

The [Securing TheDocker Daemon](./SecuringTheDockerDaemon.md) file provides essential security best practices for protecting the Docker Daemon and containerized applications.
#### **Security Measures:**
- It covers enabling TLS for secure communication, restricting Docker API access, implementing user access control, limiting container privileges, configuring Seccomp and AppArmor profiles, enabling logging and monitoring, keeping Docker updated, restricting container networking, scanning images for vulnerabilities, and enabling resource limits.

#### **Goal:**
- To harden the Docker environment against unauthorized access and potential security threats.

## 5. Connecting to a Hub
The [Connect To Live Hub](./connectToLiveHub.md) file outlines the process of connecting the Mojaloop Payment Manager to a live hub using Docker Compose.
- Prerequisites: It lists requirements such as Docker and Docker Compose installation, the Payment Manager repository, hub access credentials and endpoint details, and network access on specific ports.
- Configuration: It details how to configure common and management API environment variables (e.g., `DFSP_ID`, `AUTH_CLIENT_ID`, `HUB_IAM_PROVIDER_URL`).
- Troubleshooting & Security: The document also covers troubleshooting connection errors and using "Recreate" buttons to revoke and recreate TLS and JWS certificates for security updates.
## 6: Firewall Configuration
The [firewall Config](./firewallConfig.md) file provides a comprehensive guide to configuring firewalls in Ubuntu and AWS EC2 instances.
- Ubuntu (UFW): It explains how to install, enable, and use Uncomplicated Firewall (UFW) to allow and deny specific ports, IP addresses, and manage rules.
- AWS (Security Groups): It describes how to configure AWS Security Groups to control inbound and outbound traffic for EC2 instances.
- Interaction: The document highlights the interaction between UFW and AWS Security Groups and provides troubleshooting tips for common firewall issues.
## 7: Test Transfer Process
The [Test Transfer](./TestTransfer.md) file outlines the process for sending test transfers to verify connectivity across different transfer types: Outbound, Inbound, and FXP Transfers.
- Prerequisites: It notes that the Mojaloop Testing Toolkit (TTK) should be running and required test collection files should be available.
- Test Execution Workflow: The document provides steps for executing tests using the TTK Admin UI, including navigating to the Test Runner, using the Collection Manager to select test cases, and reviewing results.
- Optional Configuration: It includes instructions for configuring the ISO 20022 message format if applicable.
- Troubleshooting: It offers guidance on accessing logs via both the UI and CLI for troubleshooting failures.

::: tip Summary
In summary, these documents collectively provide a robust framework for setting up, deploying, securing, and integrating a Payment Manager and Core Connector within the Mojaloop ecosystem, with a clear path towards connecting to live hubs and ensuring system integrity.
:::
