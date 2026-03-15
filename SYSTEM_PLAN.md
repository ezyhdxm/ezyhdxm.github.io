# CBOS — Cyberbrain Operating System

Design document for the fictional system behind `cyberpunk.html` terminal messages.
All terminal errors reference real components, paths, and services defined here.

---

## Architecture Overview

CBOS is a neural-interface operating system running on prosthetic cyberbrains.
It bridges biological consciousness ("ghost") with digital infrastructure and
cybernetic prosthetic bodies ("shells"). Based on a modified Linux kernel (`6.9.0-cb`).

```
┌─────────────────────────────────────────────────┐
│                   USER SPACE                    │
│  operator session · dive client · shell control │
├─────────────────────────────────────────────────┤
│                  SERVICES (systemd)             │
│  ghost-core · mnemosyned · barrierd · synapsd   │
│  dive-linkd · automond · ghost-syncd            │
├─────────────────────────────────────────────────┤
│                KERNEL MODULES                   │
│  ghost_drv · cb_cortex · syn_motor · mn_cache   │
│  barrier_ids · dive_tun                         │
├─────────────────────────────────────────────────┤
│                  HARDWARE                       │
│  Cyberbrain SoC · Synapse Bus · Dive Transceiver│
│  External Memory Bank · Barrier Co-processor    │
└─────────────────────────────────────────────────┘
```

---

## Subsystems

### 1. ghost-core (Consciousness Kernel)

The primary daemon managing the ghost — the irreducible consciousness signature
unique to each operator. Handles ghost integrity, continuity verification,
and the boundary between self and external data.

- **Service**: `ghost-core.service` (PID usually ~1200)
- **Kernel module**: `ghost_drv`
- **Key files**:
  - `/sys/ghost/integrity` — ghost hash (SHA-512), checked every 30s
  - `/sys/ghost/boundary` — threshold separating self from non-self
  - `/sys/ghost/echo` — ghost signal echo amplitude (0.0–1.0)
  - `/proc/cb/ghost_state` — current state: `ACTIVE | DORMANT | FRAGMENTING`
- **Ports**: listens on `cb0:9000` (internal bus only)
- **Failure modes**: ghost fragmentation, boundary dissolution, echo decay

### 2. mnemosyned (Memory Subsystem)

Named after Mnemosyne (goddess of memory). Manages both organic recall pathways
and digital memory banks. Handles encoding, storage, retrieval, and integrity
verification of memories. Maintains a write-ahead log for memory transactions.

- **Service**: `mnemosyned.service` (PID usually ~1450)
- **Kernel module**: `mn_cache`
- **Key files**:
  - `/var/lib/mnemosyne/recall.db` — primary memory database (SQLite-based)
  - `/var/lib/mnemosyne/wal/` — write-ahead log directory
  - `/var/log/mnemosyne/access.log` — memory access audit trail
  - `/mnt/ext-memory/` — external memory bank mount point
  - `/proc/cb/mn_stats` — cache hit/miss ratio, fragmentation level
- **Config**: `/etc/mnemosyne/mnemosyne.conf`
- **Timer**: `mnemosyne-fsck.timer` — periodic integrity check (every 6h)
- **Failure modes**: recall corruption, WAL overflow, external bank disconnect,
  cache poisoning (via ghost-hack injecting false memories)

### 3. barrierd (Security / Firewall)

Intrusion detection and prevention system protecting the cyberbrain from
ghost-hacking, unauthorized memory reads, viral payloads, and identity spoofing.

- **Service**: `barrierd.service` (PID usually ~980)
- **Kernel module**: `barrier_ids`
- **Key files**:
  - `/etc/barrier/rules.d/` — firewall rule chains
  - `/etc/barrier/whitelist` — trusted ghost signatures
  - `/var/log/barrier/intrusion.log` — detected intrusion attempts
  - `/proc/cb/barrier_state` — `ACTIVE | DEGRADED | BREACHED`
- **Ports**: monitors all interfaces (`cb0`, `dive0`, `syn0`)
- **Failure modes**: rule corruption, signature bypass, co-processor timeout

### 4. synapsd (Synapse Bridge)

Hardware abstraction layer for prosthetic shell control. Translates neural
intent into motor commands for cybernetic limbs and sensory feedback loops.

- **Service**: `synapsd.service` (PID usually ~1100)
- **Kernel module**: `syn_motor`
- **Key files**:
  - `/dev/synapse/motor0`–`motor7` — motor control channels
  - `/dev/synapse/sensory0`–`sensory3` — sensory feedback channels
  - `/proc/cb/syn_latency` — current synapse round-trip (target: <2ms)
  - `/var/log/synapsd/calibration.log` — calibration events
- **Failure modes**: latency spike, channel desync, phantom signal,
  feedback loop (sensory echo causing motor jitter)

### 5. dive-linkd (Network / Dive Interface)

Manages connections to the external Net. Handles encrypted tunnels,
anonymous routing, and deep-dive sessions (full consciousness immersion).

- **Service**: `dive-linkd.service` (PID usually ~1600)
- **Kernel module**: `dive_tun`
- **Key files**:
  - `/dev/dive0` — dive network interface
  - `/tmp/dive/session.sock` — active dive session socket
  - `/var/log/dive-link/traffic.log` — connection log
  - `/etc/dive-link/routes` — routing table for net diving
  - `/proc/cb/dive_depth` — current dive depth (0 = surface, 7 = deep net)
- **Failure modes**: tunnel collapse, route blackhole, depth overflow,
  session orphan (consciousness stuck in dive after link drop)

### 6. automond (System Monitor)

Continuous health monitoring. Watches all subsystems, generates alerts,
and can trigger emergency procedures (ghost backup, forced surface).

- **Service**: `automond.service` (PID usually ~800)
- **Key files**:
  - `/var/log/automond/health.log` — system health timeline
  - `/etc/automond/thresholds.conf` — alert thresholds
  - `/proc/cb/uptime` — cyberbrain uptime
- **Managed timers**:
  - `ghost-integrity.timer` — ghost hash check (30s interval)
  - `mnemosyne-fsck.timer` — memory integrity (6h interval)
  - `barrier-audit.timer` — security audit (1h interval)

### 7. ghost-syncd (Ghost/Body Sync)

Keeps the ghost synchronized with the physical shell. Handles identity
continuity across shell transfers and maintains the ghost-body binding.

- **Service**: `ghost-syncd.service` (PID usually ~1350)
- **Key files**:
  - `/sys/ghost/sync_state` — `SYNCED | DRIFTING | DESYNCED`
  - `/sys/ghost/bind_token` — current shell binding token
  - `/var/log/ghost-sync/drift.log` — sync drift measurements
- **Failure modes**: progressive drift, binding token expiry, sync deadlock

---

## Network Interfaces

| Interface | Purpose               | Typical state |
|-----------|-----------------------|---------------|
| `cb0`     | Cyberbrain internal bus| always up     |
| `dive0`   | Net dive interface    | up when diving|
| `syn0`    | Synapse link to shell | always up     |
| `lo`      | Loopback              | always up     |

---

## Key Users & Groups

| User/Group | UID/GID | Purpose                    |
|------------|---------|----------------------------|
| `operator` | 1000    | Primary consciousness user |
| `ghost`    | 500     | ghost-core service account |
| `mnemo`    | 501     | mnemosyned service account |
| `barrier`  | 502     | barrierd service account   |
| `synaps`   | 503     | synapsd service account    |
| `diver`    | 504     | dive-linkd service account |

---

## Boot Sequence

1. BIOS/UEFI → GRUB-CB bootloader
2. Kernel `6.9.0-cb` loads, initializes cyberbrain SoC
3. `ghost_drv` loads → locates ghost signature → integrity check
4. systemd starts → `barrierd` (first, security) → `ghost-core` → `synapsd`
5. `mnemosyned` starts → mounts `/mnt/ext-memory` → loads recall.db
6. `ghost-syncd` starts → binds ghost to current shell
7. `dive-linkd` starts → `dive0` interface up (standby)
8. `automond` starts → begins health monitoring
9. Login: `operator` session begins

---

## Failure Narrative

The terminal messages should suggest a system under stress — a cyberbrain
experiencing intermittent failures across multiple subsystems. The narrative arc:

1. **Early signs**: minor warnings — memory cache misses, slight sync drift,
   barrier detecting probes
2. **Escalation**: services failing to respond, kernel module errors,
   ghost integrity hash mismatches
3. **Crisis**: ghost fragmentation, memory corruption, barrier breach,
   consciousness continuity at risk

Messages should reference real paths, PIDs, service names, and error codes
from this document. They should read like `journalctl -f` output from
a system that is slowly losing coherence.
