export enum PrioridadeEnum {
  ALTA = 1,
  MEDIA = 2,
  BAIXA = 3,
}

export namespace PrioridadeEnum {
  export function getDescricao(prioridade: PrioridadeEnum): string {
    switch (prioridade) {
      case PrioridadeEnum.MEDIA:
        return 'Média';
      case PrioridadeEnum.ALTA:
        return 'Alta';
      case PrioridadeEnum.BAIXA:
        return 'Baixa';
      default:
        return '';
    }
  }
}
