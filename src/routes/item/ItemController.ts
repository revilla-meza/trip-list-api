import { Response } from "express";
import { getRepository } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { IGetUserAuthInfoRequest } from "../../types";

class ItemController {
  public rootPath = '/item';

  private itemRepository = getRepository(Item);

  getAllItems = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const items = 
      await this.itemRepository.find({
        where: { 
          userId: request.user[process.env.AUTH0_AUDIENCE + '/userId'],
        }
      });

    response.json(items);
  }

  getItemsForList = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const items = await this.itemRepository
      .createQueryBuilder("item")
      .where(":listId = ANY(item.lists)", { listId: request.params.listId })
      .getMany();

    response.json(items);
  }

  getItemsForCategory = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const items = await this.itemRepository
      .createQueryBuilder("item")
      .where(":categoryId = ANY(item.categories)", { categoryId: request.params.categoryId })
      .getMany();

    response.json(items);
  }

  getOneItem = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const item = await this.itemRepository.findOne(request.params.itemId);
    response.json(item);
  }

  createItem = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const item = await this.itemRepository.create(request.body);
    const results = await this.itemRepository.save(item);
    response.json(results);
  }

  updateItem = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const item = await this.itemRepository.findOne(request.params.itemId);
    this.itemRepository.merge(item, request.body);
    const results = await this.itemRepository.save(item);
    response.json(results);
  }

  deleteItem = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const results = await this.itemRepository.delete(request.params.itemId);
    response.json(results);
  }
}

export default ItemController;
