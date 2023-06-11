import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
@Unique(" user-email-deleted-at", ["email", "deletedAt"])
@Entity({ name: 'user_management' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column('varchar', { length: 50 })
    @Index()
    email: string;
  
    @Column('varchar', { length: 250 })
    password: string;
  
    @Column('int', { default: 0 })
    active: number;
  
    @Column('int', { default: 1 })
    access: number;
  
    @Column('varchar', { length: 250 })
    activationToken: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    activationTime: Date;
  
    @Column('varchar', { length: 250, nullable: true })
    recoveryToken: string;
  
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    recoveryIssuedTime: Date;
  

  
    @Column('int', { default: 0 })
    agreementAccepted?: number;
  
    @Column('int', { default: 0 })
    isPasswordTemporary?: number;
  
  
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
   
  
    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
  
    // @ManyToOne(type => Company, c => c.users)
    // company: Company;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  
    token: string;
  }