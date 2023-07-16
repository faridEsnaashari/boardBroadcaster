module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true,
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": 0
    }
}
