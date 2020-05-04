import { Entity, PrimaryGeneratedColumn, JoinTable, Column, ManyToOne, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { List } from './list.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  label: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true})
  quantity: number;

  @ManyToOne((type) => User, (user) => user.items, { nullable: false })
  user: User;

  @ManyToMany((type) => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(type => List, (list) => list.items)
  @JoinTable()
  lists: List[];
}
