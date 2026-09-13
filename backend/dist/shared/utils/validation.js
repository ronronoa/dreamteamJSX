import { z } from "zod";
export function validate(schema, data) {
    const result = schema.safeParse(data);
    return result.success
        ? { success: true, data: result.data }
        : { success: false, error: result.error };
}
export function formatZodError(error) {
    const formatted = {};
    for (const issue of error.issues) {
        const path = issue.path.join(".");
        if (!formatted[path]) {
            formatted[path] = [];
        }
        formatted[path].push(issue.message);
    }
    return formatted;
}
//# sourceMappingURL=validation.js.map