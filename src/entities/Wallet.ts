import { User } from "./User";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("wallets")
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  balance: number;

@OneToOne(() => User, user => user.wallet)
 @JoinColumn({ name: "user_id" })
 user: User;
}
