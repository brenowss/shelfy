import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("subjects")
class Subject {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @Column()
  color: string;

  @Column()
  image: string;
}

export default Subject;
