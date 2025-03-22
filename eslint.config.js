// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
    {
        extends: [eslintPluginPrettierRecommended],
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        ignores: ["dist/**"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: globals.browser,
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            "@typescript-eslint": ts,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...ts.configs.recommended.rules,
            ...react.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-empty-function": "error",
            eqeqeq: ["warn", "always"],
            "react/react-in-jsx-scope": "off",
            "no-console": ["warn", { allow: ["warn", "error"] }],
        },
        settings: {
            react: {
                version: "detect", // Detecta automáticamente la versión de React
            },
        },
    },
]);
