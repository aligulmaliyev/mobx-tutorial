import { Form, Input, InputNumber } from "antd";
import { IUser } from "../../models/User";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IUser;
  index: number;
  children: React.ReactNode;
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}:EditableCellProps) => {
  const inputNode = inputType === "number" ? <InputNumber placeholder={title} style={{width:'200px'}} /> : <Input placeholder={title} />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
