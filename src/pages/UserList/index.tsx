import { Button, Form, Popconfirm, Table, Typography } from "antd";
import type { TableProps } from "antd/es/table";
import ButtonGroup from "antd/lib/button/button-group";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { IUser } from "../../models/User";
import { useStore } from "../../store";
import { useState } from "react";
import EditableCell from "./EditableCell";

const Users = () => {
  const { userStore } = useStore();
  const [form] = Form.useForm<IUser>();
  const [editingKey, setEditingKey] = useState<null | number>(null);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  const isEditing = (user: IUser) => user.id === editingKey;

  const onStartEditing = (user: Partial<IUser> & { id: number }) => {
    form.setFieldsValue({
      last_name: "",
      first_name: "",
      email: "",
      gender: "",
      ip_address: "",
      ...user,
    });
    if (user.id === -1) {
      userStore.getLocaleAddOrDelete(user as IUser);
    }
    setEditingKey(user.id);
    setButtonDisable(true);
  };

  const onCancelEditing = () => {
    setEditingKey(null);
    setButtonDisable(false);
    userStore.getLocaleAddOrDelete({ id: -1 } as IUser, true);
  };

  const onSaveUser = async (user: IUser) => {
    const row = (await form.validateFields()) as IUser;
    const requestModel = { ...user, ...row };
    if (user.id == -1) {
      requestModel.id = Math.ceil(Math.random() * 2000);
      userStore
        .createUserAsync(requestModel)
        .then(() => userStore.load(userStore.filters));
    } else {
      userStore
        .updateUserAsync(requestModel)
        .then(() => userStore.load(userStore.filters));
    }
    setEditingKey(null);
    setButtonDisable(false);
  };

  const onDelete = (id: number) => {
    userStore
      .deleteUserAsync(id)
      .then(() => userStore.getUsersAsync(userStore.filters));
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a: IUser, b: IUser) => b.id - a.id,
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a: IUser, b: IUser) => b.id - a.id,
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: IUser, b: IUser) => b.id - a.id,
      editable: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a: IUser, b: IUser) => b.id - a.id,
      editable: true,
    },
    {
      title: "Ip Address",
      dataIndex: "ip_address",
      key: "ip_address",
      sorter: (a: IUser, b: IUser) => b.id - a.id,
      editable: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (_: IUser, user: IUser) => {
        const editable = isEditing(user);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => onSaveUser(user)}
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={onCancelEditing}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <ButtonGroup>
            <Button
              onClick={() => onStartEditing(user)}
              type="link"
              icon={<EditOutlined />}
              disabled={buttonDisable}
            ></Button>
            <Button
              onClick={() => onDelete(user.id)}
              type="link"
              icon={<DeleteOutlined />}
              disabled={buttonDisable}
            ></Button>
          </ButtonGroup>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (user: IUser) => ({
        user,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(user),
      }),
    };
  });

  const onChange: TableProps<IUser>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
    if (extra.action == "paginate") {
      userStore.load({
        _page: pagination.current,
        _limit: pagination.pageSize,
      });
    }
    if (extra.action == "sort") {
      userStore.load({
        _sort: sorter.field,
        _order: sorter.order === "ascend" ? "asc" : "desc",
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ alignSelf: "end" }}>
        <Button
          disabled={buttonDisable}
          onClick={() => onStartEditing({ id: -1 } as IUser)}
          icon={<PlusOutlined />}
        ></Button>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey="id"
          columns={mergedColumns}
          dataSource={userStore.users}
          pagination={{
            total: Math.ceil(userStore.count / 10),
            defaultPageSize: 8,
            pageSizeOptions: [8, 20, 50, 100],
          }}
          onChange={onChange}
        />
      </Form>
    </div>
  );
};

export default observer(Users);
