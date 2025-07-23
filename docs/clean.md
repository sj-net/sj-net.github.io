---
title: Clean
parent: My Docs
layout: default
published: true
---
### Clean SQL log File.

```sql
use teamcity_sj_self;
SELECT file_id, name, type_desc, physical_name, size, max_size  FROM sys.database_files; 
ALTER DATABASE teamcity_sj_self
SET RECOVERY SIMPLE
GO
DBCC SHRINKFILE (teamcity_sj_self_log, 1)
GO
ALTER DATABASE teamcity_sj_self
SET RECOVERY FULL
SELECT file_id, name, type_desc, physical_name, size, max_size  FROM sys.database_files; 
select name, log_reuse_wait_desc from sys.databases 
```

Note: Sometimes the log file name might be different. So check them in the first query result.

### Clean bin/obj/packages folders

``` powershell
Get-ChildItem .\ -include bin,obj,packages -Recurse | ForEach-Object ($_) { Remove-Item $_.FullName -Force -Recurse }
```

### Clean up work directory
```powershell 
$baseDirectory =  Get-Location

function Find-GitRepos {
    param([string]$Path)

    Get-ChildItem -Path $Path -Directory | ForEach-Object {
        try {
            $gitFolder = Join-Path $_.FullName ".git"
            if (Test-Path $gitFolder) {
                # Found a git repo, process it
                Set-Location $_.FullName
                $gitStatus = git status --porcelain
                if ($gitStatus) {
                    Write-Host "Skipping git cleanup for repository: $($_.FullName) as it has changes." -ForegroundColor Red
                }
                else {
                    Write-Host "Performing git cleanup for repository: $($_.FullName)" -ForegroundColor Green
                    git clean -ffdx
                }
                } else {
                # Recurse into subdirectories
                Find-GitRepos -Path $_.FullName
            }
        } catch {
            Write-Host "Error processing directory: $($_.FullName)" -ForegroundColor Red
        }
        finally {
            Set-Location $baseDirectory
        }
    }
}

Find-GitRepos -Path $baseDirectory

function Remove-FoldersRecursively {
    param([string]$Path)

    Get-ChildItem -Path $Path -Directory -Recurse | Where-Object {
        $_.Name -in @(
            'node_modules',    # npm packages
            'bin',             # build output
            'obj',             # build output
            '.vs',             # Visual Studio workspace
            '.idea',           # JetBrains IDE settings
           # '.vscode',         # VS Code settings
           # 'dist',            # distribution/build output
            'out',             # build output
            'coverage',        # test coverage reports
            'target',          # Maven/Gradle build output
            '.pytest_cache',   # pytest cache
            '.cache',          # general cache
            '.next',           # Next.js build output
            '.nuxt',           # Nuxt.js build output
            '.angular',        # Angular build output
            'build',           # generic build output
            '.sass-cache',     # Sass cache
            '.serverless',     # Serverless framework output
            '.expo',           # Expo React Native
            '.turbo',          # Turborepo cache
            '.parcel-cache'    # Parcel cache
        )
    } | ForEach-Object {
        try {
            Remove-Item -Path $_.FullName -Recurse -Force -ErrorAction Stop
            Write-Host "Deleted folder: $($_.FullName)" -ForegroundColor Green
        } catch {
            Write-Host "Failed to delete folder: $($_.FullName)" -ForegroundColor Red
        }
    }
}

Remove-FoldersRecursively -Path $baseDirectory

function Remove-EmptyDirectories {
    param([string]$Path)

    Get-ChildItem -Path $Path -Directory -Recurse | Where-Object {
        $_.GetFileSystemInfos().Count -eq 0
    } | ForEach-Object {
        try {
            Remove-Item -Path $_.FullName -Force -ErrorAction Stop
            Write-Host "Deleted empty directory: $($_.FullName)" -ForegroundColor Green
        } catch {
            Write-Host "Failed to delete empty directory: $($_.FullName)" -ForegroundColor Red
        }
    }
}

Remove-EmptyDirectories -Path $baseDirectory

function Remove-TemporaryFiles {
    param([string]$Path)

    Get-ChildItem -Path $Path -File -Recurse | Where-Object {
        $_.Extension -in @(
            '.tmp', '.temp', '.log', '.cache', '.bak', '.swp', '.swo', '.DS_Store'
        )
    } | ForEach-Object {
        try {
            Remove-Item -Path $_.FullName -Force -ErrorAction Stop
            Write-Host "Deleted temporary file: $($_.FullName)" -ForegroundColor Green
        } catch {
            Write-Host "Failed to delete temporary file: $($_.FullName)" -ForegroundColor Red
        }
    }
}

Remove-TemporaryFiles -Path $baseDirectory
# Restore the original location
Set-Location $baseDirectory
Write-Host "Cleanup completed." -ForegroundColor Green
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Cyan
# End of clean.ps1
# This script performs a cleanup of git repositories, removes specific folders, deletes empty directories, and removes temporary files recursively from the specified base directory.
# It also handles errors gracefully and provides feedback on the operations performed.
# Usage: Run this script in PowerShell to clean up your workspace.
```