---
title: Common Nethernet Issues
description: Common issues and solutions for problems related to Nethernet.
crowdin_page_id: d307e0dc-bb8c-4026-89ef-f4d36046a55d
---

## Disconnected with Nethernet, Door or similar {/* #disconnected-with-error-code */}

When joining your server, you may encounter the error code `Nethernet` or `Door`. If this is the case, you can use the other error code hidden away in order to help debug the issue further.

![More details bedrock disconnect screen](/img/wiki/nethernet/error-code.png)

1. The error code, in this case, `Nethernet`
2. The point of interest, this shows the real disconnect reason
3. The numeric error code to lookup

## Codes {/* #codes */}

### 13 {/* #codes-13 */}
Code 13 means `LegacyDisconnect`, this typically happens the game failed to connect via Nethernet, so attempted to connect with Raknet which also failed.

**Troubleshooting steps**:
- Is the signalling server accessible?
  - Attempt to connect to it with your web browser, go to `http://yourserverip:yourport/v1/join` and see what it says
- Is both the signalling server port (TCP) **and** the WebRTC port (UDP) forwarded?

### 1, 38 {/* #codes-no-internet */}
Code 1 and 38 typically indicate you have no internet connection, please make sure you are connected to the internet and try again.

### 83 {/* #codes-83 */}
Code 83 indicates that a connection was successfully made to the signalling server, but bedrock failed to connect to the address given, usually your server address with the WebRTC port specified.

**Troubleshooting steps**:
- Is the WebRTC port forwarded for **UDP**?
- Is the WebRTC accessible on your local network?
  - This does not apply to servers from hosting providers