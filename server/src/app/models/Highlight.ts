import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("highlight")
class Highlight {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;
  
  @Column()
  date: string;
}

export default Highlight;
