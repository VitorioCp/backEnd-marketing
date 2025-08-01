"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const courses_controller_1 = require("../controllers/courses.controller");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authenticateToken, courses_controller_1.listCourses);
router.get("/public", courses_controller_1.publicListCourses);
router.post("/", authMiddleware_1.authenticateToken, courses_controller_1.createCourses);
router.put("/:id", authMiddleware_1.authenticateToken, courses_controller_1.updateCourses);
router.delete("/:id", authMiddleware_1.authenticateToken, courses_controller_1.deleteCourses);
exports.default = router;
