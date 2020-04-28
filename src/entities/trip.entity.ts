import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { TravelMethod } from '../types';
import { List } from "./list.entity";
import { User } from "./user.entity";


@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  list: List;

  @ManyToOne(type => User, user => user.trips)
  user: User;

  @Column()
  title: string;

  @Column()
  flight_number: number;

  @Column({
    type: "enum",
    enum: TravelMethod,
    default: TravelMethod.airplane,
  })
  travel_method: TravelMethod;
}