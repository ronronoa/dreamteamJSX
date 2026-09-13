export function toSafeUser(user) {
    return {
        id: user.user_id,
        name: user.name,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
//# sourceMappingURL=user.js.map