
$bat = 'C:\Users\tritr\run_jayt_worker_147.bat'
$action = New-ScheduledTaskAction -Execute $bat
$trigger = New-ScheduledTaskTrigger -Daily -At 3am
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "JAYT_AUTONOMOUS_SUPPLY_WORKER_147" -Action $action -Trigger $trigger -Settings $settings -Force
