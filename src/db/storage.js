import Realm from 'realm';
import TarefaSchema from './schemas/TarefaSchema';

export default function storage() {
  return Realm.open({
    schema: [TarefaSchema],
  });
}
