---
title: FloodgatePlayer
description: FloodgatePlayer is the main class for accessing bedrock player data.
---

FloodgatePlayer is something that every player who's connect through Floodgate has.  
It contains information about the Bedrock client which can be useful in various situations.

You can get a FloodgatePlayer by using the `FloodgateApi#getPlayer(uuid)` method (where uuid is the unique id of the connected player)
