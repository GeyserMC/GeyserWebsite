---
title: Creating a Startup Script
description: Learn how to create a startup script for Geyser-Standalone.
crowdin_page_id: 0d187a8f-ad87-4d07-b122-4ae5f990e2cb
---

# Creating a Startup Script for Geyser-Standalone

:::caution

In order for this to work, you MUST have Java 17 (or higher) installed!

:::

Once you have downloaded and placed Geyser into its own folder, you will need to create a startup script; similar to how you'd run a Bukkit/Spigot/Paper server.

### Windows {#windows}
- Create a new text file in the same location as the Geyser-Standalone jar file, and call it `run.bat`. Open this with a text editor (preferably Notepad++), and insert the text below:

```batch title="run.bat"
@echo off
java -Xms1024M -jar Geyser-Standalone.jar
pause
```

- Double-click the **run.bat**, and Geyser should start up. Geyser will generate all the needed files.

### macOS {#macos}
- Create a text file called **run.command**, and open it with a text editor such as TextEdit or TextMate. Type the text below into the **run.command** file:

```sh title="run.command"
#!/bin/bash 
cd "$( dirname "$0" )" 
java -Xms1024M -jar Geyser-Standalone.jar
```

- Open Terminal, and type in `chmod a+x` **(Do NOT press return!)**, and drag your *run.command* file into the Terminal.
- Press return on your keyboard, and Geyser will start up. Geyser will generate all the needed files.

### Linux {#linux}
- Create a file called *run.sh*, and open it with a text editor. Type the text below into your `run.sh` file:

```sh title="run.sh"
#!/bin/sh 
cd "$( dirname "$0" )" 
java -Xms1024M -jar Geyser-Standalone.jar
```
- In your default terminal application, make the file executable by running `chmod +x ~(dir)/run.sh` where `dir` is the name of the folder Geyser is in, or by changing the file permissions;
- Open your default terminal application, and type `./run.sh` to run Geyser. Geyser will generate all the needed files.
