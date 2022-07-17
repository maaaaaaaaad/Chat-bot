import { Column, Entity, Index } from 'typeorm';
import { RootEntity } from '../../common/entities/root.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({ name: 'USERS' })
@Index(['email'])
export class UsersEntity extends RootEntity {
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ select: false })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Column({ default: null, nullable: true, select: false })
  @Exclude()
  refreshToken: string | null;
}
