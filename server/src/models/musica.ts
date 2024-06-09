import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Autor } from "./autor";
import { Genero } from "./genero";

@Entity()
export class Musica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToMany(() => Autor)
  @JoinTable()
  autores: Autor[];

  @ManyToOne(() => Genero)
  genero: Genero;

  @Column()
  duracao: number;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true })
  link_cifra: string;

  @Column({ nullable: true })
  link_video: string;

  @Column({ nullable: true })
  album: string;

  @Column({ nullable: true })
  link_letra: string;
}
