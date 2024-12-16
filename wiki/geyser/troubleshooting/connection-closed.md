---
title: Resolving Connection closed or End of Stream
description: This page aims to resolve various issues that can result in that error.
---

# Resolving `Connection closed` or `End of Stream`

This error indicated that the Java server closed or ended the connection between Geyser and the Java server.

There are a lot of potential reasons for this, so this guide will show only general troubleshooting steps.

# 1. Check your server log / console

First, check your server console and/or server logs.
There, look for the connection attempt you made

// TODO image of a connection attempt

If you do not see a connection attempt nor anything else in your console when you try to connect,
make sure that you connect to the correct IP / port of your server!

If you found the connection attempt, read further until you see Geyser's or the server's disconnection
message.

// TODO image stacktrace

Now, look for other errors, warnings, or stacktraces that occur when joining (or even when starting the server!).
Those should give you a hint of what is not working.

Example:

 // TODO add some screenshot

Here, the plugin `aewce` is malfunctioning as it is not updated to the correct server version.
To resolve the case here, update or remove it.

# 2. Check for incompatible plugins

Sometimes there are no obvious errors or warnings. In this case, you should check for conflicts with other plugins,
specifically those that purposefully prevent players from joining (such as anti-ddos or block plugins).

Known to cause this:
- The Cosmicguard plugin blocks all Geyser conenctions. It is not compatible and should be removed to use Geyser.
- The TCPshield plugin 

If you are not running any of these, try a binary search to find the troublemaker.

::: Binary search
 // TODO 
:::

-> TCPshield, Cosmicguard plugins
-> ??? (plugin debugging)

# 3. Still not working? 

Sometimes, it might be tricky to spot the issue. In this case, please join the Geyser discord server and ask for help there!
Make sure to send a full log showing the error, alonside a link to this page to show which steps you've tried.
