import {Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export enum SignInType {
  SignOut = 'SignOut',
  SignIn = 'SignIn'
}

@Entity({name: 'user_management_signin_history'})
export class ActivityLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', {length: 50})
  @Index()
  email: string;

  @Column('varchar', {length: 250 })
  ipAddress: string;

  @Column('varchar')
  accessType?: SignInType;

  @Column('text')
  accessDetails: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}