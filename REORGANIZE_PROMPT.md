# Cursor prompt: reorganize MyWebsite

Copy everything between **PROMPT START** and **PROMPT END** into a new Cursor chat with this folder open (or reference `@MyWebsite`).

---

**PROMPT START**

Reorganize and clean this repository recursively:

Workspace: C:\Users\emmak\Desktop\CodingProjects\MyWebsite

Personal website project. Organize by **app structure** (src, content, public) with docs and scripts at clear top-level paths — standard web repo layout.

Organize by **content and name**, not primarily by file extension. Use type-based subfolders (`scripts/`, `assets/`, `archive/`) only where they help tooling.

### Goals

1. **Clean the repo root** — only `README.md`, `.gitignore`, config entry points, and essential top-level files. Move loose files into the correct folder.
2. **Reorganize recursively** — every subfolder should follow the same rules; fix mixed-purpose folders, duplicates, and stray files at any depth.
3. **Group by content/name** — folder names reflect purpose (feature, assignment, topic, deliverable), not primarily file extension.
4. **Preserve git history** — use `git mv` for tracked files when this is a git repo.
5. **Update references** — fix paths in scripts, READMEs, configs, imports, and build tooling after moves.
6. **Do not break workflows** — smoke-test scripts, apps, and notebooks you touch.

### Suggested top-level layout (adapt to what actually exists)

    MyWebsite/
    ├── README.md
    ├── .gitignore
    ├── src/                      # Application source
    ├── public/                   # Static assets
    ├── content/                  # CMS/markdown content
    ├── scripts/                  # Build/deploy scripts
    ├── docs/                     # Architecture and setup guides
    └── logos/                    # Brand assets

### Rules for placement

- **Setup/architecture MD at root** → `docs/` unless required at root for tooling.
- **Source vs content vs static** — don't mix; keep imports/paths valid.
- **Scripts** → `scripts/`; update package.json or config if paths change.

### Cleanup checklist

- [ ] Root has no stray loose files that belong in subfolders
- [ ] Related files (source + docs + tests for same feature) live together
- [ ] Scripts and automation paths updated
- [ ] README documents the final tree
- [ ] `.gitignore` covers venv, caches, large binaries, and secrets
- [ ] `git status` clean after commit
- [ ] All API/setup docs in docs/
- [ ] src/ imports still resolve

### Execution

1. Survey the full tree first (list root + all subfolders, note loose files).
2. Propose a short move plan in chat, then execute moves.
3. Update scripts, imports, and docs.
4. Commit with message: "Organize MyWebsite by content and clean repo layout"
5. Push only if `origin` exists and I have asked to push (otherwise stop after commit).

### Constraints

- Minimize scope: don't rewrite content inside files, only move/rename and fix paths.
- Don't edit any plan files in `.cursor/plans/` if present.
- Ask before deleting anything that might be the only copy of important work.
- Keep `.env` and secrets out of git; don't commit credentials.
- Gitignore caches (`__pycache__`, `.venv`, `node_modules`, `.ipynb_checkpoints`) rather than moving them.

Start by listing everything at the repo root and one level down, then proceed with the reorganization.

**PROMPT END**

---

## Tips

1. **Open this folder in Cursor** — File → Open Folder → `MyWebsite`.
2. **Git** — If this isn't a repo yet, add to the prompt: *"Initialize git if missing, then commit."*
3. **Push** — Add at the end: *"Push to origin when done."* only if you want that automatically.
