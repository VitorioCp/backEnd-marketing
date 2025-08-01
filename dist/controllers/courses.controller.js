"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCourses = listCourses;
exports.createCourses = createCourses;
exports.deleteCourses = deleteCourses;
exports.updateCourses = updateCourses;
exports.publicListCourses = publicListCourses;
const courses_services_1 = require("../services/courses.services");
function listCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield (0, courses_services_1.getCourses)();
            res.json(courses);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao buscar cursos:", error.message);
            }
            res.status(500).json({ error: "Erro ao buscar cursos" });
        }
    });
}
function createCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseData = req.body;
            if (!courseData.titulo ||
                !courseData.desc ||
                !courseData.horas ||
                !courseData.img ||
                !courseData.status) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            }
            const newCourse = yield (0, courses_services_1.createCourse)(courseData);
            res.status(201).json(newCourse);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao criar curso:", error.message);
                const prismaError = error;
                if (prismaError.code === 'P2002') {
                    return res.status(409).json({ error: "Curso já existe" });
                }
            }
            res.status(500).json({ error: "Erro ao criar curso" });
        }
    });
}
function deleteCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield (0, courses_services_1.deleteCourse)(Number(id));
            res.status(204).end();
        }
        catch (error) {
            if (error instanceof Error) {
                const prismaError = error;
                if (prismaError.code === 'P2025') {
                    return res.status(404).json({ error: "Curso não encontrado" });
                }
                console.error("Erro ao deletar o curso:", error.message);
            }
            res.status(500).json({ error: "Erro ao deletar curso" });
        }
    });
}
function updateCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updateData = req.body;
        if (!id) {
            return res.status(400).json({ error: "ID do curso não fornecido" });
        }
        try {
            const updatedCourse = yield (0, courses_services_1.updateCourseById)(Number(id), updateData);
            res.json(updatedCourse);
        }
        catch (error) {
            if (error instanceof Error) {
                const prismaError = error;
                if (prismaError.code === 'P2025') {
                    return res.status(404).json({ error: "Curso não encontrado" });
                }
                console.error("Erro ao atualizar o curso:", error.message);
            }
            res.status(500).json({ error: "Erro ao atualizar o curso" });
        }
    });
}
function publicListCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield (0, courses_services_1.getCoursesPublic)();
            res.json(courses);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao buscar cursos públicos:", error.message);
            }
            res.status(500).json({ error: "Erro ao buscar cursos" });
        }
    });
}
