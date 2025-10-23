# Deploying Payment Manager
This section provides step-by-step guidance for deploying the **Payment Manager** using **Docker Compose**, a lightweight tool for orchestrating containerized services. This method enables DFSPs to quickly stand up the Payment Manager stack for integration with the Mojaloop system, supporting secure, configurable deployments suitable for development, testing, or small-scale production use. While this guide focuses on Docker Compose, it also serves as a reference for adapting the deployment to other container platforms such as Docker Swarm.

## Prerequisites
Before deploying the Payment Manager using Docker Compose, ensure the following requirements are met:

### Minimum Machine Requirements
- **CPU:** 4 cores (8 cores recommended for optimal performance)
- **Memory:** 8GB RAM (16GB recommended for large deployments)
- **Storage:** At least 50GB of free space (more may be needed depending on transaction volume)
- **OS Version:** Ubuntu 20.04+ / CentOS 8+
- **Docker Version:** Docker Engine 20.10+ (Check Docker's version page for the latest)
- **Docker Compose:** Version 1.29+ (Check Docker Compose release notes for details)

## Public IP and DNS Configuration
For seamless connectivity, the following environment variables must be properly set and configured:

### **Public IP Configuration**
- `WHITELIST_IP`: Defines the public IP range of the VM that is whitelisted for system access.
  - Example: `WHITELIST_IP=203.0.113.0/24` (Allows access from this IP range).
  - If not configured properly, unauthorized users may gain or be denied access.

### **DNS Configuration**
- `MOJALOOP_CONNECTOR_FQDN`: Specifies the Fully Qualified Domain Name (FQDN) of the Mojaloop Connector.
  - Example: `MOJALOOP_CONNECTOR_FQDN=connector.pm4ml.example.com`
  - This must be **publicly resolvable** (i.e., an external system must be able to resolve this domain to the correct public IP).

- `CALLBACK_URL`: Defines the Virtual Machine’s domain name and SDK endpoint for communication.
  - Example: `CALLBACK_URL=https://connector.pm4ml.example.com
  - This URL is used by external services or Mojaloop components to interact with the system.
## Installing Docker and Docker Compose

### Ubuntu/Linux Installation

#### 1. Update the System
Before installing any software, update the system to the latest version to ensure all dependencies and packages are up to date.
```sh
sudo apt update && sudo apt upgrade -y
```

#### 2. Install Docker
Install Docker using the following command:
```sh
sudo apt install docker.io -y
```

#### 3. Enable Docker to Start on Boot
Ensure that Docker starts automatically when your system boots:
```sh
sudo systemctl enable --now docker
```

#### 4. Install Docker Compose
```sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

##### Note: If the Above URL is Not Working
- Visit the Docker Compose Releases Page to find the latest version.
- Copy the appropriate URL for your system (OS and architecture).
- Run the following command with the new URL:
```sh
sudo curl -L "<new-url>" -o /usr/local/bin/docker-compose
```

##### Make the Binary Executable
```sh
sudo chmod +x /usr/local/bin/docker-compose
```

#### 5. Verify Installation
```sh
docker --version
docker-compose --version
```


## Clone the Payment Manager Repository

If you have an existing Payment Manager project hosted on GitHub/GitLab, clone it:
```sh
git clone https://github.com/pm4ml/on-premise-deploy
cd payment-manager
```

Or, manually create a new directory:
```sh
mkdir payment-manager && cd payment-manager
```


## Run the Containers

#### 1. Start the Services
```sh
docker-compose up -d
```
This will:
- Pull the required images (PostgreSQL and your payment service).
- Create & start the containers.

#### 2. Check Running Containers
```sh
docker ps
```

#### 3. Verify the Deployment
Check logs to ensure services are running correctly:
```sh
docker-compose logs -f
```

Access the payment service:
- If running locally: **http://localhost:5000**
- If deployed on a server: **http://server-ip:5000**

#### 4. Managing the Deployment
- **Stop the services:**
```sh
docker-compose down
```
- **Restart the services:**
```sh
docker-compose up -d
```
- **Remove all containers & volumes (for a fresh setup):**
```sh
docker-compose down -v
```


## (Optional) Run on a Remote Server

If deploying on AWS, DigitalOcean, or another cloud server, follow these steps:

#### 1. SSH into Your Server
```sh
ssh user@your-server-ip
```

#### 2. Install Docker & Docker Compose (if not installed)
Follow the Linux installation steps above.

#### 3. Clone Your Payment Manager Project
```sh
git clone https://github.com/yourusername/payment-manager.git
cd payment-manager
```

#### 4. Run the Service
```sh
docker-compose up -d
```

#### 5. Configure Firewall (if needed)
```sh
sudo ufw allow 5000
```


## Setup Environment Variables (Best Practice)
Instead of hardcoding values in `docker-compose.yml`, use an `.env` file.

#### 1. Create an `.env` File
```sh
nano .env
```
#### 2. refere to .env.example file for env variables that can be added
```sh
on-premise-deploy/docker-compose/.env.example
```


Now, Docker Compose will load variables from `.env` for security.

## Docker Login
USING WEB-BASED LOGIN

the first step is to confirm where the image is hosted then run the following docker login command
`docker login -u <your_username> --password-stdin` This allows you to provide the password via standard input, which is useful for scripts and automation.

Use `docker login <registry_url>` This allows you to log in to a registry other than the default Docker Hub.

for additional information about the login check https://docs.docker.com/reference/cli/docker/login/
for additional information about the logout check https://docs.docker.com/reference/cli/docker/logout/
