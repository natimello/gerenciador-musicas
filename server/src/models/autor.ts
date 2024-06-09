import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_autor: string;
}
