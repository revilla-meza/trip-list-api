import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Item } from './item.entity';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Item)
  @JoinTable()
  items: Item[];

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];

  @ManyToOne(type => User)
  user: User;


}