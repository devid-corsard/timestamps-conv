## Simple timestamps converter

converting youtube timestamps like:

```
00:00 - Intro
01:26 - Arcthitecture
02:15 - Setup project basics
```

and

```
00:00 Intro
01:26 Arcthitecture
02:15 Setup project basics
```

and

```
00:00 The Rhythm Rockers - Oh Boy
02:27 Michael Cox - Sweet Little Sixteen
04:42 The Rock-A-Tones - Blue Swinging Mama
06:41 Walter Brown - Jelly Roll Rock
```

to a ffmpeg metadata text:

```
;FFMETADATA1
[CHAPTER]
TIMEBASE=1/1
START=0
END=86
title=Intro
[CHAPTER]
TIMEBASE=1/1
START=86
END=135
title=Arcthitecture
[CHAPTER]
TIMEBASE=1/1
START=135
END=145
title=Setup project basics

```

or

to .cue file:

```
REM GENRE "Pop"
REM DATE "2023"
REM COMMENT ""
PERFORMER "Various Artists"
TITLE "Mix"
FILE "file.m4a" WAVE
  TRACK 01 AUDIO
    TITLE "Oh Boy"
    PERFORMER "The Rhythm Rockers"
    INDEX 01 00:00:00
  TRACK 02 AUDIO
    TITLE "Sweet Little Sixteen"
    PERFORMER "Michael Cox"
    INDEX 01 02:27:00
  TRACK 03 AUDIO
    TITLE "Blue Swinging Mama"
    PERFORMER "The Rock-A-Tones"
    INDEX 01 04:42:00
  TRACK 04 AUDIO
    TITLE "Jelly Roll Rock"
    PERFORMER "Walter Brown"
    INDEX 01 06:41:00
```
