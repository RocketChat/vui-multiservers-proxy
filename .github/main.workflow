workflow "Lint, test, and deploy server" {
  resolves = ["Deploy"]
  on = "push"
}
 action "Lint" {
  uses = "./.github/actions/lint/"
}
 action "Test" {
  needs = "Lint"
  uses = ".github/actions/test/"
}
 action "Deploy" {
  needs = ["Test", "Lint"]
  uses = ".github/actions/deploy/"
}
