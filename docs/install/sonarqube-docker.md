---
title: Sonarqube Docker
parent: Install / Uninstall
layout: default
published: true
grand_parent: My Docs
---


## Sonarqube Docker installation steps with existing MS SQL DB

1. ```docker run -d --name sonarqube_docker -p 9009:9000 -e SONAR_JDBC_URL="jdbc:sqlserver://192.168.1.192:1433;databaseName=sonarqube_docker" -e SONAR_JDBC_USERNAME=sonarqube_user -e SONAR_JDBC_PASSWORD=admin@123 -v sonarqube_data:/dump/sonarqube_docker/data -v sonarqube_extensions:/dump/sonarqube_docker/extensions -v sonarqube_logs:/dump/sonarqube_docker/logs sonarqube:lts-community```

[Got memory issues ?](https://stackoverflow.com/a/66547784/3465753)
