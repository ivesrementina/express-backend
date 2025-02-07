module.exports = { 
    root: true, 
    env: { 
      es2021: true, 
      node: true, 
    }, 
    parser: "@typescript-eslint/parser", 
    parserOptions: { 
      ecmaVersion: "latest", 
      sourceType: "module", 
    }, 
    extends: [ 
      "eslint:recommended", 
      "plugin:@typescript-eslint/recommended", 
      "plugin:prettier/recommended" 
    ], 
    plugins: ["@typescript-eslint", "prettier"], 
    rules: { 
      // Show Prettier errors as ESLint errors 
      "prettier/prettier": "error", 
   
      // EXAMPLE: Add stricter or custom TS rules here 
      // "@typescript-eslint/explicit-module-boundary-types": "warn", 
    } 
  }; 
  