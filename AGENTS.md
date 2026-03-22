<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes � APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules for AI Agents

## Stack
- Next.js App Router
- TypeScript
- SCSS Modules
- VKUI
- ESLint + Prettier

## Architecture
- FSD
- app/ � only routing/layout/page-level, composition business logic does not live in app/
- shared/ � reusable ui/util/api
- entities/, features/, widgets/ � strictly by responsibility

## Rules
- Use TypeScript strictly
- Do not use `any`
- Prefer Server Components by default
- Add `use client` only when necessary
- Keep components small and focused
- Do not introduce new dependencies without need
- Follow existing project structure
- Use Prettier formatting rules from project config
- Follow ESLint rules from project config

## Workflow
- First analyze the relevant files
- Then propose minimal changes
- Prefer simple solutions over abstractions
- Do not rewrite unrelated code
- Provide explanation
