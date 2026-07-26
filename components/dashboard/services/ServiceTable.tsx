export default function ServiceTable({ services }: { services: any[] }) {
  return (
    <table>
      <tbody>
        {services.map((item) => (
          <tr key={item.id}>
            <td>{item.name ?? item.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
