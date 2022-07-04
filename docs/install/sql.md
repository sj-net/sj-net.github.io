
## SQL Installation

1. Create a new instance with required name.
2. Select only Database Engine  Services, and Local DB. Local DB selection is applicable only for first instance.
3. ML Services, Polybase blah blah,SQl Server Repilication are optional.
4. Give a proper instance name. 



## Expose the instance to the LAN

1. Open SQL Configuration Manager. 
2. Expand SQL Server Network Configuration
3. Select your instance
1. Double click on Named Pipes and enable it. 
1. Double Click TCP/IP
    1. Enable
    1. Listen All - No
    1. IP Addressess Tab
        1. All IP addresses have enable option. Enable this for all IP's in this tab. 
        1. For TCP Port, enter what ever port you want but ensure port is not used. If port is being used then service won't restart. 
        1. by default 1433 is the default port.
        1. For IPAll as well, set TCP port  
1. Restart the instance in the SQL Server Services. 
        

## Firewall

1. Create or update the inbound and outbound rules with this new port.
        