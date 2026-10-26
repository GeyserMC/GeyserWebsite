# Listing Your Hosting Service in the Geyser Setup Guide

This page is for hosting providers that want to add or update their entry in the [Geyser setup guide](https://geysermc.org/wiki/geyser/setup/).

The setup guide system works by using properties instructing users what to do.  These are steps users will see: 
downloading Geyser, the exact config changes, and what to enter in Minecraft: Bedrock Edition to connect.

Whenever possible, please use the pre-configured strings at the top of `providers.ts`! This makes it possible for us to
translate the guide with the help of our translators. You can add your own guide with images if you'd like, but please
ensure that the info provided to us is enough to get Geyser running.

Entries are found in [`src/data/providers.ts`](src/data/providers.ts), in alphabetical order. The fields are documented in [`src/types/providers.ts`](src/types/providers.ts).

## How to Submit Changes

- Open a [pull request](https://github.com/GeyserMC/GeyserWebsite/pulls) that edits your entry, or
- Contact us on [Discord](https://discord.gg/geysermc) with the details below if you're unsure about details.

## What We Need to Know

Bedrock Edition connects over NetherNet, which needs:

- a **UDP** port for gameplay (WebRTC), and
- a **TCP** port for signaling, which is how players find the server. Geyser can run signaling itself ("built-in signaling"), 
or use an external signaling service ([Warden](https://warden.cloud) by default), which needs no TCP port.

The Java server's port cannot be used for built-in signaling, because the Java server already uses it over TCP. 
If your servers can only use the Java server's port, Geyser falls back to external signaling.

These questions may help you:

1. **Do you install and configure Geyser for your customers?** For example, a toggle in your panel, or Geyser set up on every server by default.
2. **If not, how does a customer get a port for Geyser?** For example, the customer adds one in the panel, picks one from ports already assigned to the server, or asks support.
3. **Is that port open for both TCP and UDP?** Pterodactyl allocations usually are.
4. **Do you run your own NXS-compatible signaling service or have a reverse-proxy set up?**
5. **Which links should we show?** These can be your own Geyser article, your support page and your Discord server.

If you have further specific instructions that you can't fit into the guide, please reach out to us on Discord so we can discuss them!

## Use the Pre-Configured Strings

Every sentence in an entry is sent to translators for every language the website supports. So we ask hosts to use the pre-configured
strings at the top of `providers.ts` wherever they fit, and to write their own text only for steps that are specific to their panel.

| Situation                                                           | Use                                                               |
|---------------------------------------------------------------------|-------------------------------------------------------------------|
| The customer adds a port in your panel                              | `udp: ports.assign`                                               |
| The customer picks one of the ports already assigned to the server  | `udp: ports.allocated`                                            |
| The customer asks support for a port                                | `udp: ports.askHost`                                              |
| You configure Geyser, and show customers their Bedrock port         | `config: { preconfigured: true, port: ports.fromHost }`           |
| You use the same port for every server                              | a number, e.g. `port: 19132`                                      |
| Geyser is installed through your plugin or mod list                 | `install: customInstallLocations.plugin_list`                     |
| Geyser is installed and configured on every server                  | `install: infos.installed_by_default`                             |
| An "Enable Bedrock crossplay?" option when changing server software | `install: customInstallLocations.enable_bedrock_crossplay_option` |
| A "Bedrock crossplay" toggle in the Settings tab of your panel      | `install: customInstallLocations.settings_tab_bedrock_crossplay`  |
| Players use a different address than the Java server's              | `config.notes: [javaAddressInstruction]`                          |
| You only serve one region                                           | `notices: { info: onlyServesRegion('Australia') }`                |

`ports.newPort` is for hosts we have no details on yet. Please replace it with one of the options above.

### What the Guide Already Covers

Do not add text for these. The guide generates them for you:

- downloading Geyser and placing the jar,
- the `bedrock` section of the config, including `port`, `webrtc-port`, `transport` and the signaling mode,
- which config option to set your port as,
- turning off `clone-remote-port`, which many hosts used to preset,
- what players enter to connect: the Java server's address and the Bedrock port.

### Writing Your Own Text

When a pre-configured string does not fit, add a `translate({ id, message })`:

- **Write full sentences.** Translators see each string on its own, so do not split a sentence across strings or values.
- **Name the place in your panel**, e.g. "Open an additional port in the Network tab."
- **Do not link to images or screenshots.** If your panel needs pictures to explain, put them in your own Geyser article and link it as `links.article`.
- **Do not link to order or pricing pages.** Links are limited to your article, support and Discord.
- **Use an id in the form `providers.provider.<your_host>.<field>`**, e.g. `providers.provider.example_host.install`.
When you change the text of an existing string, give it a new id, so translations of the old text are not shown for the new one.

## Which Fields Go Where

The setup guide shows an entry in this order:

| Field                           | Shown as                                                                                                                               |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `links`                         | Buttons at the top: `article` (your Geyser guide), `support`, `discord`                                                                |
| `install`                       | Step 1, instead of the download steps                                                                                                  |
| `config`                        | Step 2: your ports, and what to change in the Geyser config                                                                            |
| `extra_step`                    | Step 3, e.g. a panel option the customer has to turn on                                                                                |
| `connect`                       | Step 4, instead of the generated connect instructions. Only set this if players connect differently, e.g. through a lobby with `/join` |
| `notices.info` / `notices.warn` | Notes next to the guide                                                                                                                |
| `notices.unsupported`           | Replaces the guide, for hosts Geyser does not work on                                                                                  |
| `proxies_banned`                | Hides the Velocity, BungeeCord, Standalone and ViaProxy guides                                                                         |

Set `updated` to the date you add or change the entry, as `'YYYY-MM-DD'`. The guide shows it as "Instructions last updated on".

## Confirming Your Entry

Most entries were reported by the community, and have `confirmed: false`. The guide then shows a warning that the steps
have not been checked for NetherNet, and points players to the "Not listed" guide.

Once you have tested the steps on your service, remove `confirmed: false`. Only do this for steps you have tested.

## Configuring Geyser for Your Customers

If you set up Geyser for your customers, you can do it without editing their config by using [system properties](https://geysermc.org/wiki/geyser/geyser-command-line-arguments-and-system-properties#nethernet-system-properties) in the start command, for example:

```sh
java -DgeyserTransport=nethernet -DgeyserUdpPort=19132 -jar server.jar
```
Please see our [documentation](https://geysermc.org/wiki/geyser/geyser-command-line-arguments-and-system-properties) for more information.

Built-in signaling uses plain HTTP by default, which makes Minecraft show a "Trust on First Use?" prompt. See [HTTPS for NetherNet](https://geysermc.org/wiki/geyser/nethernet-https) to avoid it.

Then use `config: { preconfigured: true, port }` in your entry, and describe how customers turn Geyser on in `install`.

## Examples

A host whose customers add a port in the panel, open for TCP and UDP:

```ts
{
    name: 'Example Host',
    url: 'https://example.com/',
    updated: '2026-10-16',
    links: { article: 'https://example.com/docs/geyser', discord: 'https://discord.gg/example' },
    install: customInstallLocations.plugin_list,
    config: {
        udp: {
            obtain: translate({
                id: 'providers.provider.example_host.port',
                message: "Open an additional port in the Network tab of your panel."
            })
        },
        builtin_signaling: 'same_as_udp'
    }
},
```

A host that configures Geyser itself:

```ts
{
    name: 'Example Host',
    url: 'https://example.com/',
    updated: '2026-10-16',
    links: { support: 'https://example.com/support' },
    install: translate({
        id: 'providers.provider.example_host.install',
        message: "Turn on 'Bedrock crossplay' in the Software tab of your panel, and restart the server."
    }),
    config: { preconfigured: true, port: ports.fromHost }
},
```

A host where customers ask support for a port, and only get one with a dedicated IP address:

```ts
{
    name: 'Example Host',
    url: 'https://example.com/',
    updated: '2026-10-16',
    config: {
        udp: ports.askHost,
        builtin_signaling: 'same_as_udp',
        notes: [otherInstructions.dedicatedIp]
    }
},
```

## Supporting Geyser

Hosts that support Geyser's development through [Open Collaboration](https://opencollaboration.dev) get an `open_collaboration` entry with their 
`tier` (`bronze`, `silver` or `gold`), and are highlighted in the setup guide. Silver and gold hosts can add a `logo` (placed in `static/img/hosts`) and a short `description`.
