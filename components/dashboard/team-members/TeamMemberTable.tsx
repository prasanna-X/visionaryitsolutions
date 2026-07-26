export default function TeamMemberTable({ members }: { members: any[] }) {
  return (
    <table>
      <tbody>
        {members.map((item) => (
          <tr key={item.id}>
            <td>{item.name ?? item.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
