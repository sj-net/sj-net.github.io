---
layout: default
title: Gists
nav_order: 2
description: "My Gists"
permalink: /gists
---


### git
---

``` powershell
    git cherry-pick <commit sha>
```

### RoboCopy
---
```powershell
robocopy 'src\' 'dest\' /A-:SH
```

S - exclude system attributes    
H - exlude hidden attribute

Note: use `/MIR` with caution. it removes the destination files if they don't exist in source.


