import { Entity, PrimaryGeneratedColumn, JoinTable, Column, ManyToOne, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { List } from './list.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  label: string;

  @Column()
  image: string;

  @ManyToOne((type) => User, (user) => user.items)
  user: User;

  @ManyToMany((type) => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(type => List, (list) => list.items)
  lists: List[];
}
