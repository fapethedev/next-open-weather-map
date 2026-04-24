# Contributing to Next Weather Pro 3D

First off, thank you for considering contributing to this project! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## Code of Conduct
By participating in this project, you are expected to uphold our high standards of professional and respectful communication.

## How Can I Contribute?

### Reporting Bugs
- Use the GitHub Issue Tracker.
- Describe the bug with steps to reproduce.
- Include information about your browser and OS.

### Suggesting Enhancements
- Open an issue with the tag `enhancement`.
- Explain why this feature would be useful.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes (`pnpm typecheck`).
4. Format your code with `pnpm format`.
5. Open a PR with a clear description of the changes.

## Style Guide
- Use **TypeScript** for all new components.
- Follow the **Bento UI** aesthetic (rounded-3xl, backdrop-blur, white/5 border).
- Use **Framer Motion** for UI transitions.
- Keep **Three.js** logic inside the `src/components/three/` directory.

## Local Development
```bash
pnpm install
pnpm dev
```

Questions? Open an issue and we'll help you out!
