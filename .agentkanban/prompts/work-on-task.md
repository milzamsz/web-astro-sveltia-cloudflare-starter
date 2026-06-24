# Prompt — single-task work driver

Carry one chosen task to **done** without touching other tasks. Uses the `standard` workflow:
`backlog → planning → in-progress → review → done`. After reading, implement, verify, and advance per instructions below.

---

```markdown
# SINGLE-TASK WORK DRIVER

Source-of-truth order: AGENTS.md (custom rules + DoD) -> code -> TECHNICAL.md -> .agentkanban/INSTRUCTION.md.
Read AGENTS.md, .agentkanban/memory.md, and the task file + linked artifacts before touching code.
Stack: `Web Frontend`.
Required Skills: `astro`, `design-guide`, `design-taste-frontend`, `design-taste-frontend-v1`, `frontend-design`, `shadcn`, `high-end-visual-design`

## Stack-Specific Coverage Requirements
- [ ] component structure, design tokens
- [ ] accessibility (a11y)
- [ ] responsive layout
- [ ] state management
- [ ] data fetching
- [ ] error/empty/loading states

## Task

****

Task file: ``

## Workflow

Profile: `standard`
Lanes: `backlog → planning → in-progress → review → done`

Standard workflow:
- `in-progress` → implementation + verification.
- Set `lane: review` after verification passes. Review is a human gate.
- `review → done` only after the human review gate passes.
- Worktree per board policy.

## Instructions

### 1. Read context

Read the task file (``), its linked `change/` artifacts (proposal.md, design.md, tasks.md),
its capability spec, the todo checklist, and `.agentkanban/INSTRUCTION.md`.
Re-read the task's `dependsOn` list. Do not start if a dependency is not in `done`.

### 2. Implement only this task's scope

Move the task to `in-progress`. Implement strictly the approved scope from `tasks.md`.
Reuse existing repository patterns. Honor stack coverage (`- [ ] component structure, design tokens
- [ ] accessibility (a11y)
- [ ] responsive layout
- [ ] state management
- [ ] data fetching
- [ ] error/empty/loading states`) and required
skills (``astro`, `design-guide`, `design-taste-frontend`, `design-taste-frontend-v1`, `frontend-design`, `shadcn`, `high-end-visual-design``).

### 3. Verify gate

Run the verification commands:


Check off `tasks.md` items only after verification. Paste real output, not assertions.

### 4. Advance

Standard workflow:
- `in-progress` → implementation + verification.
- Set `lane: review` after verification passes. Review is a human gate.
- `review → done` only after the human review gate passes.
- Worktree per board policy.

Do not modify or advance other tasks. When done, stop.
```

---

Continue in the task file. Use explicit lane transitions. Record evidence. Never claim pass without output.
