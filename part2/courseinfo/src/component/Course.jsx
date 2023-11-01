const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Total = ({ total }) => {
  return <h2>total of {total} exercises</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  const total = course[0].parts.reduce((acc, c) => acc + c.exercises, 0);
  const total2 = course[1].parts.reduce((acc, c) => acc + c.exercises, 0);
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header name={course[0].name} />
      <Content parts={course[0].parts} />
      <Total total={total} />
      <Header name={course[1].name} />
      <Content parts={course[1].parts} />
      <Total total={total2} />
    </div>
  );
};

export default Course;
