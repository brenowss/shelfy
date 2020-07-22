import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users_main_books")
class UsersMainBooks {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  main_book_id: string;

  @Column()
  user_id: string;
}

export default UsersMainBooks;
