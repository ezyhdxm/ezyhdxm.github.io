#!/usr/bin/env python3
"""Add a quant interview question to assets/quant/questions.json."""

import json
import os
import sys
import textwrap

QUESTIONS_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "assets", "quant", "questions.json"
)

DIFFICULTIES = ("easy", "medium", "hard")
CATEGORIES = (
    "probability",
    "expected value",
    "combinatorics",
    "statistics",
    "linear algebra",
    "calculus",
    "game theory",
    "other",
)


def load_questions():
    with open(QUESTIONS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_questions(data):
    with open(QUESTIONS_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
        f.write("\n")


def prompt(label, default=None):
    suffix = f" [{default}]" if default else ""
    val = input(f"  {label}{suffix}: ").strip()
    return val if val else default


def prompt_choice(label, choices):
    print(f"  {label}:")
    for i, c in enumerate(choices, 1):
        print(f"    {i}. {c}")
    while True:
        val = input(f"  Choice [1-{len(choices)}]: ").strip()
        if val.isdigit() and 1 <= int(val) <= len(choices):
            return choices[int(val) - 1]
        # also accept typing the name directly
        if val.lower() in [c.lower() for c in choices]:
            return val.lower()
        print(f"  Invalid choice. Enter 1-{len(choices)} or the name.")


def prompt_float(label):
    while True:
        val = input(f"  {label}: ").strip()
        try:
            return float(val)
        except ValueError:
            print("  Please enter a number.")


def prompt_multiline(label):
    print(f"  {label}")
    print("  (Enter each line of the question. Empty line to finish.)")
    lines = []
    while True:
        line = input("    > ")
        if not line.strip() and lines:
            break
        if line.strip():
            lines.append(line.strip())
    return lines


def main():
    print()
    print("=" * 50)
    print("  Add a Quant Interview Question")
    print("=" * 50)
    print()

    questions = load_questions()
    existing_ids = {q["id"] for q in questions}

    # ID
    while True:
        qid = prompt("Unique ID (short, snake_case)")
        if not qid:
            print("  ID is required.")
            continue
        if qid in existing_ids:
            print(f"  ID '{qid}' already exists. Choose another.")
            continue
        break

    # Description
    description = prompt("Description (short human-readable name)")

    print()

    # Question text
    question_lines = prompt_multiline("Question text (shown in console)")

    print()

    # Answer
    answer = prompt_float("Correct answer (number)")

    # Tolerance
    tol_default = "0.01"
    tol_str = prompt("Tolerance (margin of error)", default=tol_default)
    try:
        tolerance = float(tol_str)
    except ValueError:
        tolerance = 0.01

    print()

    # Hint
    hint = prompt("Hint (one sentence, guides without solving)")

    print()

    # Difficulty
    difficulty = prompt_choice("Difficulty", list(DIFFICULTIES))

    print()

    # Category
    category = prompt_choice("Category", list(CATEGORIES))

    # Build the question
    new_q = {
        "id": qid,
        "description": description,
        "question": question_lines,
        "answer": answer,
        "tolerance": tolerance,
        "hint": hint,
        "difficulty": difficulty,
        "category": category,
    }

    # Preview
    print()
    print("-" * 50)
    print("  Preview:")
    print("-" * 50)
    print(json.dumps(new_q, indent=4, ensure_ascii=False))
    print("-" * 50)
    print()

    confirm = input("  Add this question? [Y/n] ").strip().lower()
    if confirm in ("", "y", "yes"):
        questions.append(new_q)
        save_questions(questions)
        print(f"\n  Added '{qid}' to {QUESTIONS_PATH}")
        print(f"  Total questions: {len(questions)}")
    else:
        print("\n  Cancelled.")

    print()


if __name__ == "__main__":
    main()
