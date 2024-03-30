---
title: Sonarqube Docker
parent: Install / Uninstall
layout: default
published: true
grand_parent: My Docs
---


## Sonarqube Docker installation steps.

1. ```docker pull sonarqube:9.4-community```
1. if database is new then execute -```ALTER DATABASE CURRENT COLLATE SQL_Latin1_General_CP1_CS_AS;``` 
1. ```docker run -d --name sonarqube_dotnet -p 9009:9000 -e SONAR_JDBC_URL="jdbc:sqlserver://192.168.1.192:1433;databaseName=sonarqube_dotnet" -e SONAR_JDBC_USERNAME=sa -e SONAR_JDBC_PASSWORD=admin@123 -v sonarqube_data:/dump/sonarqube_dotnet/data -v sonarqube_extensions:/dump/sonarqube_dotnet/extensions -v sonarqube_logs:/dump/sonarqube_dotnet/logs sonarqube:9.4-community```

[Got memory issues ?](https://stackoverflow.com/a/66547784/3465753)