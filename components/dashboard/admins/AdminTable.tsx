export default function AdminTable({ admins }: { admins: any[] }) {
  return (
    <table>
      <tbody>
        {admins.map((item) => (
          <tr key={item.id}>
            <td>{item.name ?? item.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
