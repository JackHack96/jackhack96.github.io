Personal website of Matteo Iervasi

## Writing posts

Posts are parked as drafts before they're published, and drafts sync across devices via git like anything else — `_drafts/` is never rendered on the live site, so there's no risk of half-finished posts leaking out.

- Start a draft: `bundle exec jekyll draft "My New Post"` → creates `_drafts/my-new-post.md`.
- Preview locally, drafts included: `bundle exec jekyll serve --drafts`.
- Park it / resume on another device: just `git add`, `git commit`, `git push` on `master` as usual; `git pull` on the other device to pick up where you left off.
- Publish when ready: `bundle exec jekyll publish _drafts/my-new-post.md` → moves it to `_posts/YYYY-MM-DD-my-new-post.md` with today's date. Commit and push for the live build to pick it up.
- Change your mind after publishing: `bundle exec jekyll unpublish _posts/YYYY-MM-DD-my-new-post.md` moves it back to `_drafts/`.
