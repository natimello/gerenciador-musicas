import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Usuario } from "./usuario";
import { Musica } from "./musica";

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  id_usuario: Usuario;

  @ManyToMany(() => Musica)
  @JoinTable()
  musicas: Musica[];

  @Column({ type: "date" })
  data: string;

  @Column()
  nome_evento: string;
}
