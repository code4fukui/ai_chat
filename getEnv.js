export const getEnv = async (name) => {
  const env = Deno.env.get(name);
  if (env !== undefined) {
    return env.trim();
  }
  const ss = (await Deno.readTextFile(".env")).split("\n");
  const name2 = name + "=";
  for (const s of ss) {
    if (s.startsWith(name2)) {
      return s.substring(name2.length).trim();
    }
  }
  return undefined;
};
