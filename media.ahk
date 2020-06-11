;F2
F2::
    run "C:\_excluded\tessa"
return

F3::
    run "C:\_excluded\tessa\src\Web\VikardaekningSPA"
return

F4::
    run "C:\Users\fread\Documents\VikarDb"
return

AppsKey::run taskmgr.exe

;Numpad 8
NumpadUp::Volume_Up

; Numpad 2
NumpadDown::Volume_Down

; Numpad .
NumpadDel::Volume_Mute

;Numpad 6
NumpadRight::Media_Next

;Numpad 4
NumpadLeft::Media_Prev

;Numpad 0
NumpadIns::Media_Play_Pause

; Numpad 1
; Putty + proxify launch script
NumpadEnd::
    run "C:\Program Files (x86)\Proxifier\Proxifier.exe"
    run "C:\Program Files\PuTTY\putty.exe" -load "Ballerup"
return

; Numpad 7
NumpadHome::
    run "C:\Program Files\Everything\Everything.exe"
return

;Numpad 5
;Ctrl + Numpad 5
;Unzip script, create new directory
^NumpadClear::
    NumpadClear::
        temp = %clipboard%
        Send, {Ctrl Down}c{Ctrl Up}
        file = %clipboard% ;get file address
        clipboard = %temp% ;restore clipboard
        if (regExMatch(a_thisHotkey, "(\^|\+|!)")) {
            outdir := currentDir(file)
            runwait, "C:\Program Files\7-Zip\7z.exe" x "%file%" -o"%outdir%" -y, , hide
        } else {
            outdir := getdir(file)
            runwait, "C:\Program Files\7-Zip\7z.exe" x "%file%" -o"%outdir%" -y, , hide
        }
        
    return
    
    getdir(input)
    {
        SplitPath, input, , parentdir, , filenoext
        final = %parentdir%\%filenoext%
        return final
    }
    currentDir(input)
    {
        SplitPath, input, , parentdir, , filenoext
        final = %parentdir%
        return final
    }
    
    #Persistent
    CoordMode Pixel, Screen
    CoordMode Mouse, Screen
    return
    
    ; HEX color script
    ;Numpad 3
    NumpadPgDn::
        SetTimer, WatchCursor, 100
        Hotkey, ESC, Quit, On
        Hotkey, Enter, Done, On
    return
    
    Done:
        ClipBoard := Color
        Quit:
            SetTimer, WatchCursor, Off
            Hotkey, ESC, Off
            Hotkey, Enter, Off
            ToolTip
        return
        
        WatchCursor:
            MouseGetPos X, Y
            PixelGetColor Color, %X%, %Y%, RGB
            ToolTip, %Color%