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
export class RootEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updateAt: Date;

  @DeleteDateColumn()
  @IsDate()
  deleteAt: Date;
}
