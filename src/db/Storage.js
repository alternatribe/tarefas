import Realm from 'realm';
import TarefaSchema from './schemas/TarefaSchema';

export default function Storage() {
  return Realm.open({
    schema: [TarefaSchema],
    schemaVersion: 4,
  });
}
