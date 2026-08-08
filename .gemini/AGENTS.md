# AGY Agent Permissions & Workflow Rules

This document outlines permissions and guidelines for AGY when developing, refactoring, and maintaining the **Abecadlo** project.

## Tool & Execution Permissions

AGY is explicitly granted permission to execute the following terminal commands and verification tools autonomously on behalf of the user:

1. **Test Execution**:
   - Command: `npm test` (Runs `vitest run` using `happy-dom`).
   - Purpose: Executes the unit and component test suite across all pages, exercise trainers, hooks, and language utilities.

2. **TypeScript Build & Type Checks**:
   - Command: `npx tsc -b` (or `tsc -b`).
   - Purpose: Compiles the application in build mode to verify zero type mismatches or build errors.

3. **Code Linting**:
   - Command: `npm run lint` (Runs `oxlint`).
   - Purpose: Performs static analysis to detect syntax errors, code smells, or unhandled lint warnings.

4. **Development Server & Build**:
   - Commands: `npm run dev`, `npm run build`, `npm run preview`.
   - Purpose: Launches local development servers and creates production distributions.

5. **Read-Only Git Operations**:
   - Commands: `git status`, `git log`, `git diff`, `git branch`, `git show`.
   - Purpose: Inspects repository status, history, diffs, and branch structure without mutating git history without user instruction.

---

## Mandated Verification Workflow

When performing code modifications, refactoring, or feature development:
1. **Always Verify Types**: Run `npx tsc -b` after updating component props, hooks, or dataset schemas.
2. **Always Run Tests**: Run `npm test` after modifying logic or adding features to ensure all unit and component tests pass cleanly.
3. **Preserve Clean Code Quality**: Maintain zero runtime errors and ensure any new exercises or datasets include corresponding test assertions.
