Personal website of Matteo Iervasi

Built with Jekyll and served by GitHub Pages. There is no JavaScript/CSS build step:
styles live in `_sass/` and are compiled by Jekyll from `css/main.scss`.

Local development:

    bundle install
    bundle exec jekyll serve --drafts

- Homepage content: `index.html`, `_data/education.yml`, `_data/publications.yml`
- Blog posts: `_posts/`, drafts in `_drafts/`
- Icons: inline SVGs in `_includes/icon.html` (Font Awesome Free, CC BY 4.0)
