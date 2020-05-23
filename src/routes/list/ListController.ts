import { Response } from 'express';
import { getRepository } from 'typeorm';
import { List } from '../../entities/list.entity';
import { GetUserAuthInfoRequest } from '../../types';

type RelationMutation = 'add' | 'remove';

class ListController {
  static rootPath = '/list';

  private listRepository = getRepository(List);

  getAllLists = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const lists = await this.listRepository.find({
        where: {
          user: request.user,
        },
      });

      return response.json(lists);
    } catch (e) {
      response.json({ error: e.message });
    }
  };

  getOneList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const list = await this.listRepository.findOne(request.params.listId, {
        relations: ['items', 'categories'],
      });

      if (!list) {
        response.status(404);
        return response.json({ error: `no list with id: ${request.params.listId}` });
      }
      return response.json(list);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  getItemsByCategory = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const list: any = await this.listRepository.findOne(request.params.listId, {
        relations: ['items', 'categories', 'items.categories'],
      });

      const categoryIdsForItemId: any = {};

      for (const { id, categories } of list.items) {
        categoryIdsForItemId[id] = categories.map((c: any) => c.id);
      }

      // { [category id]: item ids[] }
      const arraysForItemsByListCategory = list.categories.reduce((output: any, category: any) => {
        output[category.id] = [];
        return output;
      }, {});

      const structure = list.items.reduce(
        (output: any, { id }: any) => {
          let noMatchingCategories = true;
          categoryIdsForItemId[id].forEach((s: any, i: any, ar:any) => {
            if (output[s]) {
              output[s].push(id);
              noMatchingCategories = false;
            }
            if (i === (ar.length - 1) && noMatchingCategories) {
              output['none'].push(id);
            }
          });
          if(categoryIdsForItemId[id].length === 0) {
            output['none'].push(id);
          }
          return output;
        },
        { ...arraysForItemsByListCategory, none: [] },
      );

      return response.json(structure);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  createList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const list = await this.listRepository.create({ ...request.body, user: request.user });
      const results = await this.listRepository.save(list);
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  updateList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const list = await this.listRepository.findOne(request.params.listId);
      if (!list) {
        response.status(404);
        return response.json({ error: `no list with id: ${request.params.listId}` });
      }
      this.listRepository.merge(list, request.body);
      const results = await this.listRepository.save(list);
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  deleteList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const results = await this.listRepository.delete(request.params.listId);
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  addCategoryToList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.listId, request.params.categoryId, 'add');
      const list = await this.listRepository.findOne(request.params.listId);
      if (!list) {
        response.status(404);
        return response.json({ error: `no list with id: ${request.params.listId}` });
      }
      return response.json(list);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  removeCategoryFromList = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      await this.addOrRemoveRelation(request.params.listId, request.params.categoryId, 'remove');
      const list = await this.listRepository.findOne(request.params.listId);
      if (!list) {
        response.status(404);
        return response.json({ error: `no list with id: ${request.params.listId}` });
      }
      return response.json(list);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  addOrRemoveRelation = async (listId: string, categoryId: string, action: RelationMutation) => {
    const column = await this.listRepository.createQueryBuilder().relation(List, 'categories').of(listId);
    if (action === 'add') {
      await column.add(categoryId);
    } else {
      await column.remove(categoryId);
    }
  };
}

export default ListController;
