# How to Add Quant Questions

Questions live in `assets/quant/questions.json`. The console puzzle on
`index.html` randomly picks one each time the page loads.

## File Location

```
assets/quant/questions.json
```

## Format

The file is a JSON array. Each question is an object:

```json
{
    "id": "unique_short_name",
    "description": "Short human-readable name shown in the question table.",
    "question": [
        "Line 1 of the question.",
        "Line 2 of the question.",
        "What is the answer?"
    ],
    "answer": 3.1416,
    "tolerance": 0.01,
    "hint": "A sentence or two guiding the solver without giving it away.",
    "difficulty": "easy",
    "category": "probability"
}
```

## Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Short unique identifier (e.g. `"broken_stick"`) |
| `description` | string | yes | Human-readable name for the question (e.g. `"Broken stick triangle"`) |
| `question` | string[] | yes | Array of lines displayed in the console. Keep lines short (~50 chars) for readability. |
| `answer` | number | yes | The correct numeric answer. |
| `tolerance` | number | yes | Accepted margin of error. `cbos.unlock(x)` passes if `|x - answer| <= tolerance`. |
| `hint` | string | yes | Shown when the user types `cbos.hint()`. Should guide without solving. |
| `difficulty` | string | yes | One of: `"easy"`, `"medium"`, `"hard"`. Displayed as metadata. |
| `category` | string | yes | Topic tag, e.g. `"probability"`, `"expected value"`, `"combinatorics"`. |

## Adding a Question

### Option 1: Use the script (recommended)

Run from the project root:

```bash
python3 add_quant.py
```

The script walks you through each field interactively:
1. Prompts for ID (validates uniqueness against existing questions)
2. Question text — enter each line, empty line to finish
3. Numeric answer and tolerance
4. Hint text
5. Difficulty (easy / medium / hard)
6. Category (probability, expected value, combinatorics, etc.)

Shows a preview and asks for confirmation before saving.

### Option 2: Edit JSON directly

1. Open `assets/quant/questions.json`
2. Add a new object to the array (don't forget the comma after the previous entry)
3. Fill in all fields
4. Save

### Template

Copy and fill in:

```json
{
    "id": "",
    "description": "",
    "question": [
        ""
    ],
    "answer": 0,
    "tolerance": 0.01,
    "hint": "",
    "difficulty": "",
    "category": ""
}
```

## Tips

- **Tolerance**: for exact integer answers use `0.001`. For irrational or
  long-decimal answers, use `0.01`–`0.05` depending on how precise you want
  the solver to be.
- **Question lines**: each string in the array prints as a separate console
  line. Break at natural reading points.
- **Hint**: aim for "points in the right direction" without revealing the
  method. E.g. "Think about linearity of expectation" rather than
  "Sum 1/(2k-1) for k=1..100".
- **Answer**: always a single number. No fractions, expressions, or text.

## Current Questions

| ID | Description | Category | Difficulty | Answer |
|----|-------------|----------|------------|--------|
| `noodles` | Noodle loops | expected value | hard | ~5.1874 |
| `coupon_collector` | Coupon collector (die) | expected value | medium | ~14.7 |
| `broken_stick` | Broken stick triangle | probability | medium | 0.25 |
| `first_ace` | First ace from deck | expected value | medium | ~10.6 |
| `random_walk_return` | Random walk return | probability | easy | 0.3125 |
