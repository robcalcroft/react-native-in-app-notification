module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      // These two are turned off due to peerDependencies not being read by ESLint
      "import/no-unresolved": 0,
      "import/extensions": 0,
    },
};
