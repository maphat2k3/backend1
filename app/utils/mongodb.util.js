const { MongoClient } = require("mongodb");

class MongoDB {
  static async connect(uri) {
    if (this.client) return this.client;
    this.client = await MongoClient.connect(uri);
    console.log("✅ Kết nối MongoDB thành công!");
    return this.client;
  }
}

module.exports = MongoDB;
