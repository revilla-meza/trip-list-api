import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Item } from './item.entity';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(type => Item, (item) => item.lists, { cascade: true })
  @JoinTable()
  items: Item[];

  @ManyToMany(type => Category, { cascade: true })
  @JoinTable()
  categories: Category[];

  @ManyToOne(type => User)
  user: User;
}