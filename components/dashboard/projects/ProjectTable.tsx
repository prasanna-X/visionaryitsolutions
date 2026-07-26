export default function ProjectTable({ projects }: { projects: any[] }) {
  return (
    <table>
      <tbody>
        {projects.map((item) => (
          <tr key={item.id}>
            <td>{item.name ?? item.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
