import { Button, Result } from "antd";

export default function ErrorPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Maaf, halaman yang kamu cari tidak ada."
      extra={<Button type="primary">Kembali</Button>}
    />
  );
}
