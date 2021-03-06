import { ApiProperty } from '@nestjs/swagger'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export abstract class BaseEntity<T> {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    readOnly: true
  })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    readOnly: true
  })
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date

  @ApiProperty({ type: 'number', readOnly: true })
  @VersionColumn()
  version?: number

  constructor(object: T & BaseEntity<T>) {
    Object.assign(this, object)
  }
}

export abstract class BaseEntityWithPrimary<T> extends BaseEntity<T> {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    readOnly: true
  })
  @PrimaryGeneratedColumn('uuid')
  id?: string
}
