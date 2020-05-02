import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { List } from '../../entities/list.entity';
import { GetUserAuthInfoRequest } from '../../types';

type RelationMutation = "add" | "remove";
type ItemRelationColumn = "lists" | "categories";

class ItemController {
  static rootPath = '/item';

  private itemRepository = getRepository(Item);
  private listRepository = getRepository(List);

  getAllItems = async (request: GetUserAuthInfoRequest, response: Response) => {
    const items = await this.itemRepository.find({
      where: {
        user: request.user,
      }
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
    item.id = item_categories_category."itemId"
   AND
    item_categories_category."categoryId" = ${request.params.categoryId}`);

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
      const item: any = await this.itemRepository.create(request.body);
      const results = await this.itemRepository.save(item);

      if (request.body.list) {

        await this.itemRepository
        .createQueryBuilder()
        .relation(Item, "lists")
        .of(item)
        .add(request.body.list)

      }
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  updateItem = async (request: GetUserAuthInfoRequest, response: Response) => {
    const item = await this.itemRepository.findOne(request.params.itemId);
    this.itemRepository.merge(item, request.body);
    const results = await this.itemRepository.save(item);
    response.json(results);
  };

  addItemToList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.itemId, request.params.listId, "add", "lists");
    } catch(e) {
      return response.json({error: e.message});
    }
    const item = await this.itemRepository.findOne(request.params.itemId);
    response.json(item)
  }

  removeItemFromList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.itemId, request.params.listId, "remove", "lists");
    } catch(e) {
      return response.json({error: e.message});
    }
    const item = await this.itemRepository.findOne(request.params.itemId);
    response.json(item)
  }

  addOrRemoveRelation = async (itemId:string, relationId:string, action:RelationMutation, relation:"lists"|"categories") => {
    const column = await this.itemRepository
                      .createQueryBuilder()
                      .relation(Item, relation)
                      .of(itemId)
    if (action==="add") {
      await column.add(relationId);
    } else {
      await column.remove(relationId);
    }
  }

  addItemToCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.itemId, request.params.categoryId, "add", "categories");
    } catch(e) {
      return response.json({error: e.message});
    }
    const item = await this.itemRepository.findOne(request.params.itemId);
    response.json(item)
  }

  removeItemFromCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.itemId, request.params.categoryId, "remove", "categories");
    } catch(e) {
      return response.json({error: e.message});
    }
    const item = await this.itemRepository.findOne(request.params.itemId);
    response.json(item)
  }



  deleteItem = async (request: GetUserAuthInfoRequest, response: Response) => {
    const results = await this.itemRepository.delete(request.params.itemId);
    response.json(results);
  };
}

export default ItemController;
