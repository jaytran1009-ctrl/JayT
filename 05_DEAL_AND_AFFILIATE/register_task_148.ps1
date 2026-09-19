$nodePath = 'C:\Program Files\nodejs\node.exe'
$scriptPath = 'D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng\05_DEAL_AND_AFFILIATE\jayt_autonomous_worker_148.js'
$repoRoot = 'D:\Công Việc MMO\OPC JayT\JayT-Dự Án Giá Trị Cộng Đồng'
$argList = "`"$scriptPath`" --scheduled-cycle --origin OS_TRIGGERED"
$action = New-ScheduledTaskAction -Execute $nodePath -Argument $argList -WorkingDirectory $repoRoot
$trigger = New-ScheduledTaskTrigger -Daily -At 3am
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "JAYT_AUTONOMOUS_SUPPLY_WORKER_148" -Action $action -Trigger $trigger -Settings $settings -Force
