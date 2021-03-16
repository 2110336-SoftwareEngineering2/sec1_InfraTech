import { Layout } from 'antd';
import Link from 'next/link';

const { Footer: AntdFooter } = Layout;

const Footer = () => (
  <AntdFooter className="text-center">
    <Link href="/">LetX</Link> ©2021 Created by InfraTech
  </AntdFooter>
);

export default Footer;
