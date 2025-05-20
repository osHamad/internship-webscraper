export function getEnvOrThrow(env) {
    if (env) return env
    throw new Error("Missing env variables")
}