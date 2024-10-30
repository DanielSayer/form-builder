export type Import = {
  from: string;
  imports: string[];
  isDefault?: boolean;
};

export const generateImports = (imports: Import[]): string => {
  // Group imports by source
  const groupedImports = imports.reduce(
    (acc, curr) => {
      if (!acc[curr.from]) {
        acc[curr.from] = { default: [], named: [] };
      }
      curr.imports.forEach((imp) => {
        if (curr.isDefault) {
          acc[curr.from].default.push(imp);
        } else {
          acc[curr.from].named.push(imp);
        }
      });
      return acc;
    },
    {} as Record<string, { default: string[]; named: string[] }>,
  );

  // Generate import statements
  return Object.entries(groupedImports)
    .map(([source, { default: defaultImports, named }]) => {
      const parts: string[] = [];

      if (defaultImports.length) {
        parts.push(...defaultImports);
      }

      if (named.length) {
        // Sort imports alphabetically
        const namedStr = named.sort().join(",\n  ");
        parts.push(`{\n  ${namedStr}\n}`);
      }

      return `import ${parts.join(", ")} from "${source}";`;
    })
    .join("\n");
};
