---
title: "Bedrock Early Packet Handling DoS Attack Summary and Response"
slug: "early-packet-handling-attack"
authors: Kas-tle
hide_table_of_contents: false
description: "A summary of how we addressed a series of exploits targeting Geyser's early handling of Bedrock game packets"
---

Back in July, we received reports of multiple Geyser instances experiencing targeted Denial of Service (DoS) attacks exhibiting similar characteristics. Out of an abundance of caution, we delayed making this post to ensure that users had adequate time to upgrade. The bugs that allowed for this string of attacks were patched on Geyser builds numbered 897 and later. In the unlikely event you are still running an outdated build of Geyser from many months ago, you should update immediately by downloading the latest build from [https://geysermc.org/download](https://geysermc.org/download). The original [security advisory](https://github.com/GeyserMC/Geyser/security/advisories/GHSA-m2q6-2hwr-643w) for this vulnerability was published on the [GeyserMC/Geyser](https://github.com/GeyserMC/Geyser) repository. This response will detail the timeline, attack vectors, how they were patched, and additional measures we took to prevent future attacks.

<!-- truncate -->

## Timeline (UTC)

- **July 29th, 9:40PM:** Server being attacked privately reports the issue to Geyser and shares logs  
- **July 29th, 11:45PM:** Preemptive patch is released to limit the number of authenticated connections per address  
- **July 30th, 5:36PM:** Large servers continue to report attacks with newer builds of Geyser  
- **July 30th, 6:20PM:** A server being attacked provides us with packet logs, illustrating what Bedrock packets malicious clients are using to carry out the attack  
- **July 30th, 6:52PM:** Second patch is released to ensure the Bedrock client can only signal complete of resource pack sending once per session  
- **July 30th, 7:45PM:** Issue regarding connections failing to close out is reported to upstream Bedrock protocol library  
- **July 30th, 9:35PM:** Upstream Bedrock protocol library publishes patch to ensure connections are properly closed when Bedrock users are disconnected  
- **July 30th, 10:45PM:** Third patch is released updating the upstream Bedrock protocol library and ensuring Bedrock connections that cause exceptions are closed immediately  
- **July 31st, 11:24PM:** An @everyone ping is made in the Geyser Discord advising users to update their Geyser instances, and the initial security advisory is published to GitHub.

## Initial Disclosure

Use of this attack was first privately reported to us by multiple larger servers using Geyser. We were provided server logs showing a single user appearing to be authenticated multiple times. The logs generally took a form of:

```log
[17:26:09.183 GeyserServerChild-4-1/INFO] Player connected with username BedrockPleyer
[17:26:09.183 GeyserServerChild-4-1/INFO] Player connected with username BedrockPleyer
[17:26:09.183 GeyserServerChild-4-1/INFO] Player connected with username BedrockPleyer
[17:26:09.183 GeyserServerChild-4-1/ERROR] BedrockPleyer is already logged in!
[17:26:09.183 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[17:26:09.183 clientNetworkSession-6-3/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[17:26:09.183 clientNetworkSession-6-1/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[17:26:09.183 clientNetworkSession-6-2/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[17:26:09.184 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
[17:26:09.184 clientNetworkSession-6-4/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[17:26:09.184 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[17:26:09.184 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
[17:26:09.184 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[17:26:09.184 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
[17:26:09.184 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[17:26:09.184 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
[17:26:09.185 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[17:26:09.185 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
```

Based on the content of these logs, we initially suspected that packets in the early phase of the Bedrock connection were being exploited. However, we were not yet sure of what specific packets the attacker was sending. Based on these logs, we released a preemptive patch to ensure that the number of authenticated users from a single IP address at any given time was limited. This alone, however, would prove to be insufficient to mitigate the attack.

## Game Packet and Code Analysis of the First Attack Vector

Understanding this attack requires a basic understanding of the general Bedrock login process. This is detailed below:

![chart_04 Bedrock Login Process](/img/blog/2025-11-30-early-packet-handling-attack/chart_04.svg#gh-light-mode-only)![chart_04 Bedrock Login Process](/img/blog/2025-11-30-early-packet-handling-attack/chart_04_dark.svg#gh-dark-mode-only)

In order to fully mitigate this attack, we required packet capture samples from a server being actively exploited. This is somewhat challenging to achieve, as traffic at the Bedrock protocol level is generally encrypted after the player has logged into the server. As a result, a modified build of Geyser is required to capture this traffic. We were fortunate to have the cooperation of a server being targeted with this attack, who installed a build of Geyser we provided to log packets. This was the resulting log, with IP addresses and usernames redacted:

```log
[18:16:37.767 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ClientToServerHandshakePacket
[18:16:37.795 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.808 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.808 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.809 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.809 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.809 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.809 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.810 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.810 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.810 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.810 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.810 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.810 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.811 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.811 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.811 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.811 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.811 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.811 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.812 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.812 GeyserServerChild-4-1/INFO] null /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.820 clientNetworkSession-6-2/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[18:16:37.820 clientNetworkSession-6-1/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[18:16:37.820 clientNetworkSession-6-4/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[18:16:37.820 clientNetworkSession-6-3/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[18:16:37.848 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.849 GeyserServerChild-4-1/INFO] BedrockPlayer /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.849 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
[18:16:37.849 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.849 GeyserServerChild-4-1/INFO] BedrockPlayer /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.850 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
[18:16:37.850 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
[18:16:37.850 GeyserServerChild-4-1/INFO] BedrockPlayer /XXX.XXX.XXX.XXX ResourcePackClientResponsePacket(packIds=[], status=COMPLETED)
[18:16:37.850 GeyserServerChild-4-1/ERROR] BedrockPlayer is already logged in!
[18:16:37.850 GeyserServerChild-4-1/INFO] Player connected with username BedrockPlayer
```

The above log clearly indicates that the packet being exploited is the [ResourcePackClientResponsePacket](https://mojang.github.io/bedrock-protocol-docs/html/ResourcePackClientResponsePacket.html). This leads to code paths in Geyser being called multiple times a way that is not intended, ultimately leading to increased resource consumption. We can essentially summarize the attack as follows:

![chart_02 Attack Summary](/img/blog/2025-11-30-early-packet-handling-attack/chart_02.svg#gh-light-mode-only)![chart_02 Attack Summary](/img/blog/2025-11-30-early-packet-handling-attack/chart_02_dark.svg#gh-dark-mode-only)

The initial response to the ResourcePackClientResponsePacket is handled by `UpstreamPacketHandler`:

```java
package org.geysermc.geyser.network;
// ...
public class UpstreamPacketHandler extends LoggingPacketHandler {
    // ...
    public PacketSignal handle(ResourcePackClientResponsePacket packet) {
        // ...
        switch (packet.getStatus()) {
            case COMPLETED -> {
                if (geyser.getConfig().getRemote().authType() != AuthType.ONLINE) {
                    session.authenticate(session.getAuthData().name());
                } else if (!couldLoginUserByName(session.getAuthData().name())) {
                    // We must spawn the white world
                    session.connect();
                }
                geyser.getLogger().info(GeyserLocale.getLocaleStringLog("geyser.network.connect", session.getAuthData().name()));
            }
            // ...
        }
        return PacketSignal.HANDLED;
    }
    // ...
}
```

We see in the code above that this will lead to the invocation of `GeyserSession#authenticate` for most connections, as most Geyser instances use `AuthType.FLOODGATE`:

```java
package org.geysermc.geyser.session;
// ...
public class GeyserSession implements GeyserConnection, GeyserCommandSource {
    // ...
    public void authenticate(String username) {
        if (loggedIn) {
            geyser.getLogger().severe(GeyserLocale.getLocaleStringLog("geyser.auth.already_loggedin", username));
            return;
        }

        loggingIn = true;
        // Always replace spaces with underscores to avoid illegal nicknames, e.g. with GeyserConnect
        protocol = new MinecraftProtocol(username.replace(' ', '_'));

        try {
            connectDownstream();
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
    // ...
}
```

This leads to the calling of `GeyserSession#connectDownstream`, which triggers a variety of logic to open a connection to the Java server:

```java
package org.geysermc.geyser.session;
// ...
public class GeyserSession implements GeyserConnection, GeyserCommandSource {
    // ...
    private void connectDownstream() {
        SessionLoginEvent loginEvent = new SessionLoginEvent(this, remoteServer, new Object2ObjectOpenHashMap<>());
        GeyserImpl.getInstance().eventBus().fire(loginEvent);
        if (loginEvent.isCancelled()) {
            String disconnectReason = loginEvent.disconnectReason() == null ?
                BedrockDisconnectReasons.DISCONNECTED : loginEvent.disconnectReason();
            disconnect(disconnectReason);
            return;
        }

        this.cookies = loginEvent.cookies();
        // Don't allow changing the remote server when it's not up to us
        // Just imagine the chaos of using an integrated world manager for an external server :)
        this.remoteServer = this.geyser.platformType() == PlatformType.STANDALONE ? loginEvent.remoteServer() : remoteServer;

        // Start ticking
        tickThread = tickEventLoop.scheduleAtFixedRate(this::tick, nanosecondsPerTick, nanosecondsPerTick, TimeUnit.NANOSECONDS);

        ClientSession downstream;
        if (geyser.getBootstrap().getSocketAddress() != null) {
            // We're going to connect through the JVM and not through TCP
            downstream = new LocalSession(geyser.getBootstrap().getSocketAddress(),
                upstream.getAddress().getAddress().getHostAddress(),
                this.protocol, this.tickEventLoop);
            downstream.setFlag(MinecraftConstants.CLIENT_HOST, this.remoteServer.address());
            downstream.setFlag(MinecraftConstants.CLIENT_PORT, this.remoteServer.port());
            this.downstream = new DownstreamSession(downstream);
        } else {
            downstream = new ClientNetworkSession(new InetSocketAddress(this.remoteServer.address(), this.remoteServer.port()), this.protocol, tickEventLoop, null, null);
            this.downstream = new DownstreamSession(downstream);

            boolean resolveSrv = false;
            try {
                resolveSrv = this.remoteServer.resolveSrv();
            } catch (AbstractMethodError | NoSuchMethodError ignored) {
                // Ignore if the method doesn't exist
                // This will happen with extensions using old APIs
            }
            this.downstream.getSession().setFlag(BuiltinFlags.ATTEMPT_SRV_RESOLVE, resolveSrv);
        }

        // Disable automatic creation of a new TcpClientSession when transferring - we don't use that functionality.
        this.downstream.getSession().setFlag(MinecraftConstants.FOLLOW_TRANSFERS, false);

        if (geyser.getConfig().getRemote().isUseProxyProtocol()) {
            downstream.setFlag(BuiltinFlags.CLIENT_PROXIED_ADDRESS, upstream.getAddress());
        }
        if (geyser.getConfig().isForwardPlayerPing()) {
            // Let Geyser handle sending the keep alive
            downstream.setFlag(MinecraftConstants.AUTOMATIC_KEEP_ALIVE_MANAGEMENT, false);
        }
        // We'll handle this since we have the registry data on hand
        downstream.setFlag(MinecraftConstants.SEND_BLANK_KNOWN_PACKS_RESPONSE, false);

        // We manually add the default listener to ensure the order of listeners.
        protocol.setUseDefaultListeners(false);

        // MCPL listener comes first to handle protocol state switching before Geyser translates packets
        downstream.addListener(new ClientListener(HandshakeIntent.LOGIN));
        // Geyser adapter second to ensure translating packets in the correct states
        downstream.addListener(new GeyserSessionAdapter(this));

        downstream.setFlag(BuiltinFlags.CLIENT_TRANSFERRING, loginEvent.transferring());
        downstream.connect(false);

        if (!daylightCycle) {
            setDaylightCycle(true);
        }
    }
    // ...
}
```

Notably, this allows for multiple downstream sessions (representing Geyser's connection to the Java server per player) to be created for a single Bedrock session. This is not intended behavior, as it leads to significantly increased resource consumption. This is especially true on Geyser Standalone, which, as seen in the code above, must open a TCP session to the Java server. The window of time for an attacker to pull this off is relatively short, as once Geyser completes the Java login process on behalf of the Bedrock client, `GeyserSession.loggedIn` is set to true, preventing further calls to `GeyserSession#connectDownstream`. However, this is still enough time for an attacker to create numerous downstream sessions, leading to a DoS attack. We attempted to mitigate this by disconnecting clients that send multiple ResourcePackClientResponsePacket in a single session. The following class diagram summarizes this:

![chart_05 Multiple Sessions Class Diagram](/img/blog/2025-11-30-early-packet-handling-attack/chart_05.svg#gh-light-mode-only)![chart_05 Multiple Sessions Class Diagram](/img/blog/2025-11-30-early-packet-handling-attack/chart_05_dark.svg#gh-dark-mode-only)

## Code Analysis of the Second Attack Vector

While we thought we had addressed the root issue and provided the affected users with a patch for testing, we quickly received logs that indicated otherwise:

```log
[18:54:29.235 GeyserServerChild-4-3/INFO] Player connected with username BedrockPlayer
[18:54:29.237 clientNetworkSession-6-2/INFO] BedrockPlayer (logged in as: BedrockPlayer) has connected to remote java server on address 127.0.0.1
[18:54:49.257 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:54:49.259 GeyserServerChild-4-3/INFO] BedrockPlayer has disconnected from remote Java server on address 127.0.0.1 because of An internal error occurred!
[18:54:52.836 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:54:55.620 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:54:56.186 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:54:56.872 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:54:59.508 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:02.551 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:03.025 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:03.619 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:04.254 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:04.922 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:05.435 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:07.662 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:08.139 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:08.650 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:11.066 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:13.498 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:14.023 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:14.466 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:15.057 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:15.712 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:16.211 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:18.431 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:18.966 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:19.443 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:21.599 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:23.904 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:24.409 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:24.971 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:25.539 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
[18:55:26.225 GeyserServerChild-4-3/WARN] Exception caught in session of BedrockPlayer: index: 13, length: 25710 (expected: range(0, 27))
```

These exceptions are thrown by Geyser's InvalidPacketHandler, which is designed to quickly disconnect players that send malformed packets or packets that exceed the expected size limits. This is a security measure to prevent potential exploits or crashes caused by invalid data.

```java
package org.geysermc.geyser.network;
// ...
public class InvalidPacketHandler extends ChannelInboundHandlerAdapter {
    public static final String NAME = "rak-error-handler";

    private final GeyserSession session;

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        Throwable rootCause = Stream.iterate(cause, Throwable::getCause)
                .filter(element -> element.getCause() == null)
                .findFirst()
                .orElse(cause);

        GeyserLogger logger = GeyserImpl.getInstance().getLogger();

        if (!(rootCause instanceof IllegalArgumentException)) {
            // Kick users that cause exceptions
            logger.warning("Exception caught in session of " + session.bedrockUsername() + ": " + rootCause.getMessage());
            session.disconnect("An internal error occurred!");
            return;
        }

        // Kick users that try to send illegal packets
        logger.warning("Illegal packet from " + session.bedrockUsername() + ": " + rootCause.getMessage());
        if (logger.isDebug()) {
            cause.printStackTrace();
        }
        session.disconnect("Invalid packet received!");
    }
}
```

This makes the aforementioned logs of particular concern, as it should not be possible for any exceptions to be triggered from this handler multiple times. The first exception should be logged and trigger an immediate disconnect, preventing further exceptions from being thrown. Despite this, the log clearly indicates that multiple exceptions are being thrown in quick succession, suggesting that the disconnect is not being handled as intended. This is summarized below:

![chart_03 Exception Handler](/img/blog/2025-11-30-early-packet-handling-attack/chart_03.svg#gh-light-mode-only)![chart_03 Exception Handler](/img/blog/2025-11-30-early-packet-handling-attack/chart_03_dark.svg#gh-dark-mode-only)

We first followed the chain of `GeyserSession#disconnect`. This invokes Geyser's `UpstreamSession#disconnect`, which contains `BedrockServerSession` and invokes `BedrockServerSession#disconnect`. Beyond this, the disconnect logic is handled by the upstream Bedrock protocol library used by Geyser, [CloudburstMC/Protocol](https://github.com/CloudburstMC/Protocol). The overall logic is summarized below:

![chart_01 GeyserSession Disconnect Chain](/img/blog/2025-11-30-early-packet-handling-attack/chart_01.svg#gh-light-mode-only)![chart_01 GeyserSession Disconnect Chain](/img/blog/2025-11-30-early-packet-handling-attack/chart_01_dark.svg#gh-dark-mode-only)

Upon further investigation, we found that the Bedrock protocol library did not actually close the underlying Netty channel when a disconnect was triggered: 

```java
package org.cloudburstmc.protocol.bedrock;
// ...
public class BedrockServerSession extends BedrockSession {
    // ...
    public void disconnect(@Nullable String reason, boolean hideReason) {
        this.checkForClosed();

        DisconnectPacket packet = new DisconnectPacket();
        if (reason == null || hideReason) {
            packet.setMessageSkipped(true);
            reason = BedrockDisconnectReasons.DISCONNECTED;
        }
        packet.setKickMessage(reason);
        this.sendPacketImmediately(packet);
    }
}
```

This allows an attacker that should have been disconnected to continue to send malicous packets that lead to expensive deserialization logic. The result is another potential denial of service (DoS) attack vector.

## Patch and Mitigation

We mitigated the first attack vector by ensuring that the Bedrock client can only signal completion of resource pack sending once per session. This was done by modifying the `UpstreamPacketHandler` to check if the `finishedResourcePackSending` flag is already set before proceeding with authentication logic:

```java
package org.geysermc.geyser.network;
// ...
public class UpstreamPacketHandler extends LoggingPacketHandler {
    // ...
    public PacketSignal handle(ResourcePackClientResponsePacket packet) {
        // ...
        // highlight-start
        if (finishedResourcePackSending) {
            session.disconnect("Illegal duplicate resource pack response packet received!");
            return PacketSignal.HANDLED;
        }
        // highlight-end
        // ...
        switch (packet.getStatus()) {
            case COMPLETED -> {
                // highlight-start
                finishedResourcePackSending = true;
                // highlight-end
                if (geyser.getConfig().getRemote().authType() != AuthType.ONLINE) {
                    session.authenticate(session.getAuthData().name());
                } else if (!couldLoginUserByName(session.getAuthData().name())) {
                    // We must spawn the white world
                    session.connect();
                }
                geyser.getLogger().info(GeyserLocale.getLocaleStringLog("geyser.network.connect", session.getAuthData().name()));
            }
            // ...
        }
        return PacketSignal.HANDLED;
    }
    // ...
}
```

This ensures that any further attempts to send a `ResourcePackClientResponsePacket` after the first one will result in an immediate disconnect, preventing the creation of multiple downstream sessions.

The second attack vector was mitigated by ensuring that the disconnect logic in the Bedrock protocol library properly closes the underlying Netty channel. This was achieved by modifying the `BedrockServerSession#disconnect` method to schedule a task that closes the session after a timeout, ensuring that the channel is closed after the disconnect packet is sent. Packet serialzation is also stopped immediately for disconnected clients:

```java
package org.cloudburstmc.protocol.bedrock;
// ...
public class BedrockServerSession extends BedrockSession {
    private static final int TIMEOUT_SECONDS = SystemPropertyUtil.getInt("org.cloudburstmc.protocol.bedrock.disconnectTimeout", 10);
    // ...
    public void disconnect(@Nullable String reason, boolean hideReason) {
        this.checkForClosed();

        DisconnectPacket packet = new DisconnectPacket();
        String finalReason;
        if (reason == null || hideReason) {
            packet.setMessageSkipped(true);
            finalReason = BedrockDisconnectReasons.DISCONNECTED;
        } else {
            finalReason = reason;
        }
        packet.setKickMessage(finalReason);
        this.sendPacketImmediately(packet);
        
        // highlight-start
        if (!this.isSubClient()) {
            this.getPeer().blackholeInboundPackets();
        }

        this.getPeer().channel.eventLoop().schedule(() -> {
            if (this.isConnected()) {
                this.close(finalReason);
            }
        }, TIMEOUT_SECONDS, TimeUnit.SECONDS);
        // highlight-end
    }
}
```

Logic was also added to Geyser's `InvalidPacketHandler` to ensure that invalid packets result in an immediate closing of the underlying Netty channel:

```java
package org.geysermc.geyser.network;
// ...
public class InvalidPacketHandler extends ChannelInboundHandlerAdapter {
    public static final String NAME = "rak-error-handler";

    private final GeyserSession session;

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        Throwable rootCause = Stream.iterate(cause, Throwable::getCause)
                .filter(element -> element.getCause() == null)
                .findFirst()
                .orElse(cause);

        GeyserLogger logger = GeyserImpl.getInstance().getLogger();

        if (!(rootCause instanceof IllegalArgumentException)) {
            // Kick users that cause exceptions
            logger.error("Exception caught in session of " + session.bedrockUsername(), cause);
            session.disconnect("An internal error occurred!");
            // highlight-start
            session.forciblyCloseUpstream();
            // highlight-end
            return;
        }

        // Kick users that try to send illegal packets
        logger.error("Illegal packet from " + session.bedrockUsername(), cause);
        session.disconnect("Invalid packet received!");
        // highlight-start
        session.forciblyCloseUpstream();
        // highlight-end
    }
}
```

## Long Term Impact

All users of Geyser running outdated builds should update as soon as possible to ensure they are not vulnerable to the attacks described in this post. During the process of investigating this attack, we were made aware of multiple servers being exploited, meaning this is being exploited in the wild. Unlike the previous RakNet amplification attack, this attack is limited in scope to the selected Geyser instance. We expect the number of unpatched instances to decrease over time as Bedrock updates require server owners to update their Geyser instances. As of November 2025, we have not received any recent reports of Geyser instances being targeted by this attack vector, indicating that most instances have been patched. 

## Acknowledgements

We thank the community for their patience as we addressed this issue, the server owners who responsibly disclosed this issue to us, the developers at Cloudburst and Geyser that worked to mitigate the issue, all donors for their financial support of Geyser, and Cubecraft and Open Collaboration for their continued financial and operational support of the project.