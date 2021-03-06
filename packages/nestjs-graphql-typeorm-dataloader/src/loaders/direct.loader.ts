import type { Dictionary } from 'lodash'
import { keyBy } from 'lodash'
import type { Connection } from 'typeorm'
import type { RelationMetadata } from 'typeorm/metadata/RelationMetadata'

/**
 * A shared component for handling the end result of the query.
 */
export function directLoader<V> (relation: RelationMetadata, connection: Connection, grouper: string | ((entity: V) => any)) {
  return async (ids: readonly any[]): Promise<V[]> => {
    const entities = keyBy(await connection.createQueryBuilder<V>(relation.type, relation.propertyName).whereInIds(ids).getMany(), grouper) as Dictionary<V>

    return ids.map((id) => entities[id])
  }
}
