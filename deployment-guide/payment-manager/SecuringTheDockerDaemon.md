# Securing the Docker Daemon

Securing the Docker Daemon is crucial to protect containerized applications from unauthorized access and potential security threats. This guide will walk you through the necessary steps to harden Docker Daemon.


## 1. Restrict Docker API Access

### Open Docker Configuration File
Modify the Docker configuration file to restrict the API to only be accessible via Unix socket, preventing external access over TCP.

```sh
sudo nano /etc/docker/daemon.json
```

### Ensure Docker is Only Accessible via Unix Socket
Update `daemon.json` to ensure Docker listens only on the Unix socket.

```json
{
  "hosts": ["unix:///var/run/docker.sock"]
}
```

### Restart Docker Service
Restart Docker to apply the changes.

```sh
sudo systemctl restart docker
```

## 2. Implement User Access Control

### Create a Docker Group
Create a Docker group to manage access to Docker commands securely.

```sh
sudo groupadd docker
```

### Add a User to the Docker Group
Grant a user access to Docker without needing `sudo`.

```sh
sudo usermod -aG docker username
```

### Restart the Session for Changes to Take Effect
After adding the user to the Docker group, restart the session.

```sh
newgrp docker
```

## 3. Limit Container Privileges

### Run a Container with Dropped Capabilities
Limit the container's capabilities to minimize the risk of privilege escalation.

```sh
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE my_container
```

### Prevent Privilege Escalation
Ensure that containers cannot escalate their privileges.

```sh
docker run --security-opt=no-new-privileges my_container
```

## 4. Configure Seccomp and AppArmor Profiles

### Use the Default Seccomp Profile
Ensure Docker containers use the default Seccomp profile to limit the available system calls.

```sh
docker run --security-opt seccomp=default my_container
```

### Apply AppArmor Profiles
Apply the default AppArmor profile to containers for additional security.

```sh
docker run --security-opt apparmor=docker-default my_container
```

## 5. Enable Logging and Monitoring

### Configure Docker Logging Driver
Set up logging for Docker containers by configuring the Docker logging driver and enabling log rotation.

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### Restart Docker Service
Restart Docker to apply logging configurations.

```sh
sudo systemctl restart docker
```

## 6. Keep Docker Updated

### Update Docker to the Latest Stable Version
Keep Docker up to date to ensure all security patches and bug fixes are applied.

```sh
sudo apt-get update
```

### Verify the Installed Version
After updating Docker, check the version to confirm the update was successful.

```sh
docker --version
```
