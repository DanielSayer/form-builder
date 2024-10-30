export const removeBlankLines = (code: string) => {
  return code
    .split("\n")
    .filter((line) => line.trim())
    .join("\n");
};

export const spreadExtraConfig = (extraConfig: object | undefined) => {
  if (!extraConfig) {
    return "";
  }

  const mappedConfig = extraConfig as Record<string, unknown>;
  return `
      ${Object.keys(mappedConfig)
        .map((key) => {
          if (typeof mappedConfig[key] === "string") {
            return `${key}={"${mappedConfig[key]}"} `;
          }

          return `${key}={${mappedConfig[key]}} `;
        })
        .join("")}
  `.trim();
};
