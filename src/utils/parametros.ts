export function parametros(
    params: Record<string, string | number>
): string {
    return new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)]))
        .toString()
}