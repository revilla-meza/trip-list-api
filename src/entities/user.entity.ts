import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./item.entity";
import { Trip } from "./trip.entity";
import { Category } from "./category.entity";
import { List } from "./list.entity";


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(type => Trip, trip => trip.user)
  trips: Trip[];

  @OneToMany(type => Item, item => item.user)
  items: Item[];

  @OneToMany(type => Category, category => category.user)
  categories: Category[];

  @OneToMany(type => List, list => list.user)
  lists: List[];

}