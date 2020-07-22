import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users_books")
class UsersBooks {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  book_id: string;

  @Column()
  user_id: string;
}

export default UsersBooks;
