import { Response } from "express";
import { getRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { GetUserAuthInfoRequest } from "../../types";


class CategoryController {
  static rootPath = '/category';

  private categoryRepository = getRepository(Category);
 
  getAllCategories = async (request: GetUserAuthInfoRequest, response: Response) => {
    const categories = 
      await this.categoryRepository.find({
        where: { 
          userId: request.user[process.env.AUTH0_AUDIENCE + '/userId'],
        }
      });

    response.json(categories);
  }

  getOneCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    const category = await this.categoryRepository.findOne(request.params.categoryId);
    response.json(category);
  }

  createCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    const category = await this.categoryRepository.create(request.body);
    const results = await this.categoryRepository.save(category);
    response.json(results);
  }

  updateCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    const category = await this.categoryRepository.findOne(request.params.categoryId);
    this.categoryRepository.merge(category, request.body);
    const results = await this.categoryRepository.save(category);
    response.json(results);
  }

  deleteCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    const results = await this.categoryRepository.delete(request.params.categoryId);
    response.json(results);
  }
}

export default CategoryController;
