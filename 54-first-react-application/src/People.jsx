import { useEffect, useState } from 'react';

export default function People() {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Sudo' },
    { id: 4, name: 'Boy' },
  ]);

  const getPeople = async () => {
    setLoading(true);
    try {
      const url = 'https://jsonplaceholder.typicode.com/users';
      const users = await (await fetch(url)).json();
      setPeople(users);
    } catch (e) {
      alert(e?.message || 'Unknown fetch error');
    }
    setLoading(false);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      <h2>People</h2>
      {loading && <div>loading...</div>}
      {!loading && (
        <ul>
          {people.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
