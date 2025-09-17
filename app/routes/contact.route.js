const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

router.route("/")
  .get(contacts.findAll)       // Lấy tất cả contact
  .post(contacts.create)       // Tạo contact mới
  .delete(contacts.deleteAll); // Xóa tất cả contact

router.route("/favorite")
  .get(contacts.findAllFavorite); // Lấy các contact yêu thích

router.route("/:id")
  .get(contacts.findOne)      // Lấy 1 contact theo id
  .put(contacts.update)       // Cập nhật contact theo id
  .delete(contacts.delete);   // Xóa contact theo id

module.exports = router;
