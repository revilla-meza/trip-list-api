import { Response } from "express";
import { getRepository } from 'typeorm';
import { List } from '../../entities/list.entity';
import { GetUserAuthInfoRequest } from "../../types";

type RelationMutation = "add" | "remove";

class ListController {
  static rootPath = '/list';

  private listRepository = getRepository(List);
 
  getAllLists = async (request: GetUserAuthInfoRequest, response: Response) => {
    const lists = 
      await this.listRepository.find({
        where: { 
         user: request.user,
        }
      });

    response.json(lists);
  }

  getOneList = async (request: GetUserAuthInfoRequest, response: Response) => {
    const list = await this.listRepository.findOne(request.params.listId);
    response.json(list);
  }

  createList = async (request: GetUserAuthInfoRequest, response: Response) => {
    const list = await this.listRepository.create(request.body);
    const results = await this.listRepository.save(list);
    response.json(results);
  }

  updateList = async (request: GetUserAuthInfoRequest, response: Response) => {
    const list = await this.listRepository.findOne(request.params.listId);
    this.listRepository.merge(list, request.body);
    const results = await this.listRepository.save(list);
    response.json(results);
  }

  deleteList = async (request: GetUserAuthInfoRequest, response: Response) => {
    const results = await this.listRepository.delete(request.params.listId);
    response.json(results);
  }

  addCategoryToList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.listId, request.params.categoryId, "add");
    } catch(e) {
      return response.json({error: e.message});
    }
    const list = await this.listRepository.findOne(request.params.listId);
    response.json(list);
  }

  removeCategoryFromList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.listId, request.params.categoryId, "remove");
    } catch(e) {
      return response.json({error: e.message});
    }
    const list = await this.listRepository.findOne(request.params.listId);
    response.json(list);
  }

  addOrRemoveRelation = async (listId:string, categoryId:string, action:RelationMutation) => {
    const column = await this.listRepository
                      .createQueryBuilder()
                      .relation(List, "categories")
                      .of(listId)
    if (action==="add") {
      await column.add(categoryId);
    } else {
      await column.remove(categoryId);
    }
  }
}

export default ListController;
