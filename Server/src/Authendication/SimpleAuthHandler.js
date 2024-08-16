const _AuthHandler = require("./_AuthHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class SimpleAuthHandler extends _AuthHandler {
  constructor(user) {
    super();
    this.user = user; // Connection til DB
  }

  async authenticate(credentials) {
    const users = await this.user.findUser({ userName: credentials.userName });
    if (users && bcrypt.compareSync(credentials.password, user.password)) {
      const token = jwt.sign({ userId: user.id }, "secretKey", {
        expireIn: "10h",
      });

      await this.sessionDB.createSession({
        session_id: token,
        user_id: this.user.id,
        token,
        expires_at: new Date(),
        last_activity: new Date(),
      });

      return token;
    }
    throw new Error("Invalid credentials");
  }

  async validateSession(token) {
    // Finder sessionen i DB
    const session = await this.sessionDB.findSessionByToken(token);
    if (!session) {
      throw new Error("Session not found");
    }

    //Opdatere tid
    await this.sessionDB.UpdateSessionActivity(token, new Date());

    try {
      const decoded = jwt.verify(token, "secretKey");
      return decoded.userId;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  async logout(token) {}
}

module.exports = SimpleAuthHandler;
