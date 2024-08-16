class _AuthHandler {
    async authenticate(credintials) {
        throw new Error("Method not implented");
    };

    async validateSession(token) {
        throw new Error("Method not implemented");
    };

    async logout(token) {
        throw new Error("Method not implemented")
    }; 
};

module.exports = _AuthHandler; 