workflow "Lint, test, and deploy server" {
  resolves = ["Deploy"]
  on = "push"
}

action "Lint" {
  needs = ["Test", "Filter Not Act"]
  uses = "sing-li/eslint-action@master"
  secrets = ["GITHUB_TOKEN"]
}

action "Test" {
  uses = "./.github/actions/test/"
}

action "Deploy" {
  needs = ["Test", "Lint"]
  uses = "./.github/actions/deploy/"
}

action "Filter Not Act" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "not actor nektos/act"
}
