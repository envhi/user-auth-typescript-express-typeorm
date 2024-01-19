import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Wallet } from "./Wallet";
export type Types = "lojista" | "comum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @Column({ type: "text", nullable: false, unique: true })
  cpfcnpj: string;

  @Column({ type: "text", nullable: false })
  password_hash: string;

  @Column({ type: "enum", enum: ["lojista", "comum"], nullable: false })
  account_type: Types;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Wallet, wallet => wallet.user)
  wallet: Wallet[]


}
