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
