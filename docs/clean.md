
### Clean SQL log File.

```sql

use teamcity_ugl;

SELECT file_id, name, type_desc, physical_name, size, max_size  FROM sys.database_files; 

ALTER DATABASE teamcity_ugl
SET RECOVERY SIMPLE
GO
DBCC SHRINKFILE (teamcity_ugl_log, 1)
GO
ALTER DATABASE teamcity_ugl
SET RECOVERY FULL

SELECT file_id, name, type_desc, physical_name, size, max_size  FROM sys.database_files; 

select name, log_reuse_wait_desc from sys.databases 

```

Note: Sometimes the log file name might be different. So check them in the first query result.

### Clean bin/obj/packages folders

1. `Get-ChildItem .\ -include bin,obj,packages -Recurse | ForEach-Object ($_) { Remove-Item $_.FullName -Force -Recurse }`