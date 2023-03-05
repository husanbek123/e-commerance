import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';



const MyUpload = ({onChange}) => {

  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: onChange,
  };

  return (
    <Upload type='drag' {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
};
export default MyUpload;