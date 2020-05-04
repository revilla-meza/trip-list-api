import { Response } from "express";
import { getRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { GetUserAuthInfoRequest } from "../../types";


class CategoryController {
  static rootPath = '/category';

  private categoryRepository = getRepository(Category);
 
  getAllCategories = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const categories = 
      await this.categoryRepository.find({
        where: { 
          user: request.user,
        }
      });

      response.json(categories);
    } catch(e) {
      return response.json({ error: e.message });
    }

  }

  getOneCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const category = await this.categoryRepository.findOne(request.params.categoryId);
      if (!category) {
        response.status(404);
        return response.json({ error: `No category with id ${request.params.categoryId}` })
      }
      return response.json(category);
    } catch(e) {
      return response.json({ error: e.message });
    }

  }

  createCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const category = await this.categoryRepository.create(request.body);
      const results = await this.categoryRepository.save(category);
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }

  }

  updateCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const category = await this.categoryRepository.findOne(request.params.categoryId);
      if (!category) {
        response.status(404);
        return response.json({error: `No category found with id ${request.params.categoryId}`});
      }
      this.categoryRepository.merge(category, request.body);
      const results = await this.categoryRepository.save(category);
      return response.json(results);
    } catch(e) {
      return response.json({error: e.message})
    }
  }

  deleteCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const results = await this.categoryRepository.delete(request.params.categoryId);
      return response.json(results);
    } catch(e) {
      return response.json({ error: e.message });
    }
  }
}

export default CategoryController;
