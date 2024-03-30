---
title: SQL
parent: Install / Uninstall
layout: default
published: true
grand_parent: My Docs
---
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

## Index Fragmentation 

```sql
    SELECT OBJECT_NAME(ind.OBJECT_ID) AS TableName
        ,ind.name AS IndexName
        ,indexstats.index_type_desc AS IndexType
        ,indexstats.avg_fragmentation_in_percent
    FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, NULL) indexstats
    INNER JOIN sys.indexes ind ON ind.object_id = indexstats.object_id
        AND ind.index_id = indexstats.index_id
    WHERE indexstats.avg_fragmentation_in_percent > 10
    ORDER BY indexstats.avg_fragmentation_in_percent DESC
```

## Rebuild Index
`ALTER INDEX ALL ON <table_name> rebuild`
        

## Rows Count
```sql
    SELECT sc.name + '.' + ta.name TableName ,SUM(pa.rows) RowCnt
    FROM sys.tables ta
    INNER JOIN sys.partitions pa ON pa.OBJECT_ID = ta.OBJECT_ID
    INNER JOIN sys.schemas sc ON ta.schema_id = sc.schema_id
    WHERE ta.is_ms_shipped = 0 AND pa.index_id IN (1,0)
    GROUP BY sc.name , ta.name
    ORDER BY sc.name DESC
```
        
