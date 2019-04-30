module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {
      "browsers": [
        "> 1%",
        "last 5 versions",
        "ie>= 7",
        "ios >= 6",
        "android >= 2.1"
      ]
    },
    "postcss-px2rem": {
      "remUnit": 75
    }
  }
}
