---
title: My Docs
layout: default
has_children: true
published: true
---

### dotCover
---

``` powershell
$temp_folder = $env:TEMP+'\'+$env:ComputerName+'\random_folder_name'
$sln = './my-solution.sln'
dotnet dotcover test  $sln -c Debug --collect "XPlat Code Coverage" --dcOutput="$temp_folder\Coverage\coverage.snapshot" --dcAttributeFilters="System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute"  --dcFilters="-:*Tests*;"
dotnet dotCover report --source="$temp_folder\Coverage\coverage.snapshot" --output="$temp_folder\Coverage\coverage.xml" --reportType="DetailedXML"
reportgenerator -reports:$temp_folder\Coverage\coverage.xml -targetdir:$temp_folder\Reports\ -reporttypes:"HtmlInline_AzurePipelines_Dark"
Invoke-Item $temp_folder\Reports\index.html
```


### RoboCopy
---
```powershell
robocopy 'src\' 'dest\' /A-:SH
```

S - exclude system attributes    
H - exlude hidden attribute

Note: use `/MIR` with caution. it removes the destination files if they don't exist in source.



### Nuget
---

For pushing a package to private nuget feed.


```powershell
dotnet nuget push --source "<nuget url?" --api-key az <package path> --interactive
```


### Powershell

---
#### 1. Stop, deploy and start IIS

```powershell
$ErrorActionPreference = "Stop"
$pwd = "current working directory"
$targetServer = "server / computer name"
$cred = Get-Credential -UserName Administrator -Message "Password for $targetServer" 
$siteName ="iis site name"
$projectFile ='project file path'
$destFolder ='dest folder'
# stop iis.
invoke-command -computername $targetServer -scriptblock {Stop-IISSite -Name $using:siteName  -Confirm:$false} -Credential $cred  
cd $pwd
# create temp directory for published out.
$tempDir = [System.IO.Path]::GetTempPath()
[string] $dirPath = Join-Path $tempDir 'project name' 
if (Test-Path $dirPath) {
Remove-Item -LiteralPath $dirPath -Recurse -Force 
}
New-Item -ItemType Directory -Path $dirPath
# publish
dotnet publish $projectFile -c Release --force -o $dirPath  --runtime "win-x64" --self-contained 
#/p:PublishSingleFile=true /p:PublishTrimmed=true /p:PublishReadyToRun=true
# copy the files. 
robocopy $dirPath $destFolder /A-:SH
#start iis
invoke-command -computername $targetServer -scriptblock {Start-IISSite -Name $using:siteName } -Credential $cred 
```

### Teams login hint
`https://teams.microsoft.com/?tenantId=<tenant id>&login_hint=your.em@il.com`