import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users_subjects")
class UsersSubjects {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  user_id: string;

  @Column()
  subject: string;
}

export default UsersSubjects;
