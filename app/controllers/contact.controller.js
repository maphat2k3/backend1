const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
// Create and Save a new Contact
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = []; // Khởi tạo mảng để chứa các tài liệu (documents)

    try {
        // Khởi tạo ContactService để tương tác với CSDL
        const contactService = new ContactService(MongoDB.client);
        
        // Lấy tham số 'name' từ query string (ví dụ: /api/contacts?name=...)
        const { name } = req.query;

        if (name) {
            // Nếu có tham số 'name', tìm kiếm liên hệ theo tên
            documents = await contactService.findByName(name);
        } else {
            // Nếu không có tham số 'name', lấy tất cả liên hệ
            documents = await contactService.find({});
        }
    } catch (error) {
        // Xử lý lỗi nếu có vấn đề xảy ra khi truy xuất CSDL
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    // Trả về danh sách các tài liệu (liên hệ) đã tìm thấy
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        // Khởi tạo ContactService để tương tác với CSDL
        const contactService = new ContactService(MongoDB.client);
        
        // Gọi phương thức findById để tìm kiếm liên hệ bằng ID lấy từ tham số URL
        const document = await contactService.findById(req.params.id);
        
        if (!document) {
            // Nếu không tìm thấy liên hệ (document là null/undefined), trả về lỗi 404
            return next(new ApiError(404, "Contact not found"));
        }
        
        // Nếu tìm thấy, trả về thông tin liên hệ
        return res.send(document);
    } catch (error) {
        // Xử lý lỗi (thường là lỗi 500) nếu có vấn đề xảy ra 
        // trong quá trình truy xuất (ví dụ: ID không hợp lệ gây lỗi trong findById)
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
    // 1. Kiểm tra dữ liệu cập nhật (body) không được rỗng
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        
        // 2. Gọi phương thức update() của Service
        const document = await contactService.update(req.params.id, req.body);
        
        if (!document) {
            // 3. Nếu không tìm thấy liên hệ để cập nhật, trả về lỗi 404
            return next(new ApiError(404, "Contact not found"));
        }
        
        // 4. Cập nhật thành công, trả về thông báo
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        // 5. Xử lý lỗi server (ví dụ: ID không hợp lệ)
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        
        // 1. Gọi phương thức delete() của Service
        const document = await contactService.delete(req.params.id);
        
        if (!document) {
            // 2. Nếu không tìm thấy liên hệ để xóa, trả về lỗi 404
            return next(new ApiError(404, "Contact not found"));
        }
        
        // 3. Xóa thành công, trả về thông báo
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        // 4. Xử lý lỗi server (ví dụ: ID không hợp lệ)
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => { [cite: 309]
    try {
        const contactService = new ContactService(MongoDB.client); [cite: 311]
        // Gọi phương thức deleteAll() và nhận về số lượng đã xóa
        const deletedCount = await contactService.deleteAll(); [cite: 311]
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`, [cite: 313]
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts") [cite: 316]
        );
    }
};

exports.findAllFavorite = (req, res) => {
  res.send({ message: "findAllFavorite handler" });
};
