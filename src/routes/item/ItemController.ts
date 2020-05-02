import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { List } from '../../entities/list.entity';
import { GetUserAuthInfoRequest } from '../../types';

class ItemController {
  static rootPath = '/item';

  private itemRepository = getRepository(Item);
  private listRepository = getRepository(List);

  getAllItems = async (request: GetUserAuthInfoRequest, response: Response) => {
    const items = await this.itemRepository.find({
      where: {
        user: request.user,
      },
    });

    response.json(items);
  };

  getItemsForList = async (request: GetUserAuthInfoRequest, response: Response) => {
    const items = await this.itemRepository.query(`SELECT
    item.* AS "item"
   FROM
    item, item_lists_list
   WHERE
    item.id = item_lists_list."itemId"
   AND
    item_lists_list."listId" = ${request.params.listId}`);

    response.json(items);
  };

  getItemsForCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    const items = await this.itemRepository.query(`SELECT
    item.* AS "item"
   FROM
    item, item_categories_category
   WHERE
    item.id = item_lists_list."itemId"
   AND
    item_lists_list."listId" = ${request.params.listId}`);

    response.json(items);
  };

  getOneItem = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const item = await this.itemRepository.findOne(request.params.itemId);

      response.json({ item: item || null });
    } catch (e) {
      response.json({ error: e.message });
    }
  };

  createItem = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const item: any = await this.itemRepository.create({ ...request.body });

      const list = await this.listRepository.findOne(request.body.list);

      if (list) {
        item.lists = [list];
      }

      const results = await this.itemRepository.save(item);

      response.json(results);
    } catch (e) {
      response.json({ error: e.message });
    }
  };

  updateItem = async (request: GetUserAuthInfoRequest, response: Response) => {
    const item = await this.itemRepository.findOne(request.params.itemId);
    this.itemRepository.merge(item, request.body);
    const results = await this.itemRepository.save(item);
    response.json(results);
  };

  deleteItem = async (request: GetUserAuthInfoRequest, response: Response) => {
    const results = await this.itemRepository.delete(request.params.itemId);
    response.json(results);
  };
}

export default ItemController;
