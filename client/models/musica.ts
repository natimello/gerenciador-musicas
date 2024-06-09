export interface Musica {
  id: number;
  nome: string;
  id_autor?: number | null;
  id_genero?: number | null;
  duracao?: string | null;
  descricao?: string | null;
  link_cifra?: string | null;
  link_video?: string | null;
  album?: string | null;
  link_letra?: string | null;
}
