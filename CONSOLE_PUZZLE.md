# Console Puzzle Walkthrough

There is a hidden path to `cyberpunk.html` through the browser console on the homepage.

## Step 1: Open the Console

On `index.html`, open DevTools (F12 or Cmd+Opt+I). You'll see a welcome message and a hint:

```
Something stirs beneath the surface. Try: cbos.terminal()
```

## Step 2: Start the Terminal

Type in the console:

```js
cbos.terminal()
```

This drops you into a simulated CBOS shell. You interact by calling:

```js
cbos.cmd('command here')
```

## Step 3: Explore the Filesystem

Start by looking around:

```js
cbos.cmd('ls /')
```

This shows the root directories: `home/`, `sys/`, `var/`, `etc/`, `tmp/`.

Read the operator's notes for a clue:

```js
cbos.cmd('cat /home/operator/notes.txt')
```

> "The barrier holds. But not forever.
> Something is listening on /var/log/barrier/.
> I should check the intrusion log."

## Step 4: Follow the Trail

Check the intrusion log:

```js
cbos.cmd('cat /var/log/barrier/intrusion.log')
```

The last entry points you to `/etc/barrier/gateway.locked`.

## Step 5: Find the Gateway

```js
cbos.cmd('cat /etc/barrier/gateway.locked')
```

This shows a quant interview question. A random question is selected from the
question bank each time the page loads.

## Step 6: Solve and Unlock

Answer with a number:

```js
cbos.unlock(your_answer)
```

If correct, the gateway opens and you're redirected to `cyberpunk.html`.

## Shortcut: sudo gateway

If you already know the credentials, skip the filesystem exploration:

```js
cbos.terminal()
cbos.cmd('sudo gateway operator ghost')
```

The username is `operator` (found in `/etc/barrier/whitelist`) and the
password is `ghost` (hinted in `/home/operator/.profile`). This jumps
straight to the quant question.

## Extra Commands

| Command | Description |
|---------|-------------|
| `cbos.hint()` | Get a hint for the current question |
| `cbos.reroll()` | Get a different random question |
| `cbos.cmd('sudo gateway <user> <pass>')` | Authenticate directly to the gateway |
| `cbos.cmd('help')` | List available shell commands |
| `cbos.cmd('ls')` | List directory contents |
| `cbos.cmd('cd path')` | Change directory |
| `cbos.cmd('cat file')` | Read a file |
| `cbos.cmd('pwd')` | Print working directory |
| `cbos.cmd('whoami')` | Show current user |

## Notes

- Answers are always numeric (integer or decimal).
- Each question has a tolerance — you don't need infinite precision, but you
  need to be close. Typically 2–4 significant figures.
- Questions are loaded from `assets/quant/questions.json`. See
  `HOW_TO_ADD_QUANT.md` to add your own.
