import { Response } from "express";
import { getRepository } from 'typeorm';
import { List } from '../../entities/list.entity';
import { IGetUserAuthInfoRequest } from "../../types";


class ListController {
  public rootPath = '/list';

  private listRepository = getRepository(List);
 
  getAllLists = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const lists = 
      await this.listRepository.find({
        where: { 
          userId: request.user[process.env.AUTH0_AUDIENCE + '/userId'],
        }
      });

    response.json(lists);
  }

  getOneList = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const list = await this.listRepository.findOne(request.params.listId);
    response.json(list);
  }

  createList = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const list = await this.listRepository.create(request.body);
    const results = await this.listRepository.save(list);
    response.json(results);
  }

  updateList = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const list = await this.listRepository.findOne(request.params.listId);
    this.listRepository.merge(list, request.body);
    const results = await this.listRepository.save(list);
    response.json(results);
  }

  deleteList = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const results = await this.listRepository.delete(request.params.listId);
    response.json(results);
  }
}

export default ListController;
