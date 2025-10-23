# Configuring the core connectors
## Objective
This guide documents the step-by-step process of:
- Configuring the core connector service using profile-based deployment for production-ready DFSP implementations
- Creating a custom configuration for managing shared environment variables used by all core connectors (MNOs, Banks, etc)
- Utilizing docker-compose profiles for clean and maintainable deployments 

### Step 1: Configuring sim-backend to use a Core Connector
#### **Background:**
The docker-compose architecture now supports profile-based deployments with dedicated services:
- **`core-connector`**: Production-ready service for real DFSP implementations
- **`portal`**: Payment manager portal UI

Both services can use the same core connector images but are deployed with different profiles for better service organization and deployment flexibility.
#### **Action Taken:**
- Add the core connector image (CORE_CONNECTOR_IMAGE) and tag (CORE_CONNECTOR_TAG) in the .env file docker-compose/.env
```sh
GET_SERVICES_FXP_RESPONSE= # e.g, test-fxp
PM4ML_ENABLED=true
SUPPORTED_CURRENCIES= # e.g., MWK

## Sim Backend
CORE_CONNECTOR_IMAGE= # e.g, mojaloop/fsp-ug-core-connector
CORE_CONNECTOR_TAG= # e.g, v1.25.0
```
- Create a separate `core-connector-config.env` file to configure the core connector environment variables. This file is used by the core-connector service when running as a production core connector.
- The docker-compose.yaml file now supports profile-based deployments with dedicated services:
**Core Connector Service (Production)**:
```yaml
core-connector:
    image: ${CORE_CONNECTOR_IMAGE:-mojaloop/ml-testing-toolkit}:${CORE_CONNECTOR_TAG:-v18.5.1}
    profiles:
      - core-connector
    env_file:
        - core-connector-config.env
    ports:
      - "3003:3003"
      - "3004:3004"
    volumes:
      - ./core-connector-config/:/opt/app/core-connector-config/
    environment:
      # SERVER CONFIGS
      - DFSP_SERVER_HOST=0.0.0.0
      - DFSP_SERVER_PORT=3004
      - SDK_SERVER_HOST=0.0.0.0
      - SDK_SERVER_PORT=3003
      - DFSP_API_SPEC_FILE=./core-connector-config/core-connector-api-spec-dfsp.yml
      - SDK_API_SPEC_FILE=./core-connector-config/core-connector-api-spec-sdk.yml
      # Mojaloop Connector
      - SDK_BASE_URL=http://sdk-scheme-adapter:4001
```
**Deployment Commands**:

Deploy with core connector:
```bash
docker-compose --profile core-connector up -d
```

Deploy with core connector and portal:
```bash
docker-compose --profile core-connector --profile portal up -d
```

**UI Services Configuration**:

The architecture includes separate UI services for each backend type:

**Core Connector UI**:
```yaml
core-connector-ui:
    image: mojaloop/ml-testing-toolkit-ui:v16.0.4
    profiles:
      - core-connector
    ports:
      - "6062:6060"
    environment:
      - API_BASE_URL=http://localhost:3003
      - AUTH_ENABLED=FALSE
```

The key configuration changes include:
- **Profile-based deployment**: Use `--profile core-connector` and `--profile sim-backend`
- **Dedicated services**: Separate `core-connector` and `sim-backend` services with different port mappings
- **Separate UI services**: `core-connector-ui` (port 6062) and `sim-backend-ui` (port 6061) for better service isolation
- **Environment file separation**: Core connector uses `core-connector-config.env` for configuration
- **Volume mounting**: Core connector configuration files and API specifications
- **Service discovery**: Internal Docker networking for service communication

**Service Port Mapping**:

| Service | Profile | Internal Port | External Port | Purpose |
|---------|---------|---------------|---------------|---------|
| core-connector | core-connector | 3003, 3004 | 3003, 3004 | Production backend API |
| sim-backend | sim-backend | 4040, 5050 | 5052, 5051 | Development backend API |
| core-connector-ui | core-connector | 6060 | 6062 | Core connector UI |
| sim-backend-ui | sim-backend | 6060 | 6061 | Sim backend UI |

- If no core connector image is specified (CORE_CONNECTOR_IMAGE is empty), the service will default to using the ml-testing-toolkit as a core connector.

### Step 2: Creating the Core Connector Configuration File
#### **Problem:**
Each core connector requires specific configurations that need to be managed separately from the main environment variables.
#### **Solution:**
We create a dedicated `core-connector-config.env` file that contains all the necessary environment variables for the core connector. This file is referenced by the sim-backend service in the docker-compose configuration.
### Shared/Common Variables for core-connector-config.env:
| Variable                  | Example |
|---------------------------|-------------|
| FSP_ID    | Identifier type (e.g., dfsp1) |
| CONNECTOR_NAME       | e.g.,DFSP-UG |
| LEI| e.g.,dfspuganda |

### Shared Configuration Block for core-connector-config.env:
```sh
# Mojaloop Connector Config for core connector
FSP_ID= #e.g., dfsp1
CONNECTOR_NAME= #e.g.,DFSP-UG
LEI= #e.g.,dfspuganda
```

### Step 3: Customizing DFSP-Specific Configuration Variables
The following variables are provided as a sample and should be added to the `core-connector-config.env` file. Each DFSP requires unique values:
| Variable                  | Example |
|---------------------------|-------------|
| BASE_URL   | sandbox.com |
| COLLECTION_API_KEY       |  |
| COLLECTION_CLIENT_ID    |  |
| COLLECTION_SUBSCRIPTION_KEY    |  |
| DISBURSEMENT_API_KEY    |  |
| DISBURSEMENT_CLIENT_ID    |  |
| DISBURSEMENT_SUBSCRIPTION_KEY    |  |
| TARGET_ENVIRONMENT    | sandbox |
| SUPPORTED_ID_TYPE    | MSISDN |
| CBS_NAME    |  |
| X_COUNTRY    | UG |
| SERVICE_CHARGE    | 0 |
| EXPIRATION_DURATION    | 1 |
| HTTP_TIMEOUT    | 5000 |
| ENV    | staging |
| DFSP_CURRENCY    | UGX |

### DFSP-Specific Configuration Block for core-connector-config.env:
```sh
# These are only provided as sample
BASE_URL= #e.g.,sandbox.com
COLLECTION_API_KEY= #e.g.,b1207baca1d343b581cc21346904c707
COLLECTION_CLIENT_ID= #e.g.,c87a6e02-aa8c-4eaf-827a-d5d90e744241
COLLECTION_SUBSCRIPTION_KEY= #e.g.,5f40c404bf0c4e4f9b37e533d4993dd7
DISBURSEMENT_API_KEY= #e.g.,1188de4fcff9436f826cd1151985d7fe
DISBURSEMENT_CLIENT_ID= #e.g.,980fa27a-16dc-4432-b589-7733a02008cf
DISBURSEMENT_SUBSCRIPTION_KEY= #e.g.,85ce32bfcd8a44aaab993ebac601ff46
TARGET_ENVIRONMENT= #e.g.,sandbox
SUPPORTED_ID_TYPE= #e.g.,MSISDN
CBS_NAME= #e.g.,FSP
X_COUNTRY= #e.g.,UG
X_CURRENCY= #e.g.,EUR
SERVICE_CHARGE= #e.g.,0
EXPIRATION_DURATION= #e.g.,1
HTTP_TIMEOUT= #e.g.,5000
ENV= #e.g.,staging
DFSP_CURRENCY= #e.g.,UGX
```
### Final core-connector-config.env Configuration
Here is what the complete `core-connector-config.env` file should look like:
```sh
# Mojaloop Connector Config for core connector
FSP_ID= #e.g., dfsp
CONNECTOR_NAME= #e.g.,DFSP-UG
LEI= #e.g.,dfspuganda
## DFSP-Specific Config - env variables can change as per the core connector being used
# These are only provided as sample
BASE_URL= #e.g.,sandbox.com
COLLECTION_API_KEY= #e.g.,b1207baca1d343b581cc21346904c707
COLLECTION_CLIENT_ID= #e.g.,c87a6e02-aa8c-4eaf-827a-d5d90e744241
COLLECTION_SUBSCRIPTION_KEY= #e.g.,5f40c404bf0c4e4f9b37e533d4993dd7
DISBURSEMENT_API_KEY= #e.g.,1188de4fcff9436f826cd1151985d7fe
DISBURSEMENT_CLIENT_ID= #e.g.,980fa27a-16dc-4432-b589-7733a02008cf
DISBURSEMENT_SUBSCRIPTION_KEY= #e.g.,85ce32bfcd8a44aaab993ebac601ff46
TARGET_ENVIRONMENT= #e.g.,sandbox
SUPPORTED_ID_TYPE= #e.g.,MSISDN
CBS_NAME= #e.g.,FSP
X_COUNTRY= #e.g.,UG
X_CURRENCY= #e.g.,EUR
SERVICE_CHARGE= #e.g.,0
EXPIRATION_DURATION= #e.g.,1
HTTP_TIMEOUT= #e.g.,5000
ENV= #e.g.,staging
DFSP_CURRENCY= #e.g.,UGX
```

### Step 4: Testing the core connector
to test the core connector:
- Open ttk
- go to test runner
- load testing-toolkit/collections/core-connector/cc_golden_path.json
- Update the env variables for the ttk using the environment manager button on the right side of the screen, near run
- Load the cc_golden_path.env
- Run the test

Verify the functionality of core connector based on this
