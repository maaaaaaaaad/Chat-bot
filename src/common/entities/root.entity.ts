import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate } from 'class-validator';

@Entity({ name: 'ROOT' })
export abstract class RootEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn()
  @IsDate()
  readonly createAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updateAt: Date;

  @DeleteDateColumn({ select: false })
  @IsDate()
  deleteAt: Date;
}
