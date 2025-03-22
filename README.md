## A simple blog that uses Just The Docs

Development 

- Clean installed files `bundle clean --force`
- Install gem files based on gemfile.lock `bundle install`
- Run `jekyll serve -l`

Build (not required when using github actions)

- Clean `jekyll clean`
- Build `jekyll build`

Notes(For all)
Use github actions for deploying the site.

Notes(For my self)
`git push -u --force origin main`


--Update the gems and lock file - `bundle update --bundler`