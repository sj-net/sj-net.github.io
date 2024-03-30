---
title: Windows
parent: Install / Uninstall
layout: default
published: true
grand_parent: My Docs
---

## Create primary partition 

1. `diskpart`
1. `list disk`
1. `select disk ` - append your disk number at last. Choose your disk properly.
1. `list partition`
1. `list volume`
1. `clean` - caution: this formats everything on disk without confirmation. so double check you selected proper disk. 
1. `create partition primary`
1. `format quick fs=ntfs` caution: normal formatting takes too much of time.
1. `active` - marks partition as active. 
1. `assign LETTER=C` - assign some letter. and it's optional.
1. `exit`

---
## Create bootable USB

1. Create primary partition. 
2. Copy all installation media content nromally.

---

## Run a VM on a physcial machine. 

### Creating a WIM file. 

1. Create a full backup of your server/client os on to a pendrive or shared location. 
1. Take  a USB(pendrive or HDD) connect it to your machine. And execute below scripts. 
1. Am considering driver letter as "D"
1. `md D:\Mount, D:\Capture`
1. `Mount-WindowsImage -ImagePath "D:\full_path_to.vhdx" -Path D:\Mount -Index 1`
1. Once mounted if you want to clean any unneccesary file then you can do at this step. like cache folders, app data content, temp folders, windows updates folders etc.
1. `New-WindowsImage -CapturePath D:\Mount -Name WinBackup -ImagePath D:\Capture\Backup.wim -Description "Windows Backup" -Verify` - this takes time and it won't show any progress for a quite good amount of time based on your backup size. 
1. `Dismount-WindowsImage -Path D:\Mount -Discard`- dismount image once completed.

### Installing WIM file. 

1. Create a bootable USB(pendrive or HDD). Better to have another srive or copy the contents of D drive and then do this step else you will loose you WIM file created in above process.
1. Ensure to have the respective OS bootable files in the drive. In my case I used win server 2019. 
1. Once you have the bootable USB to install fresh windows, then create a folder called "Softwares" and move your WIM file and also any other softwares/drivers if you need. Now you have the USB with bootable windows server and WIM file. 
1. Ensure to boot from the USB and let windows shows its installation screen. Find the repair option in the same screen and proceed Repair Computer" > "Troubleshoot" > "Advanced Options" > "Command Prompt.
1. Now follow the below steps. The command prompt will open "X:\Sources"
1. Follow Create primary partition section above.
2. Go back to X Drive. 
3. `Dism /Apply-Image /ImageFile:D:\Capture\Backup.wim /Index:1 /ApplyDir:C:\`
4. Once done then create boot files. `bcdboot C:\Windows /S C:`
5. Remove the pen drive and change the boot order to Windows Boot Manager. 

[Stack Overflow Reference](https://superuser.com/a/1170879/551075)

### Domain Controller Not reacing issue

1. Use `nltest` command
2. `nltest /sc_verify:domain_full_name`

### Get Windows Key

1. `wmic path softwarelicensingservice get OA3xOriginalProductKey`