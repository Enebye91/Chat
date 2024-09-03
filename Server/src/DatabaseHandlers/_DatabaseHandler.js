//Database Interface
class _DatabaseHandler {
  async connect(connectionString) {
    throw new Error("Method not implemented");
  }

  // ved at bruge async returnere den et promise
  // message parameteret sendes til metoden. Da metoden ikke er implementeret endnu står der ikke hvordan parameteret message bliver brugt.
  // Den er en placeholder
  async saveMessage(message) {
    throw new Error("Method not implemented");
  }

  //Finder en besked baseret på en request
  async findMessage(query) {
    throw new Error("Method not implemented");
  }

  // Opdaterer en besked i db baseret på et request
  async updateMessage(query, update) {
    throw new Error("Method not implemented");
  }

  // Sletter en besked fra db baseret på et request
  async deleteMessage(query) {
    throw new Error("Method not implemented");
  }

  // Lukker db forbindelsen
  async close() {
    throw new Error("Method not implemented");
  }
}

// Eksporetere den selvstændige fil
module.exports = _DatabaseHandler;
