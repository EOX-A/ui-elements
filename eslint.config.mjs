import eox from "@eox/eslint-config";

export default [
  ...eox,
  {
    ignores: ["**/dist/*", "**/public/*"],
  },
];
