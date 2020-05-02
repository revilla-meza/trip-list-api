import { Response } from "express";
import { getRepository } from 'typeorm';
import { List } from '../../entities/list.entity';
import { GetUserAuthInfoRequest } from "../../types";


class ListController {
  static rootPath = '/list';

  private listRepository = getRepository(List);
 
  getAllLists = async (request: GetUserAuthInfoRequest, response: Response) => {
    const lists = 
      await this.listRepository.find({
        where: { 
         user: request.user,
         relations: ["items"],
        }
      });

    response.json(lists);
  }

  getOneList = async (request: GetUserAuthInfoRequest, response: Response) => {
    const list = await this.listRepository.findOne(request.params.listId,{ relations: ["items"] });
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
}

export default ListController;
