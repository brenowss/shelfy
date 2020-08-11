import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("recently_seen")
class RecentlySeen {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  book_id: string;

  @Column()
  user_id: string;
}

export default RecentlySeen;
