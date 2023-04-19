const Chatrow = (props) => {
  return (
    <tr key={props.id}>
      <td>{props.sender}: {props.message}</td>
    </tr>
  );
};

export default Chatrow;
