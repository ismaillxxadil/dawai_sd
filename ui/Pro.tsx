"use client";
type DataType = {
  id: string;
  user_id: string;
  name: string;
  role: string;
  img: string;
};
export default function Pro({ data }: { data: DataType[] }) {
  return (
    <div>
      <h1>Profiles:</h1>
      <ul>
        {data?.map((item: DataType) => (
          <li key={item.id}>
            <strong>{item.name}</strong> – {item.role}
          </li>
        ))}
      </ul>
      <button>click me</button>
    </div>
  );
}
