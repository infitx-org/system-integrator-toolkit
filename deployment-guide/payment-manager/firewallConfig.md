# Firewall Configuration in Ubuntu and AWS EC2 (t2.large)

## Introduction
Configuring a firewall is essential for securing network traffic and preventing unauthorized access. Ubuntu primarily uses **Uncomplicated Firewall (UFW)** as a front-end for **iptables**, simplifying firewall rule configurations. In AWS, **Security Groups (SGs)** act as virtual firewalls, controlling inbound and outbound traffic at the network level.

This document provides step-by-step guidance for configuring firewalls in both **Ubuntu** and **AWS EC2 (t2.large)** instances.


# Part 1: Firewall Configuration in Ubuntu

## Prerequisites
- Ubuntu 24.04.1 LTS or later
- **sudo** or root privileges.
- Basic knowledge of networking concepts (IP addresses, ports, and protocols).

## Installing and Enabling UFW
UFW is installed by default on most Ubuntu systems, but we recommend before proceeding, check if UFW is installed on your system:
```bash
dpkg -l | grep ufw

```
If not installed:
```bash
sudo apt update
sudo apt install ufw -y
```
Enable UFW:
```bash
sudo ufw enable
```
Check UFW status:
```bash
sudo ufw status verbose
```

## Allowing and Denying Traffic

### Allowing Specific Ports
To allow incoming traffic on a specific port:
```bash
sudo ufw allow <port>
```
Example: Allow SSH (port 22):
```bash
sudo ufw allow 22
```
To allow traffic for a specific protocol (TCP or UDP):
```bash
sudo ufw allow <port>/<protocol>
```
Example: Allow HTTP (port 80, TCP only):
```bash
sudo ufw allow 80/tcp
```

### Allowing Specific IP Addresses
To allow traffic from a specific IP:
```bash
sudo ufw allow from <IP>
```
Example: Allow traffic from 192.168.1.100:
```bash
sudo ufw allow from 192.168.1.100
```
To allow traffic from an IP to a specific port:
```bash
sudo ufw allow from <IP> to any port <port>
```
Example: Allow 192.168.1.100 access to SSH (port 22):
```bash
sudo ufw allow from 192.168.1.100 to any port 22
```

### Denying Specific Ports or IPs
To block a port:
```bash
sudo ufw deny <port>
```
Example: Deny FTP (port 21):
```bash
sudo ufw deny 21
```
To block traffic from a specific IP:
```bash
sudo ufw deny from <IP>
```
Example: Block traffic from 203.0.113.50:
```bash
sudo ufw deny from 203.0.113.50
```

## Deleting Rules
To delete a specific rule, first list the numbered rules:
```bash
sudo ufw status numbered
```
Then delete a rule using its number:
```bash
sudo ufw delete <rule_number>
```
Example: Delete rule number 3:
```bash
sudo ufw delete 3
```

## Advanced Configurations

### Allowing a Range of Ports
To allow a range of ports (e.g., 1000-2000 TCP):
```bash
sudo ufw allow 1000:2000/tcp
```

### Allowing a Subnet
To allow an entire subnet (e.g., 192.168.1.0/24):
```bash
sudo ufw allow from 192.168.1.0/24
```

### Logging Firewall Activity
To enable logging of firewall activity:
```bash
sudo ufw logging on
```
To check logs:
```bash
tail -f /var/log/ufw.log
```

## Resetting UFW
If you need to reset UFW and start fresh:
```bash
sudo ufw reset
```

## Verifying Firewall Configuration
To check the current firewall rules:
```bash
sudo ufw status verbose
```
To check active network connections:
```bash
sudo netstat -tulnp
```
or
```bash
sudo ss -tulnp
```


# Part 2: Firewall Configuration in AWS EC2 (t2.large)

## Understanding AWS Security Groups
AWS **Security Groups (SGs)** act as virtual firewalls controlling traffic at the instance level. Unlike UFW, which operates at the OS level, Security Groups apply before traffic reaches the instance.

## Important Recommendation
Firewall settings and configurations may vary based on your cloud provider and deployment environment. We strongly recommend consulting with your cloud provider or system administrator for precise firewall setup. However, as an example, below is a general guide for configuring **AWS Security Groups**.

## Configuring AWS Security Groups for EC2 (t2.large)

Security Groups (SGs) are **stateful virtual firewalls** operating at the instance level within a Virtual Private Cloud (VPC). They control inbound and outbound traffic and are critical for securing cloud infrastructure.


### 1. Accessing Security Groups

- Sign in to the **AWS Management Console**.
- Navigate to:  
  `EC2 Dashboard > Network & Security > Security Groups`.


### 2. Creating or Modifying a Security Group

- Click **Create Security Group** or select an existing SG to update.
- Provide a meaningful **name** and **description** to facilitate auditing.
- Attach the SG to the appropriate **VPC**.

> 🧩 SGs are scoped to VPCs; ensure you are working within the correct VPC context.


### 3. Configuring Inbound Rules

Click **Inbound rules > Edit inbound rules** to define allowed inbound traffic.

#### Example 1: SSH Access from a Trusted IP
- **Protocol**: TCP  
- **Port Range**: 22  
- **Source**: `203.0.113.50/32`

> ⚠️ Restrict SSH access to trusted IPs only. Avoid using `0.0.0.0/0` in production environments.

#### Example 2: HTTP Access from Anywhere
- **Protocol**: TCP  
- **Port Range**: 80  
- **Source**: `0.0.0.0/0`

> ✅ Acceptable for public-facing web applications. Use WAF or ALB for additional protection.


### 4. Configuring Outbound Rules

Outbound traffic is **allowed by default** in AWS Security Groups.

- To restrict outbound traffic:
  - Click **Outbound rules > Edit outbound rules**.
  - Define rules using the same protocol/port/source structure.

> 🔐 Best Practice: Limit outbound access to essential services only (e.g., S3, RDS, specific IPs) to reduce attack surface.


## Verifying Security Group Assignments

To validate SG rules and assignments:

- Navigate to `EC2 Dashboard > Instances`.
- Select your instance and review the **Security** tab.
- Confirm that the correct **Security Groups** are attached.
- Cross-check **inbound** and **outbound** rules against your access policy.


## Combining UFW with AWS Security Groups

When using **host-based firewalls** (e.g., UFW on Ubuntu) in conjunction with **AWS Security Groups**, it is critical to ensure **rule alignment** across both layers.

- **AWS Security Groups** operate at the **virtual network interface level** (hypervisor), acting as a first-line, stateful firewall.
- **UFW (Uncomplicated Firewall)** operates at the **OS level** within the instance itself.

> 🔁 Traffic allowed by a Security Group may still be blocked by UFW if corresponding host-level rules are not in place.

- Example: If the Security Group allows SSH (22) from 203.0.113.50, but UFW blocks it, access will still be denied.
- Run `sudo ufw status` to ensure UFW rules are correctly configured.


# Troubleshooting

### Ubuntu Firewall Issues
- **Firewall rules not applying:** Ensure UFW is enabled: `sudo ufw enable`.
- **Locked out of SSH:** If you accidentally block SSH, use console access or another network path to run:
  ```bash
  sudo ufw allow 22
  ```
- **Service not accessible:** Check if the application is running and listening on the correct port:
  ```bash
  sudo netstat -tulnp | grep <port>
  ```
  or
  ```bash
  sudo ss -tuln
  ```

### AWS Security Group Issues
- **Security Group blocking traffic:** Verify rules in the AWS Security Group settings.
- **Incorrect Security Group assigned:** Ensure your EC2 instance is associated with the correct Security Group.
-Subnet-level blockage (NACLs): Check Network ACLs for conflicting deny rules, particularly for ephemeral ports or custom ranges.


# Conclusion
This document provides a comprehensive guide to configuring Ubuntu’s firewall using UFW, as well as managing firewall rules using AWS Security Groups for EC2 (t2.large) instances. Proper firewall configuration enhances security by controlling network access efficiently at both the OS and cloud network levels.


