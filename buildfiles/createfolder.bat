@echo off
@break off

setlocal EnableDelayedExpansion

if not exist ".\dist\sitefiles\aree\" (
  md ".\dist\sitefiles\aree\"
  if "!errorlevel!" EQU "0" (
    echo Folder dist\sitefiles created successfully
  ) else (
    echo Error while creating folder dist\sitefiles
  )
)

ver > nul

exit 0