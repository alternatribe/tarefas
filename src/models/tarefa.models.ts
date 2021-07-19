import {PrioridadeEnum} from './prioridade.enum';
export class Tarefa {
  id!: number;
  tarefaPai!: number;
  titulo!: string;
  anotacao!: string;
  concluida!: boolean;
  prioridade: PrioridadeEnum = PrioridadeEnum.BAIXA;
  dataCriacao!: Date;
}
