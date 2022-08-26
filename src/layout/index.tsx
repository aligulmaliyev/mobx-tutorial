import { Outlet } from "react-router-dom";
import { Layout, Typography } from "antd";
const { Title } = Typography;
const { Header, Content ,Footer} = Layout;

const PageLayout = () => {
  return (
    <Layout>
      <Header>
        <Title>User App</Title>
      </Header>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 24,
            backgroundColor: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
