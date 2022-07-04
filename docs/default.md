### dotCover
---

```dos
dotCover.exe dotnet  /Filters="-:*xunit*;-:BouncyCastle.Crypto;-:NavisphereCarrier.Onboarding.API.Contracts;-:NavisphereCarrier.RMISRegistration.Consumer.UnitTests;" /AttributeFilters=System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute --output=TestResults/report.html --reportType=HTML -- test NavisphereCarrier.RMISRegistration.Consumer.sln
```


### RoboCopy
---
```dos
robocopy 'src\' 'dest\' /A-:SH
```

S - exclude system attributes    
H - exlude hidden attribute


### Nuget
---

For pushing a package to private nuget feed.


`dotnet nuget push --source "<nuget url?" --api-key az <package path> --interactive`


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